// categories
const categoryRadioButtons = document.querySelectorAll('.js-category-input');
const submitArtForm = document.querySelector('.js-form');
const selectedCategoryInput = document.querySelector('.js-selected-category');
const allRequiredInputs = document.querySelectorAll('.js-required-input');

// 100 percent toggle visibility
const hundertPercent = document.querySelector('.js-100-percent-input');
const hundertPercentThankYou = document.querySelector('.js-thank-you-100-percent');
const hundertPercentToggles = document.querySelectorAll('.js-100-percent-toggle-visibility');

// no member toggle visibility
const noMember = document.querySelector('.js-no-member-input');
const entitlement = document.querySelector('.js-entitlement');

// file upload
const fileInput = document.querySelector('.js-file-input');
const hiddenImageData = document.querySelector('.js-hidden-image-data');
const imageSizeError = document.querySelector('.js-image-size-error');

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
  // manually dispatch change event on hunderPercentDonation listener
  // to reset visibility toggles to funnel defaults
  const event = document.createEvent('HTMLEvents');
  event.initEvent('change', false, true);
  hundertPercent.dispatchEvent(event);
  // manually dispatch change event on image input
  // to reset image selection
  fileInput.dispatchEvent(event);
}

function showSelectedForm(selector) {
  // clear visibility classes for explain texts
  submitArtForm.classList.remove('sa-form--objekt');
  submitArtForm.classList.remove('sa-form--erlebnis');
  submitArtForm.classList.remove('sa-form--motiv');

  // show selected funnel
  if (submitArtForm.className.includes(selector)) {
    submitArtForm.setAttribute('style', 'display:block;');
    submitArtForm.classList.add(`sa-form--${selector}`);
  }

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

// 100 percent toggle visibility
hundertPercent.addEventListener('change', (event) => {
  if (event.target.checked) {
    // show thank you message for 100 percent donation
    hundertPercentThankYou.style.display = 'block';
    // hide plausibility checks and further money options
    hundertPercentToggles.forEach((el) => {
      el.setAttribute('style', 'display: none;');
    });
    makeVisibleInputsRequired();
  } else {
    hundertPercentThankYou.style.display = 'none';
    // reset to funnel defaults and remove style attribute if already set before
    hundertPercentToggles.forEach((el) => {
      el.removeAttribute('style');
    });
    makeVisibleInputsRequired();
  }
});

// no member toggle visibility
noMember.addEventListener('change', (event) => {
  if (event.target.checked) {
    entitlement.style.display = 'block';
  } else {
    entitlement.removeAttribute('style');
  }
});

// file upload
// listen to change on input type file
fileInput.addEventListener('change', (inputEvent) => {
  const file = inputEvent.target.files[0];
  const reader = new FileReader();

  // remove error messages
  imageSizeError.removeAttribute('style');

  // create hidden text image data to upload via form
  reader.addEventListener('load', (readerEvent) => {
    let html = `<input type="hidden" name="data" value="${readerEvent.target.result.replace(/^.*,/, '')}" >`;
    html += `<input type="hidden" name="mimetype" value="${readerEvent.target.result.match(/^.*(?=;)/)[0]}" >`;
    hiddenImageData.innerHTML = html;
  });

  if (file) {
    const fileSize = ((file.size / 1024) / 1024).toFixed(4); // MB
    if (fileSize < 5) {
      reader.readAsDataURL(file);
    } else {
      imageSizeError.setAttribute('style', 'display: block;');
    }
  } else { // no file selected
    hiddenImageData.innerHTML = '';
  }
});
