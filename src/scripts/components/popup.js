export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');
    const popupContainer = this._popup.querySelector('.popup__container');
    const popupImageContainer = this._popup.querySelector(
      '.popup__image-container',
    );

    closeButton.addEventListener('click', () => this.close());

    this._popup.addEventListener('click', (evt) => {
      if (
        !popupContainer?.contains(evt.target) &&
        !popupImageContainer?.contains(evt.target)
      ) {
        this.close();
      }
    });
  }
}
