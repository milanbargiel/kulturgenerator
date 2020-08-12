const newsletterForm = document.querySelector('.js-newsletter-form');
const emailInput = newsletterForm.querySelector('.js-newsletter-e-mail');
const successText = document.querySelector('.js-newsletter-success-text');
const errorText = document.querySelector('.js-newsletter-error-text');

function serialize(inputField) {
  const serialized = `&${encodeURIComponent(inputField.name)}=${encodeURIComponent(inputField.value)}`;
  return serialized;
}

function submitMailChimpForm(form, inputField) {
  let url = form.getAttribute('action');
  url = url.replace('/post?u=', '/post-json?u=');
  url += `${serialize(inputField)}&c=displayMailChimpStatus`;

  // Create and load script for ajax with url and callback when form is submitted
  const script = window.document.createElement('script');
  script.src = url;

  // Insert script tag into the DOM (append to <head>)
  document.head.appendChild(script);

  // After the script is loaded (and executed), remove it
  /* eslint-disable func-names */
  script.onload = function () {
    this.remove();
  };
}

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // clear form responses
  successText.style.display = 'none';
  errorText.style.display = 'none';
  // submit form
  submitMailChimpForm(event.target, emailInput);
});

/* eslint-disable no-unused-vars */
function displayMailChimpStatus(data) {
  if (data.result === 'error') {
    errorText.style.display = 'block';
    return;
  }
  // on success
  newsletterForm.reset(); // clear input
  successText.style.display = 'block';
}
