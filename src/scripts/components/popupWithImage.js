import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__image');
    this._subtitleElement = this._popup.querySelector('.popup__image-subtitle');
  }

  open(link, description) {
    this._imageElement.src = link;
    this._imageElement.alt = description;
    this._subtitleElement.textContent = description;
    super.open();
  }
}
