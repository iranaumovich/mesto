export class Card {

  constructor(cardData, templateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._popup = document.querySelector('.popup_type_image');
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupSubtitle = this._popup.querySelector('.popup__image-subtitle');
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__item')
      .cloneNode(true);
    return templateElement;
  }

  _like(evt) {
    evt.target.classList.toggle('place__like-button_active');
  }

  _remove(evt) {
    const placeItem = evt.target.closest('.places__item');
    placeItem.remove();
  }

  createCard(openPopup) {
    const template = this._getTemplate();
    const placeImage = template.querySelector('.place__image');
    const placeTitle = template.querySelector('.place__title');
    placeTitle.textContent = this._name;
    placeImage.alt = this._name;
    placeImage.src = this._link;

    const likeButton = template.querySelector('.place__like-button');
    const trashButton = template.querySelector('.places__trash-button');

    likeButton.addEventListener('click', this._like);
    trashButton.addEventListener('click', this._remove);
    placeImage.addEventListener('click', () => {
      this._popupImage.src = this._link;
      this._popupImage.alt = this._name;
      this._popupSubtitle.textContent = this._name;
      openPopup(this._popup);
    });

    return template;
  }
}