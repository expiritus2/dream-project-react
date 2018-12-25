/**
 * Simple Cross Browser Clipboard API
 */

class Clipboard {
  text = null;

  setData = text => {
    this.initValues(text);

    const el = this.createTempElement();
    this.selectContent(el);
    this.execCommand();
    this.removeTempElement(el);
  };

  initValues = text => {
    this.text = text;
  };

  createTempElement = () => {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.left = "-10000px";
    el.style.top = "-10000px";
    el.textContent = this.text;
    document.body.appendChild(el);
    el.contentEditable = true;

    return el;
  };

  selectContent = el => {
    const range = document.createRange();
    range.selectNodeContents(el);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  execCommand = () => {
    document.execCommand("copy");
  };

  removeTempElement = el => {
    document.body.removeChild(el);
  };
}

export default Clipboard;
