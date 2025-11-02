import * as fs from 'fs';
import {JSDOM} from "jsdom";
import pkg from 'fontoxpath';
const {evaluateXPathToBoolean} = pkg;
// reading in the XML file and processing it
export function ProcessOddPm() {
  const dom = new JSDOM(fs.readFileSync('/Users/ekanshsahu/Documents/mith/astro-starter/src/pages/basicPM.odd', 'utf-8'), {contentType: "text/xml"});
  const doc = dom.window.document;
  console.log("Running processOddPm.ts once");
  let generatedCSS: string = ""; 
  // Extract elementSpec
  const elSpecs = doc.querySelectorAll("elementSpec");
  elSpecs.forEach(el => {
    const id = el.getAttribute("ident")
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
      
        if (behaviour === "link") {
          behaviourCSS += 'color: #0066cc; text-decoration: underline; cursor: pointer; transition: color 0.2s;\n';
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
        let outputRenditions = model.querySelectorAll('outputRendition');
        let outputRenditionCSS = '';
        outputRenditions.forEach(outputRendition => {
          console.log("i am an output rendition")
          outputRenditionCSS += `${outputRendition.textContent}\n`;
        });
        if (attClass){
          console.log("I am here inside the final if condition");
          generatedCSS += `tei-${id}, .${attClass} {\n ${behaviourCSS} ${outputRenditionCSS}}\n`;
        }
        generatedCSS += `tei-${id} {\n ${behaviourCSS} ${outputRenditionCSS}}\n`;
      }
    });
    
  });
  console.log(`This is the generate CSS being sent from my processOddPm.ts file\n ${generatedCSS}`);
  return generatedCSS;
  
}