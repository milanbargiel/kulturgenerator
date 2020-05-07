// categories
const categoryRadioButtons = document.querySelectorAll('.js-category-input');
const submitArtForms = document.querySelectorAll('.js-form');
const selectedCategoryInput = document.querySelector('.js-selected-category');
const allRequiredInputs = document.querySelectorAll('.js-required-input');

function isVisible(el) {
  return !(el.offsetParent === null);
}

function makeVisibleInputsRequired() {
  allRequiredInputs.forEach((input) => {
    if (isVisible(input)) {
      input.setAttribute('required', '');
    } else {
      input.removeAttribute('required');
    }
  });
}

function showSelectedForm(selector) {
  // set hidden input to category name
  selectedCategoryInput.value = selector;

  // show selected funnel
  submitArtForms.forEach((form) => {
    // clear visibility classes for explain texts
    form.classList.remove('sa-form--objekt');
    form.classList.remove('sa-form--erlebnis');
    form.classList.remove('sa-form--motiv');

    // show form when selected
    if (form.className.includes(selector)) {
      form.setAttribute('style', 'display:block;');
      form.classList.add(`sa-form--${selector}`);
    } else {
      form.removeAttribute('style');
    }
  });

  // set html required attribute for visible inputs
  makeVisibleInputsRequired();
}

// show selected form onclick
categoryRadioButtons.forEach((radioButton) => {
  // for dev purposes only
  if (radioButton.checked) {
    showSelectedForm(radioButton.value);
  }
  radioButton.addEventListener('change', () => {
    showSelectedForm(radioButton.value);
  });
});

const hundertPercent = document.querySelector('.js-100-percent-input');
const hundertPercentThankYou = document.querySelector('.js-thank-you-100-percent');
const hundertPercentToggles = document.querySelectorAll('.js-100-percent-toggle-visibility');

hundertPercent.addEventListener('change', (event) => {
  if (event.target.checked) {
    hundertPercentThankYou.style.display = 'block';
    hundertPercentToggles.forEach((el) => {
      el.setAttribute('style', 'display: none;');
    });
    makeVisibleInputsRequired();
  } else {
    hundertPercentThankYou.style.display = 'none';
    hundertPercentToggles.forEach((el) => {
      el.setAttribute('style', 'display: block;');
    });
    makeVisibleInputsRequired();
  }
});
