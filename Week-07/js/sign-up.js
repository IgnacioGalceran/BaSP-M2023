window.onload = function () {
  var user = document.querySelector('input[name="name"]');
  var lastName = document.querySelector('input[name="lastName"]');
  var dni = document.querySelector('input[name="dni"]');
  var dob = document.querySelector('input[name="dob"]');
  var phone = document.querySelector('input[name="phone"]');
  var address = document.querySelector('input[name="address"]');
  var city = document.querySelector('input[name="city"]');
  var zip = document.querySelector('input[name="zip"]');
  var dni = document.querySelector('input[name="dni"]');
  var email = document.querySelector('input[name="email"]');
  var password = document.querySelector('input[name="password"]');
  var repassword = document.querySelector('input[name="repassword"]');
  var submit = document.querySelector('button[type="submit"]');
  var span = document.getElementsByTagName('span');
  var input = document.getElementsByTagName('input');
  var modal = document.getElementById('myModal');
  var accept = document.getElementsByClassName('btn-accept')[0];
  var modalText = document.getElementsByClassName('modalText')[0];
  var emailExpression = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);

  submit.addEventListener('click', handleSubmit);
  user.addEventListener('blur', verifyName);
  lastName.addEventListener('blur', verifyName);
  dni.addEventListener('blur', verifyDni);
  dob.addEventListener('blur', verifyBirth);
  phone.addEventListener('blur', verifyCell);
  address.addEventListener('blur', verifyAddress);
  city.addEventListener('blur', verifyCity);
  zip.addEventListener('blur', verifyPc);
  email.addEventListener('blur', verifyEmail);
  password.addEventListener('blur', verifyPass);
  repassword.addEventListener('blur', verifyRePass);

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.classList.remove('modal-block');
      modal.classList.add('modal-none');
    }
  };

  accept.onclick = function () {
    modal.classList.remove('modal-block');
    modal.classList.add('modal-none');
  };

  function modalApply(msg, color) {
    modal.classList.add('modal-block');
    if (color === 'red') {
      modalText.classList.add('red');
      modalText.classList.remove('blue');
    } else {
      modalText.classList.add('blue');
      modalText.classList.remove('red');
    }
    modalText.textContent = msg;
  }

  if (localStorage.getItem('name') !== '') {
    for (var i = 0; i < input.length; i++) {
      input[i].value = localStorage.getItem(input[i].name);
    }
  }

  function success(data) {
    modalApply(`Successful register: ${data.msg}`, 'blue');
    for (var i = 0; i < input.length; i++) {
      localStorage.setItem(input[i].name, input[i].value);
    }
  }
  function failure(data) {
    var error = '';
    for (var i = 0; i < data.errors.length; i++) {
      error = error + data.errors[i].param + ': ' + data.errors[i].msg + ' ';
    }
    modalApply(error, 'red');
  }
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
  function onlyNumbers(number) {
    for (var i = 0; i < number.length; i++) {
      if (!(number[i] >= '0' && number[i] <= '9')) return false;
    }
    return true;
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
  function verifyName(event) {
    var value = event.target.value;
    if (!(value.length !== 0 && value.length > 3 && value.length < 21)) {
      errorApply(
        'must contain between 4 and 20 letters',
        event.target,
        event.target.nextElementSibling
      );
      return false;
    } else {
      if (!(onlyLetters(value) && blankSpaces(value, 1))) {
        errorApply(
          'must be only words, 1 white space allowed',
          event.target,
          event.target.nextElementSibling
        );
        return false;
      } else {
        validApply(event.target, event.target.nextElementSibling);
        return true;
      }
    }
  }
  function verifyDni(event) {
    var value = event.target.value;
    if (value.length !== 0 && value.length > 7 && value.length < 11) {
      if (onlyNumbers(value)) {
        validApply(event.target, event.target.nextElementSibling);
        return true;
      } else {
        errorApply(
          'only numbers allowed',
          event.target,
          event.target.nextElementSibling
        );
        return false;
      }
    } else {
      errorApply(
        'between 8 and 10 numbers',
        event.target,
        event.target.nextElementSibling
      );
      return false;
    }
  }
  function verifyBirth(event) {
    var date = event.target.value;
    var today = new Date();
    var dateVal = new Date(date);
    if (!(date === '')) {
      if (today.getTime() - 1000 * 3600 * 24 * 365 * 10 < dateVal.getTime()) {
        errorApply(
          'your age must be at least 10 years old',
          event.target,
          event.target.nextElementSibling
        );
        return false;
      } else {
        validApply(event.target, event.target.nextElementSibling);
        return true;
      }
    } else {
      errorApply('invalid date', event.target, event.target.nextElementSibling);
      return false;
    }
  }
  function verifyCell(event) {
    var value = event.target.value;
    if (value.length !== 0 && value.length === 10) {
      if (onlyNumbers(value)) {
        validApply(event.target, event.target.nextElementSibling);
        return true;
      } else {
        errorApply(
          'only numbers allowed',
          event.target,
          event.target.nextElementSibling
        );
        return false;
      }
    } else {
      errorApply(
        '10 numbers only',
        event.target,
        event.target.nextElementSibling
      );
      return false;
    }
  }
  function verifyAddress(event) {
    var value = event.target.value;
    var boolNum = false;
    var boolLetter = false;
    var boolSpace = false;
    if (value.length > 4) {
      for (var i = 0; i < value.length; i++) {
        if (
          (value[i] >= 'a' && value[i] <= 'z') ||
          (value[i] >= 'A' && value[i] <= 'Z')
        )
          boolLetter = true;

        if (value[i] >= '0' && value[i] <= '9') boolNum = true;
        if (value[i] === ' ') boolSpace = true;
      }
      if (boolLetter && boolNum && boolSpace) {
        if (blankSpaces(value, 1)) {
          validApply(event.target, event.target.nextElementSibling);
          return true;
        } else {
          errorApply(
            'max 1 space allowed',
            event.target,
            event.target.nextElementSibling
          );
          return false;
        }
      } else {
        errorApply(
          'at least 1 space, 1 letter and 1 number',
          event.target,
          event.target.nextElementSibling
        );
        return false;
      }
    } else {
      errorApply(
        'at least 5 characters',
        event.target,
        event.target.nextElementSibling
      );
      return false;
    }
  }
  function verifyCity(event) {
    value = event.target.value;
    var boole = true;
    var countL = 0;
    if (value.length > 3) {
      for (var i = 0; i < value.length; i++) {
        if (
          (value[i] >= 'a' && value[i] <= 'z') ||
          (value[i] >= 'A' && value[i] <= 'Z')
        ) {
          countL++;
        }
        if (
          !(
            (value[i] >= 'a' && value[i] <= 'z') ||
            (value[i] >= 'A' && value[i] <= 'Z') ||
            (value[i] >= '0' && value[i] <= '9') ||
            value[i] === ' '
          )
        ) {
          boole = false;
        }
      }
      if (countL > 3) {
        if (boole && blankSpaces(value, 3)) {
          validApply(event.target, event.target.nextElementSibling);
          return true;
        } else {
          errorApply(
            'only numbers and letters, max 3 spaces allowed',
            event.target,
            event.target.nextElementSibling
          );
          return false;
        }
      } else {
        errorApply(
          'at least 4 letters',
          event.target,
          event.target.nextElementSibling
        );
        return false;
      }
    } else {
      errorApply(
        'at least 4 alphanumeric characters',
        event.target,
        event.target.nextElementSibling
      );
      return false;
    }
  }
  function verifyPc(event) {
    var value = event.target.value;
    if (value.length > 3 && value.length < 6) {
      if (onlyNumbers(value)) {
        validApply(event.target, event.target.nextElementSibling);
        return true;
      } else {
        errorApply(
          'only numbers',
          event.target,
          event.target.nextElementSibling
        );
        return false;
      }
    } else {
      errorApply(
        'must contain 4 or 5 numbers',
        event.target,
        event.target.nextElementSibling
      );
      return false;
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
  function verifyPass(event) {
    var value = event.target.value;
    var countL = 0;
    var countU = 0;
    var countN = 0;
    if (value.length !== 0 && value.length >= 8) {
      for (var i = 0; i < value.length; i++) {
        if (value[i] >= 'a' && value[i] <= 'z') countL++;

        if (value[i] >= 'A' && value[i] <= 'Z') countU++;

        if (value[i] >= '0' && value[i] <= '9') countN++;
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
  function verifyRePass(event) {
    var rePass = event.target.value;
    var pass = input[9].value;
    if (rePass !== pass) {
      errorApply(
        'password do not match',
        event.target,
        event.target.nextElementSibling
      );
      return false;
    } else {
      validApply(event.target, event.target.nextElementSibling);
      return true;
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
    for (var i = 0; i < input.length; i++) {
      if (input[i].value === '') {
        errorApply('field is required', input[i], input[i].nextElementSibling);
        boole = true;
      }
    }
    if (boole) return modalApply('fields are required', 'red');
    var errorStr = '';
    for (var i = 0; i < input.length; i++) {
      if (input[i].value !== '') {
        if (localStorage.getItem(input[i].name) !== input[i].value) {
          if (span[i].textContent !== 'valid') {
            errorStr =
              errorStr + ' ' + input[i].name + ': ' + span[i].textContent;
          } else count++;
        } else count++;
      }
    }
    if (errorStr) modalApply(errorStr, 'red');
    if (count === input.length) {
      var date = input[3].value;
      var dateEl = date.split('-');
      var formattedDate = dateEl[1] + '/' + dateEl[2] + '/' + dateEl[0];
      var url = 'https://api-rest-server.vercel.app';

      var query = '';
      for (var i = 0; i < input.length; i++) {
        if (i !== 3) query = query + `${input[i].name}=${input[i].value}&`;
        else query = query + `${input[i].name}=${formattedDate}&`;
      }

      fetch(`${url}/signup?${query}`, { method: 'GET' })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) success(data);
          else failure(data);
        })
        .catch(function (error) {
          throw new Error('Register error: ' + error);
        });
    }
  }
};
