import * as fs from 'fs';
import {JSDOM} from "jsdom";
import pkg from 'fontoxpath';
const {evaluateXPathToBoolean} = pkg;
import CETEI from 'CETEIcean';
import serialize from "w3c-xmlserializer";
// reading in the XML file and processing it
export class ProcessOddPm {
  oddDom: JSDOM;
  teiDom: JSDOM | null;
  doc: Document;
  c = new CETEI();
  generatedCSS: string = "";
  constructor(){
    this.oddDom = new JSDOM(fs.readFileSync('/Users/ekanshsahu/Documents/mith/astro-starter/src/pages/basicPM.odd', 'utf-8'), {contentType: "text/xml"});
    this.doc = this.oddDom.window.document;
    this.generatedCSS = ""; 
    this.teiDom = null; 
  }
  // Extract elementSpec and their respective models to get the behaviours and generate respective simple CSS that doesn't require js fpr functionality to ne implemented.
  processElSpecs() {
    // Have to add further behaviours to complexBehaviors method after link behaviour is finished. Similar pattern will be followed 
    // and those particular behaviours will be removed from this method.
    const elSpecs = this.doc.querySelectorAll("elementSpec");
    elSpecs.forEach(el => {
      const id = el.getAttribute("ident")!;
      // an elementSpec can have multiple models
      let models = el.querySelectorAll('model');
      models.forEach(model => {
        let predicate = model.getAttribute("predicate");
        let attClass = model.getAttribute("cssClass");
        let applicable = true;
        if (predicate){
          applicable = evaluateXPathToBoolean(predicate, el, null, {}, {});
        }
        if (applicable){
          const behaviour = model.getAttribute("behaviour")
          let behaviourCSS = "";
          if (behaviour === "paragraph") {
            behaviourCSS += 'display: block;\n margin-top: 1em;\n margin-bottom: 1em;\n text-align: justify;\n ';
          }
          if (behaviour === "alternate") {
            behaviourCSS += 'display: inline;\n';
          }
        
          if (behaviour === "anchor") {
            behaviourCSS += 'display: inline; position: relative; text-decoration: none;\n';
          }
        
          if (behaviour === "block") {
            behaviourCSS += 'display: block; margin: 1em 0;\n';
          }
        
          if (behaviour === "body") {
            behaviourCSS += 'display: block;\n';
          }
        
          if (behaviour === "break") {
            behaviourCSS += 'content: "\\A"; white-space: pre;\n';
          }
        
          if (behaviour === "cell") {
            behaviourCSS += 'display: table-cell; padding: 0.5em; border: 1px solid #ddd;\n';
          }
        
          if (behaviour === "cit") {
            behaviourCSS += 'display: block; margin: 1em 2em; font-style: italic;\n';
          }
        
          if (behaviour === "document") {
            behaviourCSS += 'display: block;\n';
          }
        
          if (behaviour === "figure") {
            behaviourCSS += 'display: block; margin: 1em 0; text-align: center;\n';
          }
        
          if (behaviour === "glyph") {
            behaviourCSS += 'display: inline;\n';
          }
        
          if (behaviour === "graphic") {
            behaviourCSS += 'display: block; max-width: 100%; height: auto;\n';
          }
        
          if (behaviour === "heading") {
            behaviourCSS += 'display: block; font-weight: bold; font-size: 1.5em; margin: 1em 0 0.5em 0;\n';
          }
        
          if (behaviour === "index") {
            behaviourCSS += 'display: none;\n';
          }
        
          if (behaviour === "inline") {
            behaviourCSS += 'display: inline; \n';
          }
        
          if (behaviour === "list") {
            behaviourCSS += 'display: block; margin: 1em 0; padding-left: 2em;\n';
          }
        
          if (behaviour === "listItem") {
            behaviourCSS += 'display: list-item; list-style-type: disc; margin: 0.5em 0;\n';
          }
        
          if (behaviour === "metadata") {
            behaviourCSS += 'display: none;\n';
          }
        
          if (behaviour === "note") {
            behaviourCSS += 'display: inline; font-size: 0.9em; margin: 0.5em 2em; padding: 0.5em; background: #f5f5f5; border-left: 3px solid #ccc;\n';
          }
        
          if (behaviour === "omit") {
            behaviourCSS += 'display: none;\n';
          }
        
          if (behaviour === "row") {
            behaviourCSS += 'display: table-row;\n';
          }
        
          if (behaviour === "section") {
            behaviourCSS += 'display: block; margin: 2em 0; \n';
          }
        
          if (behaviour === "table") {
            behaviourCSS += 'display: table; border-collapse: collapse; margin: 1em 0; width: 100%;\n';
          }
        
          if (behaviour === "text") {
            behaviourCSS += 'display: inline;\n';
          }
        
          if (behaviour === "title") {
            behaviourCSS += 'display: block; font-weight: bold; font-size: 1.2em; margin: 0.5em 0;\n';
          }
          // if the model has outputRendition(there can be multiple), add the direct CSS to the generated CSS. It looks like this:
          // <model behaviour="inline">
          //    <outputRendition>font-style: italic;</outputRendition>
          //  </model>
           
          let outputRenditions = model.querySelectorAll('outputRendition');
          let outputRenditionCSS = '';
          outputRenditions.forEach(outputRendition => {
            // console.log("i am an output rendition")
            outputRenditionCSS += `${outputRendition.textContent}\n`;
          });
          if (attClass){
            // console.log("I am here inside the final if condition");
            this.generatedCSS += `tei-${id}, .${attClass} {\n ${behaviourCSS} ${outputRenditionCSS}}\n`;
          }
          this.generatedCSS += `tei-${id} {\n ${behaviourCSS} ${outputRenditionCSS}}\n`;
        }
      });
    });
    // console.log(`This is the generate CSS being sent from my processOddPm.ts file\n ${this.generatedCSS}`);
    return this.generatedCSS;
  }

  complexBehaviors() {
    var c = new CETEI();
    // read in ODD
    // determine elements with behavior="link"
    // traverse TEI data, find elements from previous steps
    // build behavior object and add entries for those elements with the serialized corresponding function.
    
    let cbehaviors:any = {
      "namespaces": {
        "tei": "http://www.tei-c.org/ns/1.0",
        "teieg": "http://www.tei-c.org/ns/Examples",
      },
      "tei": {}
    }
    
    const models = this.doc.querySelectorAll("model");
    for (let i = 0; i < models.length; i++) {
      const model = models[i];
      const behaviour = model.getAttribute("behaviour");
      const elSpec = model.parentNode as Element;
      const id = elSpec.getAttribute("ident")!;
      if (behaviour === "link" && id) {
        cbehaviors["tei"][id] = function linkFn(elt: Element) {
          console.log("This is the element whose behaviour is getting added", elt);
          const link = document.createElement("a");
          const target =  elt.getAttribute("target")|| "#";
          link.setAttribute("href", target);
          link.textContent = elt.textContent || target;
          return link;
        }
      }
    }
    c.addBehaviors(cbehaviors);
    const serialized = JSON.stringify(cbehaviors, (key, value) => {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    });
    
    return serialized;

  }

  supportClass(teiFile: string) {
    // These are the models in the ODD file  
    const models = this.doc.querySelectorAll("model");

    // Getting the tei file for formatting
    const fileTEI = new JSDOM(teiFile, { contentType: "text/xml" });
    const TEIDoc = fileTEI.window.document;

    // Using the default namespace to create a namespace resolver function for evaluateXPathToBoolean (Don't have functionality for
    // multiple/non-default namespaces yet)
    const NS = TEIDoc.documentElement.namespaceURI;
    function namespaceResolver(): string | null {
      return NS || null;
    }
    // For all models in the ODD file, if there predicate is satisfied and class attribute is present, add the class to the target elements in the TEI file
    for (let i = 0; i < models.length; i++) {
      const model = models[i];
      const predicate = model.getAttribute("predicate");
      const className = model.getAttribute("cssClass");
      const elSpec = model.parentNode as Element;
      const id = elSpec.getAttribute("ident")!;
      const targetNodes = TEIDoc.getElementsByTagNameNS(NS, id);
     
      if (className && predicate) {
        for (const node of targetNodes) {
            const shouldApply = evaluateXPathToBoolean(predicate, node, null, namespaceResolver);
            // console.log("Predicate:", predicate, "on node:", node, "evaluated to:", shouldApply);
            // Only apply class if predicate passes
            if (shouldApply) {
              node.setAttribute("class", ((node.getAttribute("class") || "") + " " + className).trim());
            }
        }
      }
      // If there is no predicate, apply the class to all target nodes. 
      else{
        Array.from(targetNodes).forEach(elt => {
          elt.setAttribute(
            "class",(elt.getAttribute("class") || "") + " " + className
          );
        });
      }
    }
    return serialize(TEIDoc);
  }
}



