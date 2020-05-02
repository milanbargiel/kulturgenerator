// PARTICIPATE FORM
const participateForm = document.querySelector('.js-participate-form');
const url = 'https://script.google.com/macros/s/AKfycbz9H2pxk7l490N_KAS47aQeyhPHjPS61EhOrVW-Nq8Csf9X81w/exec';

function serialize(form) {

  // Setup our serialized data
  let serialized = '';

  // Loop through each field in the form
  for (let i = 0; i < form.elements.length; i += 1) {
    const field = form.elements[i];

    // Don't serialize fields without a
    // name, submits, buttons, file and reset inputs, and disabled fields
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') {
      return undefined;
    }

    // Convert field data to a query string
    if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized += `&${encodeURIComponent(field.name)}=${encodeURIComponent(field.value)}`;
    }

    return serialized;
  }
}

function submitParticipateForm() {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
    }
  };
  request.open('GET', url);
  request.send(`&${encodeURIComponent('form_field_1=John Rambo')}`);
}

participateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitParticipateForm();
});
