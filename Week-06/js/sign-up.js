window.onload = function () {
  var user = document.querySelector('input[name="name"]');
  var lastname = document.querySelector('input[name="lastname"]');
  var dni = document.querySelector('input[name="dni"]');
  var birthdate = document.querySelector('input[name="birthdate"]');
  var cell = document.querySelector('input[name="cell"]');
  var address = document.querySelector('input[name="address"]');
  var city = document.querySelector('input[name="city"]');
  var pc = document.querySelector('input[name="pc"]');
  var dni = document.querySelector('input[name="dni"]');
  var email = document.querySelector('input[name="email"]');
  var password = document.querySelector('input[name="password"]');
  var repassword = document.querySelector('input[name="confirm"]');
  var submit = document.querySelector('button[type="submit"]');
  var span = document.getElementsByTagName('span');
  var input = document.getElementsByTagName('input');
  var emailExpression = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);

  submit.addEventListener('click', handleSubmit);
  user.addEventListener('blur', verifyName);
  lastname.addEventListener('blur', verifyName);
  dni.addEventListener('blur', verifyDni);
  birthdate.addEventListener('blur', verifyBirth);
  cell.addEventListener('blur', verifyCell);
  address.addEventListener('blur', verifyAddress);
  city.addEventListener('blur', verifyCity);
  pc.addEventListener('blur', verifyPc);
  email.addEventListener('blur', verifyEmail);
  password.addEventListener('blur', verifyPass);
  repassword.addEventListener('blur', verifyRePass);

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
    var boole = false;
    var count = 0;
    //checks if white space isn't in 1st or last place
    if (param[0] === ' ' || param[param.length - 1] === ' ') {
      return boole;
    } else {
      for (var i = 0; i < param.length; i++) {
        if (param[i] === ' ') count++; //count of white spaces
      }
      if (count > num)
        return boole; //check if count is lower than num required of white spaces in the field
      else {
        boole = true;
      }
      return boole;
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
          'last name must be only words, 1 blank space allowed, max 20 chars',
          event.target,
          event.target.nextElementSibling
        );
      } else validApply(event.target, event.target.nextElementSibling);
    }
  }
  function verifyDni(event) {
    var value = event.target.value;
    if (value.length !== 0 && value.length > 7 && value.length < 11) {
      if (onlyNumbers(value)) {
        validApply(event.target, event.target.nextElementSibling);
      } else {
        errorApply(
          'only numbers allowed',
          event.target,
          event.target.nextElementSibling
        );
      }
    } else {
      errorApply(
        '10 numbers only',
        event.target,
        event.target.nextElementSibling
      );
    }
  }
  function verifyBirth(event) {
    var date = event.target.value;
    var today = new Date();
    var dateVal = new Date(date);
    if (today.getTime() - 1000 * 3600 * 24 * 365 * 10 < dateVal.getTime())
      errorApply(
        'your age must be at least 10 years old',
        event.target,
        event.target.nextElementSibling
      );
    else validApply(event.target, event.target.nextElementSibling);
  }
  function verifyCell(event) {
    var value = event.target.value;
    if (value.length !== 0 && value.length === 10) {
      if (onlyNumbers(value)) {
        validApply(event.target, event.target.nextElementSibling);
      } else {
        errorApply(
          'only numbers allowed',
          event.target,
          event.target.nextElementSibling
        );
      }
    } else {
      errorApply(
        '10 numbers only',
        event.target,
        event.target.nextElementSibling
      );
    }
  }
  function verifyAddress(event) {
    var value = event.target.value;
    var boolNum = false;
    var boolLetter = false;
    var boolSpace = false;
    if (value.length > 4) {
      for (let i = 0; i < value.length; i++) {
        (value[i] >= 'a' && value[i] <= 'z') ||
        (value[i] >= 'A' && value[i] <= 'Z')
          ? (boolLetter = true)
          : null;
        value[i] >= '0' && value[i] <= '9' ? (boolNum = true) : null;
        value[i] === ' ' ? (boolSpace = true) : null;
      }
      if (boolLetter && boolNum && boolSpace) {
        if (blankSpaces(value, 3)) {
          validApply(event.target, event.target.nextElementSibling);
        } else {
          errorApply(
            'max 3 spaces allowed',
            event.target,
            event.target.nextElementSibling
          );
        }
      } else {
        errorApply(
          'at least 1 space, 1 letter and 1 number',
          event.target,
          event.target.nextElementSibling
        );
      }
    } else {
      errorApply(
        'at least 5 characters',
        event.target,
        event.target.nextElementSibling
      );
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
        } else {
          errorApply(
            'only numbers and letters, max 3 spaces allowed',
            event.target,
            event.target.nextElementSibling
          );
        }
      } else {
        errorApply(
          'at least 4 letters',
          event.target,
          event.target.nextElementSibling
        );
      }
    } else {
      errorApply(
        'at least 4 alphanumeric characters',
        event.target,
        event.target.nextElementSibling
      );
    }
  }
  function verifyPc(event) {
    var value = event.target.value;
    if (value.length > 3 && value.length < 6) {
      if (onlyNumbers(value))
        validApply(event.target, event.target.nextElementSibling);
      else
        errorApply(
          'only numbers',
          event.target,
          event.target.nextElementSibling
        );
    } else
      errorApply(
        'must contain 4 or 5 numbers',
        event.target,
        event.target.nextElementSibling
      );
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
    var booleL = false;
    var booleU = false;
    var booleN = false;
    if (value.length !== 0 && value.length >= 8) {
      for (var i = 0; i < value.length; i++) {
        if (value[i] >= 'a' && value[i] <= 'z') booleL = true;

        if (value[i] >= 'A' && value[i] <= 'Z') booleU = true;

        if (value[i] >= '0' && value[i] <= '9') booleN = true;
      }
      if (booleL && booleU && booleN)
        validApply(event.target, event.target.nextElementSibling);
      else
        errorApply(
          'At least 1 upper case, 1 lower case and 1 number',
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
  function verifyRePass(event) {
    var rePass = event.target.value;
    var pass = input[9].value;
    rePass !== pass
      ? errorApply(
          'password do not match',
          event.target,
          event.target.nextElementSibling
        )
      : validApply(event.target, event.target.nextElementSibling);
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
    for (var i = 0; i < span.length; i++) {
      if (input[i].value === '') {
        errorApply('field is required', input[i], input[i].nextElementSibling);
        boole = true;
      }
    }
    boole ? alert('fields are required') : null;
    for (var i = 0; i < span.length; i++) {
      if (input[i].value !== '') {
        span[i].textContent !== 'valid' ? alert(span[i].textContent) : count++;
      }
    }
    count === span.length
      ? alert(`successful form data: name: ${input[0].value} lastname: ${input[1].value} dni: ${input[2].value} birthdate: ${input[3].value}
    phone number: ${input[4].value} address: ${input[5].value} city: ${input[6].value} postal code: ${input[7].value} email: ${input[8].value}
    password: ${input[9].value} confirm password: ${input[10].value}`)
      : null;
  }
};
