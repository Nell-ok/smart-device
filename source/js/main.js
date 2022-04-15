const MIN_LENGTH = 18;

const pageBody = document.querySelector('.page__body');
const buttonHeader = document.querySelector('.page-header__button');
const pageForm = document.querySelectorAll('[name="form"]');
const telInput = document.querySelectorAll('[type="tel"]');
const modalForm = document.querySelector('.modal');
const modalInput = document.querySelector('.modal [type="text"]');
const modalOverlay = document.querySelector('.modal__overlay');
const buttonClose = document.querySelector('.modal__button');
const accordionsFooter = document.querySelectorAll('.page-footer__accordion');
const textAll = document.querySelector('.about__text--all');
const buttonAll = document.querySelector('.about__link');
const maskedInputs = document.querySelectorAll('[data-mask]');

const isElements = accordionsFooter && textAll && buttonAll && buttonHeader && modalForm && pageForm;

const activateScript = () => {
  accordionsFooter.forEach((item) => {
    item.classList.remove('page-footer__accordion--nojs');
    item.classList.add('page-footer__accordion--closed');
  });
};

const disableScript = () => {
  accordionsFooter.forEach((item) => {
    item.classList.add('page-footer__accordion--nojs');
  });
};

const onClick = (element, functionName) => {
  element.addEventListener('click', () => {
    functionName();
  });
};

const openModal = () => {
  if (!modalForm.classList.contains('modal--opened')) {
    modalForm.classList.add('modal--opened');
    pageBody.classList.add('page__body--hidden');
    modalInput.focus();
    disableFocus();
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const disableFocus = () => {
  document.addEventListener('focus', (evt) => {
    if (modalForm && !modalForm.contains(evt.target)) {
      evt.stopPropagation();
      modalInput.focus();
    }
  }, true);
};

const closeModal = () => {
  if (modalForm.classList.contains('modal--opened')) {
    modalForm.classList.remove('modal--opened');
    pageBody.classList.remove('page__body--hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeModal();
  }
};

const setModalActions = () => {
  onClick(buttonClose, closeModal);
  onClick(modalOverlay, closeModal);
  onClick(buttonHeader, openModal);
};

const onClickAccordion = (element) => {
  element.addEventListener('click', () => {
    if (element.classList.contains('page-footer__accordion--closed')) {
      accordionsFooter.forEach((item) => {
        item.classList.add('page-footer__accordion--closed');
      });
      element.classList.remove('page-footer__accordion--closed');
      element.classList.add('page-footer__accordion--opened');
    } else {
      element.classList.remove('page-footer__accordion--opened');
      element.classList.add('page-footer__accordion--closed');
    }
  });
};

const selectAccordions = () => {
  accordionsFooter.forEach((accordion) => {
    onClickAccordion(accordion);
  });
};

const activateButtonAll = () => {
  if (textAll.classList.contains('about__text--all-closed')) {
    textAll.classList.remove('about__text--all-closed');
    buttonAll.textContent = 'Свернуть';
  } else {
    textAll.classList.add('about__text--all-closed');
    buttonAll.textContent = 'Подробнее';
  }
};

const onClickButtonAll = () => {
  buttonAll.addEventListener('click', (evt) => {
    evt.preventDefault();
    activateButtonAll();
  });
};

const createMask = () => {
  for (let index = 0; index < maskedInputs.length; index++) {
    maskedInputs[index].addEventListener('input', () => {
      let inputMask = maskedInputs[index];
      let maskData = inputMask.dataset.mask;
      let valueInput = inputMask.value;
      let literalPattern = /[0\*]/;
      let numberPattern = /[0-9]/;
      let newValue = '';
      try {
        let maskLength = maskData.length;
        let valueIndex = 0;
        let maskIndex = 0;
        for (; maskIndex < maskLength;) {
          if (maskIndex >= valueInput.length) {
            break;
          }
          if (maskData[maskIndex] === '0' && valueInput[valueIndex].match(numberPattern) === null) {
            break;
          }
          while (maskData[maskIndex].match(literalPattern) === null) {
            if (valueInput[valueIndex] === maskData[maskIndex]) {
              break;
            }
            newValue += maskData[maskIndex++];
          }
          newValue += valueInput[valueIndex++];
          maskIndex++;
        }
        inputMask.value = newValue;
      } catch (evt) {
        return;
      }
    });
  }
};

pageForm.forEach((form) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    telInput.forEach((input) => {
      const valueLength = input.value.length;
      if (valueLength < MIN_LENGTH) {
        return;
      }
      if (valueLength > MIN_LENGTH) {
        return;
      }
      form.submit();
      input.value = '';
    });
  });
});

if (isElements) {
  activateScript();
  selectAccordions();
  onClickButtonAll();
  setModalActions();
  createMask();
} else {
  disableScript();
}
