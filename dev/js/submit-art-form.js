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


const fileInput = document.querySelector('.js-file-input');
const hiddenImageData = document.querySelector('.js-hidden-image-data');

// listen to change on input type file
fileInput.addEventListener('change', (inputEvent) => {
  const file = inputEvent.target.files[0];
  const reader = new FileReader();

  // create hidden text image data to upload via form
  reader.addEventListener('load', (readerEvent) => {
    let html = `<input type="hidden" name="data" value="${readerEvent.target.result.replace(/^.*,/, '')}" >`;
    html += `<input type="hidden" name="mimetype" value="${readerEvent.target.result.match(/^.*(?=;)/)[0]}" >`;
    hiddenImageData.innerHTML = html;
  });

  if (file) {
    reader.readAsDataURL(file);
  }
});
