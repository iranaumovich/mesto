export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this.addItem = this.addItem.bind(this);
  }

  renderItems(items) {
    items.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
