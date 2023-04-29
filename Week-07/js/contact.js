window.onload = function () {
  var user = document.querySelector('input[name="name"]');
  var lastname = document.querySelector('input[name="lastname"]');
  var email = document.querySelector('input[name="email"]');
  var motive = document.querySelector('select');
  var message = document.querySelector('textarea');
  var hamburguer = document.getElementsByClassName('header-menu');
  var sidebar = document.getElementsByTagName('aside');
  var submit = document.querySelector('button[type="submit"]');
  var input = document.getElementsByTagName('input');
  var emailExpression = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);

  message.textContent = '';

  submit.addEventListener('click', handleSubmit);
  hamburguer[0].addEventListener('click', menu);
  user.addEventListener('blur', verifyName);
  lastname.addEventListener('blur', verifyName);
  email.addEventListener('blur', verifyEmail);
  motive.addEventListener('blur', verifyMotive);
  message.addEventListener('blur', verifyMessage);

  function errorApply(error, target, span) {
    span.classList.remove('span-none');
    span.classList.add('span-visible');
    span.textContent = error;
    target.classList.add('input-error');
    target.classList.remove('input-valid');
  }
  function validApply(target, span) {
    span.classList.add('span-none');
    span.classList.remove('span-visible');
    span.textContent = 'valid';
    target.classList.add('input-valid');
    target.classList.remove('input-error');
  }
  function onlyLetters(word) {
    if (word.length < 21) {
      for (var i = 0; i < word.length; i++) {
        if (
          !(
            (word[i] >= 'a' && word[i] <= 'z') ||
            (word[i] >= 'A' && word[i] <= 'Z') ||
            word[i] === ' '
          )
        ) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
  function blankSpaces(param, num) {
    var count = 0;
    //checks if white space isn't in 1st or last place
    if (param[0] === ' ' || param[param.length - 1] === ' ') {
      return;
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
        'at least 6 chars before @, no white spaces',
        event.target,
        event.target.nextElementSibling
      );
    }
  }
  function verifyName(event) {
    var value = event.target.value;
    if (!(value.length !== 0 && value.length > 3 && value.length < 21)) {
      errorApply(
        'must contain between 4 and 20 letters',
        event.target,
        event.target.nextElementSibling
      );
    } else {
      if (!(onlyLetters(value) && blankSpaces(value, 1))) {
        errorApply(
          'must be only words, 1 white space allowed',
          event.target,
          event.target.nextElementSibling
        );
      } else validApply(event.target, event.target.nextElementSibling);
    }
  }
  function verifyMessage(event) {
    var value = event.target.value;
    console.log(value.length);
    if (!(value.length !== 0 && value.length > 2)) {
      errorApply(
        'Alphanumeric, at least 3 characters',
        event.target,
        event.target.nextElementSibling
      );
    } else {
      for (var i = 0; i < value.length; i++) {
        if (
          !(
            (value[i] >= 'a' && value[i] <= 'z') ||
            (value[i] >= 'A' && value[i] <= 'Z') ||
            (value[i] >= '0' && value[i] <= '9') ||
            value[i] === ' '
          )
        )
          errorApply(
            'only letters and numbers',
            event.target,
            event.target.nextElementSibling
          );
        else validApply(event.target, event.target.nextElementSibling);
      }
    }
  }
  function verifyMotive(event) {
    var value = event.target.value;
    if (value === '')
      errorApply(
        'field is required',
        event.target,
        event.target.nextElementSibling
      );
    else validApply(event.target, event.target.nextElementSibling);
  }
  function menu() {
    if (sidebar[0].className === '') {
      sidebar[0].classList.add('sidebar-visible');
    } else {
      if (sidebar[0].className === 'sidebar-visible') {
        sidebar[0].classList.add('sidebar-none');
        sidebar[0].classList.remove('sidebar-visible');
      } else {
        sidebar[0].classList.add('sidebar-visible');
        sidebar[0].classList.remove('sidebar-none');
      }
    }
  }
  for (var i = 0; i < input.length; i++) {
    input[i].addEventListener('focus', function (event) {
      errorDisable(event.target.nextElementSibling);
    });
  }
  function errorDisable(span) {
    span.classList.remove('span-visible');
    span.classList.add('span-none');
  }
  function handleSubmit(event) {
    event.preventDefault();
    var count = 0;
    var boole = false;
    var spanMotive = motive.nextElementSibling;
    var spanMessage = message.nextElementSibling;
    for (var i = 0; i < input.length; i++) {
      if (input[i].value === '') {
        errorApply('field is required', input[i], input[i].nextElementSibling);
        boole = true;
      }
    }
    if (message.value === '')
      errorApply('field is required', message, spanMessage);
    if (motive.value === '')
      errorApply('field is required', motive, spanMotive);
    if (boole) alert('fields are required');
    var errorStr = '';
    for (var i = 0; i < input.length; i++) {
      if (input[i].nextElementSibling.value !== '') {
        if (input[i].nextElementSibling.textContent !== 'valid') {
          errorStr =
            errorStr +
            ' ' +
            input[i].name +
            ': ' +
            input[i].nextElementSibling.textContent;
        } else count++;
      }
    }
    if (spanMessage.textContent !== 'valid')
      errorStr = errorStr + ' message: ' + spanMessage.textContent;
    else count++;
    if (spanMotive.textContent !== 'valid')
      errorStr = errorStr + ' motive: ' + spanMotive.textContent;
    else count++;
    if (errorStr) alert(errorStr);
    if (count === 5) {
      alert(
        `successful form data: name: ${input[0].value} lastname: ${input[1].value} email: ${input[2].value}
       motive: ${motive.value} message: ${message.value}`
      );
    }
  }
};
