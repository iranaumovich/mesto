function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.getAttribute('aria-describedby')}`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.getAttribute('aria-describedby')}`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function isValid(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, formButton) {
  if (hasInvalidInput(inputList)) {
    formButton.setAttribute('disabled', true);
  } else {
    formButton.removeAttribute('disabled');
  }
}

function setInputsHandler(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const formButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, formButton);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, formButton);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (formElement) {
    setInputsHandler(formElement, config);
  });
}


