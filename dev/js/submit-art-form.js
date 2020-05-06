// categories
const categoryRadioButtons = document.querySelectorAll('.js-category-input');
const submitArtForms = document.querySelectorAll('.js-form');

// show selected form onclick
categoryRadioButtons.forEach((radioButton) => {
  const radio = radioButton;

  radio.addEventListener('change', () => {
    submitArtForms.forEach((element) => {
      const form = element;

      // clear visibility classes for explain texts
      form.classList.remove('sa-form--objekt');
      form.classList.remove('sa-form--erlebnis');
      form.classList.remove('sa-form--motiv');

      // show form when selected
      if (form.className.includes(radio.value)) {
        form.style.display = 'block';
        form.classList.add(`sa-form--${radio.value}`);
      } else {
        form.style.display = 'none';
      }
    });
  });
});

// document.querySelector('.js-form-gut').style.display = 'block'; // for dev purpose
