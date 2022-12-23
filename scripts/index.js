const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popUp = document.querySelector('.popup');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__item_type_name');
const descriptionInput = formElement.querySelector('.form__item_type_description');

function openPopup() {
  popUp.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
}

function closePopup() {
  popUp.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);







