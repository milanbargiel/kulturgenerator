// categories
const categories = document.querySelectorAll('.js-category');
const submitArtForms = document.querySelectorAll('.js-form');
const explainTexts = document.querySelectorAll('.js-explain');


// show selected form onclick
categories.forEach((category) => {
  const input = category.querySelector('input[type="radio"]');
  // const label = category.querySelector('label');

  input.addEventListener('change', () => {
    // hide all forms except chosen form
    submitArtForms.forEach((element) => {
      const form = element;
      if (form.className.includes(input.value)) {
        form.style.display = 'block';
      } else {
        form.style.display = 'none';
      }
    });
    // hide all explain texts except chosen explaintext
    explainTexts.forEach((element) => {
      const explainText = element;
      if (explainText.className.includes(input.value)) {
        explainText.style.display = 'block';
      } else {
        explainText.style.display = 'none';
      }
    });
  });
});

// document.querySelector('.js-form-gut').style.display = 'block'; // for dev purpose
