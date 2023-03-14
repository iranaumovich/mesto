export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items.reverse();
    this._renderer = renderer;
    this.container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this.container.prepend(element);
  }
}
