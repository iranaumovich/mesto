const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popUps = document.querySelectorAll('.popup');
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
const popapImage = document.querySelector('.popup__image');
const popupImageSubtitle = document.querySelector('.popup__image-subtitle');
const initialCards = [
  {
    name: 'Стоунхендж',
    link: './images/card-stonehenge.jpg'
  },
  {
    name: 'Пирамида Хеопса',
    link: './images/card-sphinx.jpg'
  },
  {
    name: 'Зевс в Олимпии',
    link: './images/card-zeus.jpg'
  },
  {
    name: 'Мавзолей в Галикарнасе',
    link: './images/card-mausoleum.jpg'
  },
  {
    name: 'Мачу Пикчу',
    link: './images/card-machu-picchu.jpg'
  },
  {
    name: 'Петра',
    link: './images/card-petra.jpg'
  }
];

function openPopup(element) {
  document.querySelector(element).classList.add('popup_opened');
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;
}

function closePopup() {
  popUps.forEach(function (element) {
    element.classList.remove('popup_opened');
  })
}

function like(evt) {
  evt.target.classList.toggle('place__like-button_active');
};

function remove(evt) {
  evt.target.parentElement.style.display = "none";
}

function handleUserForm(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closePopup();
}

function addCard(card) {
  const placeItem = placeTemplate.querySelector('.places__item').cloneNode(true);
  const likeButton = placeItem.querySelector('.place__like-button');
  const trashButton = placeItem.querySelector('.places__trash-button');
  const placeImage = placeItem.querySelector('.place__image');
  const placeTitle = placeItem.querySelector('.place__title');
  placeTitle.textContent = card.name;
  placeImage.alt = card.name;
  placeImage.src = card.link;
  placesItem.prepend(placeItem);
  likeButton.addEventListener('click', like);
  trashButton.addEventListener('click', remove);
  placeImage.addEventListener('click', function () {
    popapImage.src = placeImage.src;
    popapImage.alt = placeImage.alt;
    popupImageSubtitle.textContent = placeTitle.textContent;
    openPopup('.popup_type_image');
  });
}

function addInitialCards() {
  for (let i = initialCards.length - 1; i >= 0; i--) {
    addCard(initialCards[i]);
  }
}

function handleCardForm(evt) {
  evt.preventDefault();
  if (!pictureTitle.value || !pictureLink.value) {
    return;
  }
  const newCard = { name: pictureTitle.value, link: pictureLink.value }
  initialCards.unshift(newCard);
  addCard(newCard);
  closePopup();
}

addInitialCards();

formElementTypeEdit.addEventListener('submit', handleUserForm);

formElementTypeAdd.addEventListener('submit', handleCardForm);

editButton.addEventListener('click', () => { openPopup('.popup_type_edit-form') });

addButton.addEventListener('click', () => { openPopup('.popup_type_add-form') });

closeButtons.forEach((element) => { element.addEventListener('click', closePopup) });














