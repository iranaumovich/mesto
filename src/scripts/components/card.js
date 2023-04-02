export default class Card {
  constructor(
    cardData,
    templateSelector,
    hasLike,
    handleCardClick,
    handleSetLike,
    handleDeleteLike,
    deletePopup,
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._userId = cardData.owner._id;
    this._hasLike = hasLike;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._placeImage = this._cardElement.querySelector('.place__image');
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
    this._like = this._like.bind(this);
    this._deletePopup = deletePopup;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.places__item')
      .cloneNode(true);
    return templateElement;
  }

  _like(evt) {
    const placeLikeCounter = evt.target.querySelector('.place__like-counter');
    if (!this.hasLike) {
      this._handleSetLike().then((data) => {
        placeLikeCounter.textContent = data.likes.length;
        evt.target.classList.add('place__like-button_active');
        this.hasLike = true;
      });
    } else {
      this._handleDeleteLike().then((data) => {
        placeLikeCounter.textContent = data.likes.length - 1;
        evt.target.classList.remove('place__like-button_active');
        this.hasLike = false;
      });
    }
  }

  deleteCard() {
    this._cardElement.remove();
  }

  /* _remove() {
    this._cardElement.remove();
  } */

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector('.place__like-button');
    const trashButton = this._cardElement.querySelector(
      '.places__trash-button',
    );
    likeButton.addEventListener('click', this._like);
    /* trashButton.addEventListener('click', this._remove.bind(this)); */
    trashButton.addEventListener('click', () =>
      this._deletePopup.open(this._cardElement, this._cardId),
    );
    this._placeImage.addEventListener('click', () =>
      this._handleCardClick(this._link, this._name),
    );
  }

  createCard() {
    const placeTitle = this._cardElement.querySelector('.place__title');
    const placeLikeCounter = this._cardElement.querySelector(
      '.place__like-counter',
    );
    const trashButton = this._cardElement.querySelector(
      '.places__trash-button',
    );
    if (this._userId !== 'a532ca01e1547a5c388d6c95') {
      trashButton.classList.add('places__trash-button_invisible');
    }
    this._handleSetLike().then((data) => {
      placeLikeCounter.textContent = data.likes.length - 1;
    });
    placeTitle.textContent = this._name;
    this._placeImage.alt = this._name;
    this._placeImage.src = this._link;

    this._setEventListeners();

    return this._cardElement;
  }
}
