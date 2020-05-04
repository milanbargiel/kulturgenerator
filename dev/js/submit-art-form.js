const categoryButtons = document.querySelectorAll('.js-category-selection');
const submitArtForms = document.querySelectorAll('.js-form');

// show selected form onclick
categoryButtons.forEach((button) => {
  button.addEventListener('change', () => {
    // hide all forms except chosen form
    submitArtForms.forEach((element) => {
      const form = element;
      if (form.className.includes(button.value)) {
        form.style.display = 'block';
      } else {
        form.style.display = 'none';
      }
    });
  });
});

// document.querySelector('.js-form-gut').style.display = 'block'; // for dev purpose


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
