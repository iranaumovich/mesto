const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');
const formElementTypeEdit = document.querySelector('.form_type_edit');
const formElementTypeAdd = document.querySelector('.form_type_add');
const nameInput = document.querySelector('.form__item_type_name');
const descriptionInput = document.querySelector('.form__item_type_description');
const placeTemplate = document.querySelector('.template').content;
const placesItem = document.querySelector('.places');
const pictureTitle = document.querySelector('.form__item_type_picture-title');
const pictureLink = document.querySelector('.form__item_type_picture-link');
const popupImage = document.querySelector('.popup__image');
const popupImageSubtitle = document.querySelector('.popup__image-subtitle');
const profilePopup = document.querySelector('.popup_type_edit-form');
const cardPopup = document.querySelector('.popup_type_add-form');
const imagePopup = document.querySelector('.popup_type_image');
const popUps = document.querySelectorAll('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupImageContainer = document.querySelector('.popup__image-container');

function openPopup(element) {
  element.classList.add('popup_opened');
}

function closePopup(element) {
  element.classList.remove('popup_opened');
}

function like(evt) {
  evt.target.classList.toggle('place__like-button_active');
}

function remove(evt) {
  const placeItem = evt.target.closest('.places__item');
  placeItem.remove();
}

function createCard(card) {
  const placeItem = placeTemplate.querySelector('.places__item').cloneNode(true);
  const likeButton = placeItem.querySelector('.place__like-button');
  const trashButton = placeItem.querySelector('.places__trash-button');
  const placeImage = placeItem.querySelector('.place__image');
  const placeTitle = placeItem.querySelector('.place__title');
  placeTitle.textContent = card.name;
  placeImage.alt = card.name;
  placeImage.src = card.link;
  likeButton.addEventListener('click', like);
  trashButton.addEventListener('click', remove);
  placeImage.addEventListener('click', function () {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupImageSubtitle.textContent = card.name;
    openPopup(imagePopup);
  });
  return placeItem;
}

function renderCard(card) {
  const node = createCard(card);
  placesItem.prepend(node);
}

function addInitialCards() {
  initialCards.reverse().forEach(function (card) {
    renderCard(card);
  });
}

function handleUserForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup(profilePopup);
}

function handleCardForm(evt) {
  evt.preventDefault();
  const newCard = { name: pictureTitle.value, link: pictureLink.value }
  renderCard(newCard);
  closePopup(cardPopup);
  pictureTitle.value = '';
  pictureLink.value = '';
}

function init() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  addInitialCards();
  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__error_visible'
  });
}

formElementTypeEdit.addEventListener('submit', handleUserForm);

formElementTypeAdd.addEventListener('submit', handleCardForm);

editButton.addEventListener('click', function () { openPopup(profilePopup) });

addButton.addEventListener('click', function () { openPopup(cardPopup) });

closeButtons.forEach(function (btn) {
  const closestPopup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(closestPopup));
});

popUps.forEach(function (popupElement) {
  popupElement.addEventListener('click', function (evt) {
    if (evt.target !== popupContainer && evt.target !== popupImageContainer) {
      closePopup(popupElement);
    }
  });
});

window.addEventListener('keydown', function (evt) {
  if (evt.key !== 'Escape') {
    return
  }
  popUps.forEach(function (popupElement) {
    if (popupElement.classList.contains('popup_opened')) {
      closePopup(popupElement);
    }
  });
});

init();