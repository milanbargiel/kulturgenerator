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

// form stuff
const fileInput = document.querySelector('.js-file-input');
const hiddenImageData = document.querySelector('.js-hidden-image-data');
const fileContainer = document.querySelector('.js-file-container');

// listen to change on input type file
fileInput.addEventListener('change', (inputEvent) => {
  const file = inputEvent.target.files[0];
  const reader = new FileReader();

  // create hidden text image data to upload via form
  reader.addEventListener('load', (readerEvent) => {
    let html = `<input type="hidden" name="data" value="${readerEvent.target.result.replace(/^.*,/, '')}" >`;
    html += `<input type="hidden" name="mimetype" value="${readerEvent.target.result.match(/^.*(?=;)/)[0]}" >`;
    hiddenImageData.innerHTML = html;
    // display image in file container
    fileContainer.innerHTML = `<div class="iu__file">${file.name}<span class="iu__file-remove js-file-remove">x</span></div>`;
    fileContainer.style.border = '1px solid black';
    fileContainer.style.borderTopColor = '#fff';
  });

  if (file) {
    reader.readAsDataURL(file);
  } else { // no file selected
    hiddenImageData.innerHTML = '';
    fileContainer.innerHTML = '';
    fileContainer.style.border = 'none';
  }
});

// remove file selection on user wish
fileContainer.addEventListener('click', (event) => {
  if (event.target && event.target.className.includes('js-file-remove')) {
    fileInput.value = null;
    fileInput.dispatchEvent(new Event('change'));
  }
});
