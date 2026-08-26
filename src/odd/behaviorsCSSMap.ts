// Mapping between behaviors and respective default CSS 

export const BEHAVIOR_CSS_MAP: Record<string, string> = {
  paragraph: `
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
    text-align: justify;
  `,

  alternate: `
    display: inline;
  `,

  anchor: `
    display: inline;
    position: relative;
    text-decoration: none;
  `,

  block: `
    display: block;
    margin: 1em 0;
  `,

  body: `
    display: block;
  `,

  break: `
    content: "\\A";
    white-space: pre;
  `,

  cell: `
    display: table-cell;
    padding: 0.5em;
    border: 1px solid #ddd;
  `,

  cit: `
    display: block;
    margin: 1em 2em;
    font-style: italic;
  `,

  document: `
    display: block;
  `,

  figure: `
    display: block;
    margin: 1em 0;
    text-align: center;
  `,

  glyph: `
    display: inline;
  `,

  graphic: `
    display: block;
    max-width: 100%;
    height: auto;
  `,

  heading: `
    display: block;
    font-weight: bold;
    font-size: 1.5em;
    margin: 1em 0 0.5em 0;
  `,

  index: `
    display: none;
  `,

  inline: `
    display: inline;
  `,

  list: `
    display: block;
    margin: 1em 0;
    padding-left: 2em;
  `,

  listItem: `
    display: list-item;
    list-style-type: disc;
    margin: 0.5em 0;
  `,

  metadata: `
    display: none;
  `,

  note: `
    display: inline;
    font-size: 0.9em;
    margin: 0.5em 2em;
    padding: 0.5em;
    background: #f5f5f5;
    border-left: 3px solid #ccc;
  `,

  omit: `
    display: none;
  `,

  row: `
    display: table-row;
  `,

  section: `
    display: block;
    margin: 2em 0;
  `,

  table: `
    display: table;
    border-collapse: collapse;
    margin: 1em 0;
    width: 100%;
  `,

  text: `
    display: inline;
  `,
  
  title: `
    display: block;
    font-weight: bold;
    font-size: 1.2em;
    margin: 0.5em 0;
  `
};
