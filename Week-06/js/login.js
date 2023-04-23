var email = document.querySelector('input[name="email"]');
var pass = document.querySelector('input[name="password"]');
var submit = document.querySelector('button[type="submit"]');
var emailExpression = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);
var span = document.getElementsByClassName('span-error');
var input = document.getElementsByClassName('login-input');

input[0].addEventListener('blur', verifyEmail);
input[1].addEventListener('blur', verifyPass);
submit.addEventListener('click', handleSubmit);

function errorApply(error, target, span) {
  span.classList.remove('span-none');
  span.classList.add('span-visible');
  span.textContent = error;
  target.classList.remove('input-valid');
  target.classList.add('input-error');
}

function validApply(target, span) {
  span.classList.add('span-none');
  span.classList.remove('span-visible');
  span.textContent = 'valid';
  target.classList.add('input-valid');
  target.classList.remove('input-error');
}

function verifyEmail(event) {
  var value = event.target.value;
  if (value.length !== 0) {
    if (!emailExpression.test(value)) {
      errorApply('invalid mail', event.target, event.target.nextElementSibling);
    } else {
      var index = value.indexOf('@');
      var subEmail = value.substring(0, index);
      subEmail.length < 6
        ? errorApply(
            'email must contain at least 6 characters before @',
            event.target,
            event.target.nextElementSibling
          )
        : validApply(event.target, event.target.nextElementSibling);
    }
  } else {
    errorApply(
      'field is required',
      event.target,
      event.target.nextElementSibling
    );
  }
}

function verifyPass(event) {
  var pass = event.target.value;
  if (pass.length !== 0) {
    if (pass.length >= 8) {
      var countNums = 0;
      var countUpper = 0;
      var countLower = 0;
      for (let i = 0; i < pass.length; i++) {
        var code = pass.charCodeAt(i);
        if (code > 47 && code < 58) {
          countNums++;
        } else {
          if (code > 64 && code < 90) {
            countUpper++;
          } else {
            if (code > 96 && code < 123) {
              countLower++;
            }
          }
        }
      }
      if (countUpper === 0) {
        errorApply(
          'at least one upper case letter',
          event.target,
          event.target.nextElementSibling
        );
      } else {
        if (countLower === 0 || countNums === 0) {
          errorApply(
            'password must contain 8 alphanumeric characters',
            event.target,
            event.target.nextElementSibling
          );
        } else {
          if (countUpper + countLower + countNums !== pass.length) {
            errorApply(
              'password must contain 8 alphanumeric characters',
              event.target,
              event.target.nextElementSibling
            );
          } else {
            validApply(event.target, event.target.nextElementSibling);
          }
        }
      }
    } else {
      errorApply(
        'password must contain 8 alphanumeric characters',
        event.target,
        event.target.nextElementSibling
      );
    }
  } else {
    errorApply(
      'field is required ',
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
  for (var i = 0; i < span.length; i++) {
    var boole = false;
    if (input[i].value === '') {
      span[i].classList.remove('span-none');
      span[i].classList.add('span-visible');
      span[i].textContent = 'field is reqruired';
      input[i].classList.remove('input-valid');
      input[i].classList.add('input-error');
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
    ? alert(
        `successful form data: name: ${input[0].value} password: ${input[1].value}`
      )
    : null;
}
