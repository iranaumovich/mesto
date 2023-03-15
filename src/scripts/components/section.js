export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items.reverse();
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this.addItem = this.addItem.bind(this);
  }

  renderItems() {
    this._renderedItems.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
