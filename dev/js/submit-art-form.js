// categories
const categoryRadioButtons = document.querySelectorAll('.js-category-input');
const submitArtForms = document.querySelectorAll('.js-form');
const selectedCategoryInput = document.querySelector('.js-selected-category');

function showSelectedForm(forms, selector) {
  forms.forEach((form) => {
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
}

// show selected form onclick
categoryRadioButtons.forEach((radioButton) => {
  // for dev purposes only
  if (radioButton.checked) {
    showSelectedForm(submitArtForms, radioButton.value);
    selectedCategoryInput.value = radioButton.value;
  }
  radioButton.addEventListener('change', () => {
    showSelectedForm(submitArtForms, radioButton.value);
    selectedCategoryInput.value = radioButton.value;
  });
});
