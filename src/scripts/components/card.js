export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._template = this._getTemplate();
    this._placeImage = this._template.querySelector('.place__image');
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.places__item')
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

  _setEventListeners() {
    const likeButton = this._template.querySelector('.place__like-button');
    const trashButton = this._template.querySelector('.places__trash-button');
    likeButton.addEventListener('click', this._like);
    trashButton.addEventListener('click', this._remove);
    this._placeImage.addEventListener('click', this._handleCardClick);
  }

  createCard() {
    const placeTitle = this._template.querySelector('.place__title');
    placeTitle.textContent = this._name;
    this._placeImage.alt = this._name;
    this._placeImage.src = this._link;

    this._setEventListeners();

    return this._template;
  }
}
