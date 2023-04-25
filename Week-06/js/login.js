window.onload = function () {
  var email = document.querySelector('input[name="email"]');
  var pass = document.querySelector('input[name="password"]');
  var submit = document.querySelector('button[type="submit"]');
  var emailExpression = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);
  var span = document.getElementsByTagName('span');
  var input = document.getElementsByTagName('input');

  input[0].addEventListener('blur', verifyEmail);
  input[1].addEventListener('blur', verifyPass);
  submit.addEventListener('click', handleSubmit);

  function errorApply(error, target, span) {
    span.textContent = error;
    span.classList.remove('span-none');
    span.classList.add('span-visible');
    target.classList.remove('input-valid');
    target.classList.add('input-error');
  }

  function validApply(target, span) {
    span.textContent = 'valid';
    span.classList.add('span-none');
    span.classList.remove('span-visible');
    target.classList.add('input-valid');
    target.classList.remove('input-error');
  }

  function blankSpaces(param, num) {
    var count = 0;
    //checks if white space isn't in 1st or last place
    if (param[0] === ' ' || param[param.length - 1] === ' ') {
      return false;
    } else {
      for (var i = 0; i < param.length; i++) {
        if (param[i] === ' ') count++; //count of white spaces
      }
      if (count > num) return false; //check if count is lower than num required of white spaces in the field
      return true;
    }
  }

  function verifyEmail(event) {
    var value = event.target.value;
    var index = value.indexOf('@');
    var subEmail = value.substring(0, index);
    if (value.length !== 0 && subEmail.length > 5 && blankSpaces(subEmail, 0)) {
      if (!emailExpression.test(value)) {
        errorApply(
          'must contain at least 6 chars and no white spaces',
          event.target,
          event.target.nextElementSibling
        );
      } else {
        validApply(event.target, event.target.nextElementSibling);
      }
    } else {
      errorApply(
        'at least 6 characters before @, no white spaces',
        event.target,
        event.target.nextElementSibling
      );
    }
  }

  function verifyPass(event) {
    var value = event.target.value;
    var booleL = false;
    var booleU = false;
    var booleN = false;
    var boole = true;
    if (value.length !== 0 && value.length >= 8) {
      for (var i = 0; i < value.length; i++) {
        if (
          !(
            (value[i] >= 'a' && value[i] <= 'z') ||
            (value[i] >= 'A' && value[i] <= 'Z') ||
            (value[i] >= '0' && value[i] <= '9')
          )
        ) {
          boole = false;
        }

        if (value[i] >= 'a' && value[i] <= 'z') booleL = true;

        if (value[i] >= 'A' && value[i] <= 'Z') booleU = true;

        if (value[i] >= '0' && value[i] <= '9') booleN = true;
      }
      if (boole && booleL && booleU && booleN)
        validApply(event.target, event.target.nextElementSibling);
      else
        errorApply(
          'At least 1 upper case, 1 lower case and 1 number, no spaces',
          event.target,
          event.target.nextElementSibling
        );
    } else {
      errorApply(
        'password must contain 8 alphanumeric characters',
        event.target,
        event.target.nextElementSibling
      );
    }
  }

  email.addEventListener('focus', function (event) {
    errorDisable(event.target.nextElementSibling);
  });
  pass.addEventListener('focus', function (event) {
    errorDisable(event.target.nextElementSibling);
  });

  function errorDisable(span) {
    span.classList.remove('span-visible');
    span.classList.add('span-none');
  }

  function handleSubmit(event) {
    event.preventDefault();
    var count = 0;
    for (var i = 0; i < input.length; i++) {
      var boole = false;
      if (input[i].value === '') {
        errorApply('field is required', input[i], input[i].nextElementSibling);
        boole = true;
      }
    }
    boole ? alert('fields are required') : null;
    for (var i = 0; i < input.length; i++) {
      if (input[i].value !== '') {
        span[i].textContent !== 'valid' ? alert(span[i].textContent) : count++;
      }
    }
    count === span.length
      ? alert(
          `successful form data: name: ${input[0].value} password: ${input[1].value}`
        )
      : null;
  }
};
