// categories
const categoryRadioButtons = document.querySelectorAll('.js-category-input');
const submitArtForm = document.querySelector('.js-form');
const selectedCategoryInput = document.querySelector('.js-selected-category');
const allRequiredInputs = document.querySelectorAll('.js-required-input');

// donation toggle visibility
const donationInputs = document.querySelectorAll('.js-donation-input');
const donationThankYou = document.querySelector('.js-thank-you-donation');
const fullDonationToggles = document.querySelectorAll('.js-full-donation-toggle-visibility');

// file upload
let numOfFiles = 0; // max 3
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

function clearForm() {
  // reset form
  submitArtForm.reset();
  // manually dispatch change event on donation listener
  // to reset visibility toggles to funnel defaults
  const event = document.createEvent('HTMLEvents');
  event.initEvent('change', false, true);
  donationInputs[0].dispatchEvent(event);
  // manually dispatch change event on image input
  // to reset image selection
  fileInput.dispatchEvent(event);
  // clear image uploads
  imageDataContainer.innerHTML = '';
  numOfFiles = 0;
}

function showSelectedForm(selector) {
  // clear visibility classes for explain texts
  submitArtForm.classList.remove('sa-form--objekt');
  submitArtForm.classList.remove('sa-form--erlebnis');
  submitArtForm.classList.remove('sa-form--motiv');

  // show selected funnel
  submitArtForm.setAttribute('style', 'display:block;');
  submitArtForm.classList.add(`sa-form--${selector}`);

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

// donation toggle visibility
donationInputs.forEach((donationInput) => {
  donationInput.addEventListener('change', () => {
    // create object that holds current selection of donation options
    const selection = {};
    donationInputs.forEach((input) => {
      selection[input.id] = input.checked;
    });
    // if 100% donation
    // => thank you
    if (selection['donation-input-yes']) {
      donationThankYou.style.display = 'block';
    } else {
      donationThankYou.removeAttribute('style');
    }

    // if 100% donation and no payout
    // hide all plausibility checks
    if (selection['donation-input-yes'] && selection['payout-input'] === false) {
      fullDonationToggles.forEach((el) => {
        el.setAttribute('style', 'display: none;');
      });
    } else { // show plausibility checks
      fullDonationToggles.forEach((el) => {
        el.removeAttribute('style');
      });
    }
    makeVisibleInputsRequired();
  });
});

function removeImageOnClick(node) {
  node.addEventListener('click', () => {
    const imageDiv = node.parentNode;
    imageDiv.parentNode.removeChild(imageDiv);
    numOfFiles -= 1;
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
  reader.addEventListener('load', (readerEvent) => {
    numOfFiles += 1;
    const newImage = document.createElement('div');
    newImage.setAttribute('class', 'iu-image');
    let html = `<input type="hidden" name="mimetype" value="${readerEvent.target.result.match(/^.*(?=;)/)[0]}" >`;
    html += `<input type="hidden" name="data" value="${readerEvent.target.result.replace(/^.*,/, '')}" >`;
    html += `<span class="file-name">${readerEvent.target.fileName}</span><span class="remove-button js-remove-image">x</span>`;
    newImage.innerHTML = html;
    removeImageOnClick(newImage.lastChild); // bind event listener to remove element
    imageDataContainer.appendChild(newImage);
  });

  if (file) { // file selected
    if (numOfFiles < 3) { // max 3 files
      const fileSize = ((file.size / 1024) / 1024).toFixed(4); // MB
      reader.fileName = file.name;

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
  const $form = $(event.target);

  // Let's select and cache all the fields
  const $inputs = $form.find('input, select, button, textarea');

  // Serialize the data in the form
  const serializedData = $form.serialize();

  // Let's disable the inputs for the duration of the Ajax request.
  // Note: we disable elements AFTER the form data has been serialized.
  // Disabled form elements will not be serialized.
  $inputs.prop('disabled', true);

  savingAnimation.setAttribute('style', 'display: inline-block;');

  // Fire off the request
  request = $.ajax({
    url: 'https://script.google.com/macros/s/AKfycby4Ti9QvWXWkpzRx4ia9Ea91sP1bdCSU_4N9U1sxMoICNqPWbs/exec',
    type: 'post',
    data: serializedData,
    timeout: 20000,
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
    $inputs.prop('disabled', false);
    savingAnimation.removeAttribute('style');
  });
});
