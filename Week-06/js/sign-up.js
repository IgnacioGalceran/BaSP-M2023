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
var span = document.getElementsByClassName('span-error');
var input = document.getElementsByClassName('signup-input');
const emailExpression = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);

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

function verifyName(event) {
  var bool = event.target.name === 'name';
  var value = event.target.value;
  if (value.length !== 0) {
    if (value.length > 3 && value.length < 20) {
      var count = 0;
      var countSpaces = 0;
      for (var i = 0; i < value.length; i++) {
        var code = value.charCodeAt(i);
        if ((code > 64 && code < 90) || (code > 96 && code < 123)) {
          count++;
        } else {
          if (code === 32) {
            countSpaces++;
          }
        }
      }

      if (!(count + countSpaces === value.length)) {
        bool
          ? errorApply(
              'name must be only words',
              event.target,
              event.target.nextElementSibling
            )
          : errorApply(
              'last name must be only words',
              event.target,
              event.target.nextElementSibling
            );
      } else {
        countSpaces > 1
          ? errorApply(
              'only one space allowed',
              event.target,
              event.target.nextElementSibling
            )
          : validApply(event.target, event.target.nextElementSibling);
      }
    } else {
      bool
        ? errorApply(
            'name must contain from 4 to 20 chars',
            event.target,
            event.target.nextElementSibling
          )
        : errorApply(
            'last name must contain from 4 to 20 chars',
            event.target,
            event.target.nextElementSibling
          );
    }
  } else {
    errorApply(
      'field is required',
      event.target,
      event.target.nextElementSibling
    );
  }
}

function verifyDni(event) {
  if (event.target.value.length !== 0) {
    var count = 0;
    for (let i = 0; i < event.target.value.length; i++) {
      var code = event.target.value.charCodeAt(i);
      if (code > 47 && code < 58) {
        count++;
      }
    }
    if (count > 7 && count < 11) {
      if (!(count === event.target.value.length)) {
        errorApply(
          'dni must contain only numbers',
          event.target,
          event.target.nextElementSibling
        );
      } else {
        validApply(event.target, event.target.nextElementSibling);
      }
    } else {
      errorApply(
        'dni must contain between 8 and 10 numbers',
        event.target,
        event.target.nextElementSibling
      );
    }
  } else {
    errorApply(
      'field is required',
      event.target,
      event.target.nextElementSibling
    );
  }
}

function verifyBirth(event) {
  var date = event.target.value;
  if (date.length !== 0) {
    if (date.length !== 10) {
      errorApply(
        'dd/mm/aaaa only',
        event.target,
        event.target.nextElementSibling
      );
    } else {
      if (date.substring(2, 3) !== '/' || date.substring(5, 6) !== '/') {
        errorApply(
          'dd/mm/aaaa only',
          event.target,
          event.target.nextElementSibling
        );
      } else {
        var day = date.substring(0, 2);
        var month = date.substring(3, 5);
        var year = date.substring(6);
        var countD = 0;
        var countM = 0;
        var countY = 0;
        for (let i = 0; i < 2; i++) {
          var codeD = day.charCodeAt(i);
          var codeM = month.charCodeAt(i);
          var codeY1 = year.charCodeAt(i);
          var codeY2 = year.charCodeAt(i + 2);
          codeD > 47 && codeD < 58 ? countD++ : errorApply(3, 'numbers only');
          codeM > 47 && codeM < 58 ? countM++ : errorApply(3, 'numbers only');
          codeY1 > 47 && codeY1 < 58 ? countY++ : errorApply(3, 'numbers only');
          codeY2 > 47 && codeY2 < 58 ? countY++ : errorApply(3, 'numbers only');
        }
        if (countD === 2 && countM === 2 && countY === 4) {
          var d = parseInt(day, 10);
          var m = parseInt(month, 10);
          var y = parseInt(year, 10);
          if (d > 0 && d < 32) {
            if (m > 0 && m < 13) {
              if (
                ((m === 11 || m === 4 || m === 6 || m === 9) && d > 30) ||
                (m === 02 && d > 29)
              ) {
                errorApply(
                  'wrong day number',
                  event.target,
                  event.target.nextElementSibling
                );
              }
              if (y > 1910 && y < 2010) {
                validApply(event.target, event.target.nextElementSibling);
              } else {
                errorApply(
                  'year must be between 1909 and 2009',
                  event.target,
                  event.target.nextElementSibling
                );
              }
            } else {
              errorApply(
                'invalid month',
                event.target,
                event.target.nextElementSibling
              );
            }
          } else {
            errorApply(
              'invalid day',
              event.target,
              event.target.nextElementSibling
            );
          }
        }
      }
    }
  } else {
    errorApply(
      'field is required',
      event.target,
      event.target.nextElementSibling
    );
  }
}

function verifyCell(event) {
  if (event.target.value.length !== 0) {
    var count = 0;
    for (let i = 0; i < event.target.value.length; i++) {
      var code = event.target.value.charCodeAt(i);
      if (code > 47 && code < 58) {
        count++;
      }
    }
    if (count === 10) {
      if (!(count === event.target.value.length)) {
        errorApply(
          'cellphone field must contain only numbers',
          event.target,
          event.target.nextElementSibling
        );
      } else {
        validApply(event.target, event.target.nextElementSibling);
      }
    } else {
      errorApply(
        'field must contain 10 numbers',
        event.target,
        event.target.nextElementSibling
      );
    }
  } else {
    errorApply(
      'field is required',
      event.target,
      event.target.nextElementSibling
    );
  }
}

function verifyAddress(event) {
  var value = event.target.value;
  if (value !== 0) {
    if (value.length > 4) {
      var countSpace = 0;
      var countL = 0;
      var countN = 0;
      for (let i = 0; i < value.length; i++) {
        var code = value.charCodeAt(i);
        code > 47 && code < 58
          ? countN++
          : (code > 64 && code < 91) || (code > 96 && code < 123)
          ? countL++
          : code === 32
          ? countSpace++
          : null;
      }
      if (countL + countN + countSpace === value.length) {
        if (countSpace > 2) {
          errorApply(
            'only 2 spaces allowed',
            event.target,
            event.target.nextElementSibling
          );
        } else {
          if (countN === 0 || countSpace === 0 || countL === 0) {
            errorApply(
              'at least 1 space, 1 letter and 1 number',
              event.target,
              event.target.nextElementSibling
            );
          } else {
            validApply(event.target, event.target.nextElementSibling);
          }
        }
      } else {
        errorApply(
          'only letters, numbers and 1 space',
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
  } else {
    errorApply(
      'field is required',
      event.target,
      event.target.nextElementSibling
    );
  }
}

function verifyCity(event) {
  var value = event.target.value;
  if (value.length !== 0) {
    var countL = 0;
    var countN = 0;
    for (let i = 0; i < value.length; i++) {
      var code = value.charCodeAt(i);
      if (
        (code > 64 && code < 91) ||
        (code > 96 && code < 123) ||
        code === 241
      ) {
        countL++;
      } else {
        if (code > 47 && code < 58) {
          countN++;
        } else {
          code === 32 ? countN++ : null;
        }
      }
    }
    if (countL > 3 && countL + countN === value.length) {
      validApply(event.target, event.target.nextElementSibling);
    } else {
      errorApply(
        'alphanumeric, at least 4 letters',
        event.target,
        event.target.nextElementSibling
      );
    }
  } else {
    errorApply(
      'field is required',
      event.target,
      event.target.nextElementSibling
    );
  }
}

function verifyPc(event) {
  if (event.target.value.length !== 0) {
    var count = 0;
    for (let i = 0; i < event.target.value.length; i++) {
      var code = event.target.value.charCodeAt(i);
      if (code > 47 && code < 58) {
        count++;
      }
    }
    if (count > 3 && count < 6) {
      if (!(count === event.target.value.length)) {
        errorApply(
          'postal code must contain only numbers',
          event.target,
          event.target.nextElementSibling
        );
      } else {
        validApply(event.target, event.target.nextElementSibling);
      }
    } else {
      errorApply(
        'postal code must contain between 4 and 5 numbers',
        event.target,
        event.target.nextElementSibling
      );
    }
  } else {
    errorApply(
      'field is required',
      event.target,
      event.target.nextElementSibling
    );
  }
}

function verifyEmail(event) {
  var value = event.target.value;
  if (value.length !== 0) {
    if (!emailExpression.test(value)) {
      errorApply(
        'invalid email',
        event.target,
        event.target.nextElementSibling
      );
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
      'field is required',
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

user.addEventListener('focus', nameErrorDisable);
lastname.addEventListener('focus', nameErrorDisable);
dni.addEventListener('focus', function (event) {
  errorDisable(event.target.nextElementSibling);
});
birthdate.addEventListener('focus', function () {
  errorDisable(event.target.nextElementSibling);
});
cell.addEventListener('focus', function () {
  errorDisable(event.target.nextElementSibling);
});
address.addEventListener('focus', function () {
  errorDisable(event.target.nextElementSibling);
});
city.addEventListener('focus', function () {
  errorDisable(event.target.nextElementSibling);
});
pc.addEventListener('focus', function () {
  errorDisable(event.target.nextElementSibling);
});
email.addEventListener('focus', function () {
  errorDisable(event.target.nextElementSibling);
});
password.addEventListener('focus', function () {
  errorDisable(event.target.nextElementSibling);
});
repassword.addEventListener('focus', function () {
  errorDisable(event.target.nextElementSibling);
});

function errorDisable(span) {
  span.classList.remove('span-visible');
  span.classList.add('span-none');
}

function nameErrorDisable(event) {
  event.target.nextElementSibling.classList.add('span-none');
  event.target.nextElementSibling.classList.remove('span-visible');
}

function handleSubmit(event) {
  event.preventDefault();
  var count = 0;
  for (var i = 0; i < span.length; i++) {
    var boole = false;
    if (input[i].value === '') {
      span[i].classList.remove('span-none');
      span[i].classList.add('span-visible');
      span[i].textContent = 'field is required';
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
    ? alert(`successful form data: name: ${input[0].value} lastname: ${input[1].value} dni: ${input[2].value} birthdate: ${input[3].value}
    phone number: ${input[4].value} address: ${input[5].value} city: ${input[6].value} postal code: ${input[7].value} email: ${input[8].value}
    password: ${input[9].value} confirm password: ${input[10].value}`)
    : null;
}
