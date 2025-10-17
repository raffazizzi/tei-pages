import * as fs from 'fs';
import {JSDOM} from "jsdom";
// reading in the XML file and processing it
const dom = new JSDOM(fs.readFileSync('astro-starter/src/pages/basicPM.odd', 'utf-8'), {contentType: "text/xml"});
const doc = dom.window.document;

// Extract elementSpec
const elSpecs = doc.querySelectorAll("elementSpec model");
elSpecs.forEach(el => {
  const behaviour = el.getAttribute("behaviour")
  if (behaviour === "paragraph") {
    el.append("")
  }
});