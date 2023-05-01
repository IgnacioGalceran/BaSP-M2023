window.onload = function () {
  var email = document.querySelector('input[name="email"]');
  var pass = document.querySelector('input[name="password"]');
  var submit = document.querySelector('button[type="submit"]');
  var emailExpression = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);
  var span = document.getElementsByTagName('span');
  var input = document.getElementsByTagName('input');
  var modal = document.getElementById('myModal');
  var close = document.getElementsByClassName('close');
  var modalText = document.getElementsByClassName('modalText')[0];

  input[0].addEventListener('blur', verifyEmail);
  input[1].addEventListener('blur', verifyPass);
  submit.addEventListener('click', handleSubmit);

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove('modal-block');
      modal.classList.add('modal-none');
    }
  };

  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      modal.classList.remove('modal-block');
      modal.classList.add('modal-none');
    };
  }

  function modalApply(msg, color) {
    modalText.textContent = msg;
    if (color === 'red') {
      modalText.classList.add('red');
      modalText.classList.remove('blue');
    } else {
      modalText.classList.add('blue');
      modalText.classList.remove('red');
    }
    modal.classList.add('modal-block');
  }
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
    if (value.length !== 0 && subEmail.length > 3 && blankSpaces(subEmail, 0)) {
      if (!emailExpression.test(value)) {
        errorApply(
          'must contain at least 4 chars and no white spaces',
          event.target,
          event.target.nextElementSibling
        );
      } else {
        validApply(event.target, event.target.nextElementSibling);
      }
    } else {
      errorApply(
        'at least 4 characters before @, no white spaces',
        event.target,
        event.target.nextElementSibling
      );
    }
  }
  function verifyPass(event) {
    var value = event.target.value;
    var countL = 0;
    var countU = 0;
    var countN = 0;
    if (value.length !== 0 && value.length >= 8) {
      for (var i = 0; i < value.length; i++) {
        if (
          (value[i] >= 'a' && value[i] <= 'z') ||
          (value[i] >= 'A' && value[i] <= 'Z') ||
          (value[i] >= '0' && value[i] <= '9')
        ) {
          if (value[i] >= 'a' && value[i] <= 'z') countL++;

          if (value[i] >= 'A' && value[i] <= 'Z') countU++;

          if (value[i] >= '0' && value[i] <= '9') countN++;
        } else
          return errorApply(
            'only letters and numbers',
            event.target,
            event.target.nextElementSibling
          );
      }
      if (countL + countU > 7 && countL + countN + countU === value.length) {
        validApply(event.target, event.target.nextElementSibling);
        return true;
      } else {
        errorApply(
          'alphanumeric, at least 8 letters',
          event.target,
          event.target.nextElementSibling
        );
      }
    } else {
      errorApply(
        'password must contain at least 8 letters',
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
    var error = '';
    var url = 'https://api-rest-server.vercel.app';
    var query = `email=${email.value}&password=${pass.value}`;
    for (var i = 0; i < input.length; i++) {
      var boole = false;
      if (input[i].value === '') {
        errorApply('field is required', input[i], input[i].nextElementSibling);
        boole = true;
      }
    }
    if (boole) return modalApply('fields are required', 'red');
    for (var i = 0; i < input.length; i++) {
      if (input[i].value !== '') {
        if (span[i].textContent !== 'valid')
          error = `${error}\n${span[i].textContent}`;
        else count++;
      }
    }
    if (error) modalApply(error, 'red');
    if (count === span.length) {
      fetch(`${url}/login?${query}`, { method: 'GET' })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) modalApply(`Successful login: ${data.msg}`, 'blue');
          else throw new Error(data.msg);
        })
        .catch(function (error) {
          modalApply(`${error}`, 'red');
        });
    }
  }
};
