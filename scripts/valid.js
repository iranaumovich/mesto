export class FormValidator {
  constructor(formData, formElement) {
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.getAttribute('aria-describedby')}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.getAttribute('aria-describedby')}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput(inputList) {
    return inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, formButton) {
    if (this._hasInvalidInput(inputList)) {
      formButton.setAttribute('disabled', true);
    } else {
      formButton.removeAttribute('disabled');
    }
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setInputsHandler() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const formButton = this._formElement.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, formButton);
      });
    });

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButtonState(inputList, formButton);
    })

    this._toggleButtonState(inputList, formButton);
  }

  enableValidation() {
    this._setInputsHandler();
  }

}