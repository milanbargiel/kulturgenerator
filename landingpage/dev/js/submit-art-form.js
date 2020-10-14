// categories
const categoryRadioButtons = document.querySelectorAll('.js-category-input');
const submitArtForm = document.querySelector('.js-form');
const selectedCategoryInput = document.querySelector('.js-selected-category');
const allRequiredInputs = document.querySelectorAll('.js-required-input');

// file upload
let files = {};
const fileInput = document.querySelector('.js-file-input');
const imageDataContainer = document.querySelector('.js-image-data');
const imageSizeError = document.querySelector('.js-image-size-error');
const tooManyImagesError = document.querySelector('.js-too-many-images-error');

// form submit
const savingAnimation = document.querySelector('.js-saving');
const saFormSuccessText = document.querySelector('.js-sa-form-success-text');
const saFormErrorText = document.querySelector('.js-sa-form-error-text');

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

function lockInputs(inputs, state) {
  inputs.forEach((input) => {
    input.setAttribute('readonly', state);
  });
}

function clearForm() {
  // reset form
  submitArtForm.reset();
  // manually dispatch change event to fileInput Listener
  // to reset file input
  const event = document.createEvent('HTMLEvents');
  event.initEvent('change', false, true);
  // manually dispatch change event on image input
  // to reset image selection
  fileInput.dispatchEvent(event);
  // clear image uploads
  imageDataContainer.innerHTML = '';
  files = {};
}

function showSelectedForm(selector) {
  // clear visibility classes for explain texts
  submitArtForm.classList.remove('sa-form--objekt');
  submitArtForm.classList.remove('sa-form--erlebnis');
  submitArtForm.classList.remove('sa-form--motiv');

  // show selected funnel
  submitArtForm.setAttribute('style', 'display:block;');
  submitArtForm.classList.add(`sa-form--${selector.toLowerCase()}`);

  // clear previous form inputs
  clearForm();

  // set hidden input to category name
  selectedCategoryInput.value = selector;

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

function removeImageOnClick(fileName, node) {
  node.addEventListener('click', () => {
    delete files[fileName]; // remove file from global files object
    const imageDiv = node.parentNode;
    imageDiv.parentNode.removeChild(imageDiv);
  });
}

// file upload
// listen to change on input type file
fileInput.addEventListener('change', (inputEvent) => {
  const file = inputEvent.target.files[0];
  const reader = new FileReader();

  // remove error messages
  imageSizeError.removeAttribute('style');
  tooManyImagesError.removeAttribute('style');

  // create hidden text image data to upload via form
  reader.addEventListener('load', () => {
    files[file.name] = file; // push file to global files object
    const newImage = document.createElement('div');
    newImage.setAttribute('class', 'iu-image');
    const html = `<span class="file-name">${file.name}</span><span class="remove-button js-remove-image">x</span>`;
    newImage.innerHTML = html;
    removeImageOnClick(file.name, newImage.lastChild); // bind event listener to remove element
    imageDataContainer.appendChild(newImage);
  });

  if (file) { // file selected
    if (Object.keys(files).length < 3) { // max 3 files
      const fileSize = ((file.size / 1024) / 1024).toFixed(4); // MB

      if (fileSize < 5) { // max 5MB
        reader.readAsDataURL(file);
      } else {
        imageSizeError.setAttribute('style', 'display: block;');
      }
    } else { // more that 3 images are selected
      tooManyImagesError.setAttribute('style', 'display: block;');
    }
  }
});

// form submit
// Variable to hold request
let request;

// Bind to the submit event of our form
$('.js-form').submit((event) => {
  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();

  // Abort any pending request
  if (request) {
    request.abort();
  }

  // clear any response texts if existent
  saFormSuccessText.removeAttribute('style');
  saFormErrorText.removeAttribute('style');

  // setup some local variables
  const inputs = submitArtForm.querySelectorAll('input, textarea');

  // Serialize the data in the form
  const formData = new FormData();
  const data = {};

  console.log(data);

  inputs.forEach((input) => {
    if (!['submit', 'file'].includes(input.type) && input.value && input.name) { // regular input with a value
      if ((input.type === 'radio' || input.type === 'checkbox') && !input.checked) {
        return;
      }

      data[input.name] = input.value;
    }
  });

  formData.append('data', JSON.stringify(data));

  // Add images
  Object.values(files).forEach((file) => {
    formData.append('files.images', file, file.name);
  });

  // Let's disable the inputs for the duration of the Ajax request.
  // Note: we disable elements AFTER the form data has been serialized.
  // Disabled form elements will not be serialized.
  lockInputs(inputs, true);

  savingAnimation.setAttribute('style', 'display: inline-block;');

  // Fire off the request
  request = $.ajax({
    url: 'http://localhost:1337/artworks',
    type: 'post',
    data: formData,
    processData: false,
    contentType: false,
    timeout: 30000,
  });

  // Callback handler that will be called on success
  request.done(() => {
    saFormSuccessText.setAttribute('style', 'display:block;');
    clearForm();
  });

  // Callback handler that will be called on failure
  request.fail(() => {
    saFormErrorText.setAttribute('style', 'display:block;');
  });

  // Callback handler that will be called regardless
  // if the request failed or succeeded
  request.always(() => {
    // Reenable the inputs
    lockInputs(inputs, false);
    savingAnimation.removeAttribute('style');
  });
});
