const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
  user: /^[a-zA-Z0-9\_\-]{4,16}$/, // 4 to 16 digits. Letters, numbers, dashes and underscores.
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // 1 to 40 digits. Letters (accents allowed) and white spaces.
  password: /^.{4,12}$/, // 4 to 12 digits.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Letters, numbers, dots, dashes and underscores.
  phone: /^\d{7,14}$/, // 7 to 14 numbers.
};

const fields = {
  user: false,
  name: false,
  password: false,
  email: false,
  phone: false,
};

const formValidationListener = (e) => {
  formValidation(e.target);
};

const formValidation = (input) => {
  switch (input.name) {
    case 'user':
      fieldValidation(expressions.user, input, 'user');
      break;
    case 'name':
      fieldValidation(expressions.name, input, 'name');
      break;
    case 'password':
      fieldValidation(expressions.password, input, 'password');
      passwordValidation();
      break;
    case 'password2':
      passwordValidation();
      break;
    case 'email':
      fieldValidation(expressions.email, input, 'email');
      break;
    case 'phone':
      fieldValidation(expressions.phone, input, 'phone');
      break;
  }
};

const fieldValidation = (expression, input, field) => {
  if (expression.test(input.value)) {
    document
      .getElementById(`group-${field}`)
      .classList.remove('form-group-error');
    document
      .getElementById(`group-${field}`)
      .classList.add('form-group-success');
    document
      .querySelector(`#group-${field} i`)
      .classList.add('fa-check-circle');
    document
      .querySelector(`#group-${field} i`)
      .classList.remove('fa-times-circle');
    document
      .querySelector(`#group-${field} .form-input-error`)
      .classList.remove('form-input-error-active');
    fields[field] = true;
  } else {
    document.getElementById(`group-${field}`).classList.add('form-group-error');
    document
      .getElementById(`group-${field}`)
      .classList.remove('form-group-success');
    document
      .querySelector(`#group-${field} i`)
      .classList.add('fa-times-circle');
    document
      .querySelector(`#group-${field} i`)
      .classList.remove('fa-check-circle');
    document
      .querySelector(`#group-${field} .form-input-error`)
      .classList.add('form-input-error-active');
    fields[field] = false;
  }
};

const passwordValidation = () => {
  const inputPassword1 = document.getElementById('password');
  const inputPassword2 = document.getElementById('password2');

  if (inputPassword1.value !== inputPassword2.value) {
    document
      .getElementById(`group-password2`)
      .classList.add('form-group-error');
    document
      .getElementById(`group-password2`)
      .classList.remove('form-group-success');
    document
      .querySelector(`#group-password2 i`)
      .classList.add('fa-times-circle');
    document
      .querySelector(`#group-password2 i`)
      .classList.remove('fa-check-circle');
    document
      .querySelector(`#group-password2 .form-input-error`)
      .classList.add('form-input-error-active');
    fields['password'] = false;
  } else {
    document
      .getElementById(`group-password2`)
      .classList.remove('form-group-error');
    document
      .getElementById(`group-password2`)
      .classList.add('form-group-success');
    document
      .querySelector(`#group-password2 i`)
      .classList.remove('fa-times-circle');
    document
      .querySelector(`#group-password2 i`)
      .classList.add('fa-check-circle');
    document
      .querySelector(`#group-password2 .form-input-error`)
      .classList.remove('form-input-error-active');
    fields['password'] = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener('keyup', formValidationListener);
  input.addEventListener('blur', formValidationListener);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  inputs.forEach((input) => {
    formValidation(input);
  });

  const terms = document.getElementById('terms');
  if (
    fields.user &&
    fields.name &&
    fields.password &&
    fields.email &&
    fields.phone &&
    terms.checked
  ) {
    form.reset();

    document
      .getElementById('form-message-success')
      .classList.add('form-message-success-active');
    setTimeout(() => {
      document
        .getElementById('form-message-success')
        .classList.remove('form-message-success-active');
    }, 5000);

    document.querySelectorAll('.form-group-success').forEach((icon) => {
      icon.classList.remove('form-group-success');
    });

    document
      .getElementById('form-message')
      .classList.remove('form-message-active');
  } else {
    document
      .getElementById('form-message')
      .classList.add('form-message-active');
  }
});