import { initialCards } from './cards.js';
import { Card } from './card.js';
import { FormValidator } from './formValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');
const formElementTypeEdit = document.querySelector('.form_type_edit');
const formElementTypeAdd = document.querySelector('.form_type_add');
const nameInput = document.querySelector('.form__item_type_name');
const descriptionInput = document.querySelector('.form__item_type_description');
const placesItem = document.querySelector('.places');
const pictureTitle = document.querySelector('.form__item_type_picture-title');
const pictureLink = document.querySelector('.form__item_type_picture-link');
const profilePopup = document.querySelector('.popup_type_edit-form');
const cardPopup = document.querySelector('.popup_type_add-form');
const popUps = document.querySelectorAll('.popup');
const popupContainers = document.querySelectorAll('.popup__container');
const popupImageContainer = document.querySelector('.popup__image-container');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageElement = popupTypeImage.querySelector('.popup__image');
const popupSubtitle = popupTypeImage.querySelector('.popup__image-subtitle');

const popupImage = {
  imageElement: popupImageElement,
  subtitleElement: popupSubtitle,
  open: () => openPopup(popupTypeImage)
}

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function openProfilePopup() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
  openPopup(profilePopup);
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  element.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

function renderCard(card) {
  const newCard = new Card(card, '.template', popupImage);
  const node = newCard.createCard(openPopup);
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
  evt.target.reset();
}

function init() {
  addInitialCards();

  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(function (formElement) {
    const formValidator = new FormValidator({
      inputSelector: '.form__item',
      submitButtonSelector: '.form__button',
      inputErrorClass: 'form__item_type_error',
      errorClass: 'form__error_visible'
    }, formElement);
    formValidator.enableValidation();
  });
}

formElementTypeEdit.addEventListener('submit', handleUserForm);

formElementTypeAdd.addEventListener('submit', handleCardForm);

editButton.addEventListener('click', openProfilePopup);

addButton.addEventListener('click', function () {
  formElementTypeAdd.reset();
  openPopup(cardPopup);
});

closeButtons.forEach(function (btn) {
  const closestPopup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(closestPopup));
});

popUps.forEach(function (popupElement) {
  popupElement.addEventListener('click', function (evt) {
    const popupContainer = Array.from(popupContainers).some(function (element) {
      return element.contains(evt.target);
    });

    if (!popupContainer && !popupImageContainer.contains(evt.target)) {
      closePopup(popupElement);
    }
  });
});

init();