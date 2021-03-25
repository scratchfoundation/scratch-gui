/**
 * A fake XML class to use in place of the real XML for faking things?
 */
export default class XML {
  constructor() {
    this.xmlDoc = document.implementation.createDocument(null, "xml");
  }

  newXml(x, tagName, attrs) {
    let xAdd = this.xmlDoc.createElement(tagName);
    x.appendChild(xAdd);
    return this.setAttr(xAdd, attrs);
  }

  setAttr(x, attrs) {
    if (attrs) {
      for (const key of Object.keys(attrs)) {
        if (key === "text") {
          x.appendChild(this.xmlDoc.createTextNode(attrs[key]));
        } else {
          x.setAttribute(key, attrs[key]);
        }
      }
    }
    return x;
  }
}
