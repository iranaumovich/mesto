const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popUp = document.querySelector('.popup');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__item_type_name');
const descriptionInput = formElement.querySelector('.form__item_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  popUp.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);

editButton.addEventListener('click', function () {
  popUp.classList.add('popup_opened');
});

closeButton.addEventListener('click', function () {
  popUp.classList.remove('popup_opened');
});







