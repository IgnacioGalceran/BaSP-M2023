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

function verifyName(event) {
  var bool = event.target.name === 'name';
  var value = event.target.value;
  if (value.length !== 0) {
    if (value.length > 3 && value.length < 20) {
      var count = 0;
      for (var i = 0; i < value.length; i++) {
        var code = value.charCodeAt(i);
        if ((code > 64 && code < 90) || (code > 96 && code < 123)) {
          count++;
        }
      }
      if (!(count === value.length)) {
        if (bool) {
          span[1].classList.remove('span-none');
          span[0].classList.add('span-visible');
          span[0].textContent = 'name must be only words';
          return false;
        } else {
          span[1].classList.remove('span-none');
          span[1].classList.add('span-visible');
          span[1].textContent = 'last name must be only words';
          return false;
        }
      } else {
        if (bool) {
          span[0].classList.remove('span-visible');
          span[0].classList.add('span-none');
          span[0].textContent = 'valid';
        } else {
          span[0].classList.remove('span-visible');
          span[1].classList.add('span-none');
          span[1].textContent = 'valid';
        }
      }
    } else {
      if (bool) {
        span[0].classList.remove('span-none');
        span[0].classList.add('span-visible');
        span[0].textContent = 'name must contain from 4 to 20 chars';
        return false;
      } else {
        span[1].classList.remove('span-none');
        span[1].classList.add('span-visible');
        span[1].textContent = 'last name must contain from 4 to 20 chars';
        return false;
      }
    }
  } else {
    if (bool) {
      span[0].classList.remove('span-none');
      span[0].classList.add('span-visible');
      span[0].textContent = 'field is required';
      return false;
    } else {
      span[1].classList.remove('span-none');
      span[1].classList.add('span-visible');
      span[1].textContent = 'field is required';
      return false;
    }
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
        span[2].classList.add('span-visible');
        span[2].classList.remove('span-none');
        span[2].textContent = 'dni must contain only numbers';
      } else {
        span[2].classList.remove('span-visible');
        span[2].classList.add('span-none');
        span[2].textContent = 'valid';
      }
    } else {
      span[2].classList.remove('span-none');
      span[2].classList.add('span-visible');
      span[2].textContent = 'dni must contain between 8 and 10 numbers';
    }
  } else {
    span[2].classList.remove('span-none');
    span[2].classList.add('span-visible');
    span[2].textContent = 'field is required';
  }
}

function verifyBirth(event) {
  var date = event.target.value;
  if (date.length !== 0) {
    if (date.length !== 10) {
      span[3].classList.remove('span-none');
      span[3].classList.add('span-visible');
      span[3].textContent = 'dd/mm/aaaa only';
    } else {
      if (date.substring(2, 3) !== '/' || date.substring(5, 6) !== '/') {
        span[3].classList.remove('span-none');
        span[3].classList.add('span-visible');
        span[3].textContent = 'dd/mm/aaaa only';
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
          codeD > 47 && codeD < 58
            ? countD++
            : span[3].classList.remove('span-none');
          span[3].classList.add('span-visible');
          span[3].textContent = 'numbers only';
          codeM > 47 && codeM < 58
            ? countM++
            : span[3].classList.remove('span-none');
          span[3].classList.add('span-visible');
          span[3].textContent = 'numbers only';
          codeY1 > 47 && codeY1 < 58
            ? countY++
            : span[3].classList.remove('span-none');
          span[3].classList.add('span-visible');
          span[3].textContent = 'numbers only';
          codeY2 > 47 && codeY2 < 58
            ? countY++
            : span[3].classList.remove('span-none');
          span[3].classList.add('span-visible');
          span[3].textContent = 'numbers only';
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
                span[3].classList.remove('span-none');
                span[3].classList.add('span-visible');
                span[3].textContent = 'wrong day number';
              }
              if (y > 1910 && y < 2010) {
                span[3].classList.remove('span-visible');
                span[3].classList.add('span-none');
                span[3].textContent = 'valid';
              } else {
                span[3].classList.remove('span-none');
                span[3].classList.add('span-visible');
                span[3].textContent = 'year must be between 1911 and 2009';
              }
            } else {
              span[3].classList.remove('span-none');
              span[3].classList.add('span-visible');
              span[3].textContent = 'invalid month';
            }
          } else {
            span[3].classList.remove('span-none');
            span[3].classList.add('span-visible');
            span[3].textContent = 'invalid day';
          }
        }
      }
    }
  } else {
    span[3].classList.remove('span-none');
    span[3].classList.add('span-visible');
    span[3].textContent = 'field is required';
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
        span[4].classList.remove('span-none');
        span[4].classList.add('span-visible');
        span[4].textContent = 'cellphone field must contain only numbers';
      } else {
        span[4].classList.add('span-none');
        span[4].classList.remove('span-visible');
        span[4].textContent = 'valid';
      }
    } else {
      span[4].classList.remove('span-none');
      span[4].classList.add('span-visible');
      span[4].textContent = 'cellphone must contain 10 numbers';
    }
  } else {
    span[4].classList.remove('span-none');
    span[4].classList.add('span-visible');
    span[4].textContent = 'field is required';
  }
}

function verifyAddress(event) {
  var value = event.target.value;
  console.log(value);
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
          : '';
      }
      console.log(countN, countSpace, countL);
      if (countL + countN + countSpace === value.length) {
        if (countSpace > 1) {
          span[5].classList.remove('span-none');
          span[5].classList.add('span-visible');
          span[5].textContent = 'only 1 space allowed';
        } else {
          if (countN === 0 || countSpace === 0 || countL === 0) {
            span[5].classList.remove('span-none');
            span[5].classList.add('span-visible');
            span[5].textContent =
              'should be at least 1 space, 1 letter and 1 number';
          }
        }
        span[5].classList.add('span-none');
        span[5].classList.remove('span-visible');
        span[5].textContent = 'valid';
      } else {
        span[5].classList.remove('span-none');
        span[5].classList.add('span-visible');
        span[5].textContent = 'only letters, numbers and 1 space';
      }
    } else {
      span[5].classList.remove('span-none');
      span[5].classList.add('span-visible');
      span[5].textContent = 'at least 5 characters';
    }
  } else {
    span[5].classList.remove('span-none');
    span[5].classList.add('span-visible');
    span[5].textContent = 'field is required';
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
          if (code === 32) {
            countN++;
          }
        }
      }
    }
    if (countL > 3 && countL + countN === value.length) {
      span[6].classList.add('span-none');
      span[6].classList.remove('span-visible');
      span[6].textContent = 'valid';
    } else {
      span[6].classList.remove('span-none');
      span[6].classList.add('span-visible');
      span[6].textContent = 'alphanumeric, at least 4 letters';
    }
  } else {
    span[6].classList.remove('span-none');
    span[6].classList.add('span-visible');
    span[6].textContent = 'field is required';
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
        span[7].classList.remove('span-none');
        span[7].classList.add('span-visible');
        span[7].textContent = 'postal code must contain only numbers';
      } else {
        span[7].classList.add('span-none');
        span[7].classList.remove('span-visible');
        span[7].textContent = 'valid';
      }
    } else {
      span[7].classList.remove('span-none');
      span[7].classList.add('span-visible');
      span[7].textContent = 'postal code must contain between 4 and 5 numbers';
    }
  } else {
    span[7].classList.remove('span-none');
    span[7].classList.add('span-visible');
    span[7].textContent = 'field is required';
  }
}

function verifyEmail(event) {
  var value = event.target.value;
  if (value.length !== 0) {
    if (!emailExpression.test(value)) {
      span[8].classList.remove('span-none');
      span[8].classList.add('span-visible');
      span[8].textContent = 'invalid email';
    } else {
      var index = value.indexOf('@');
      var subEmail = value.substring(0, index);
      if (subEmail.length < 6) {
        span[8].classList.remove('span-none');
        span[8].classList.add('span-visible');
        span[8].textContent =
          'your mail has to contain at least 6 characters before @';
      } else {
        span[8].classList.add('span-none');
        span[8].classList.remove('span-visible');
        span[8].textContent = 'valid';
      }
    }
  } else {
    span[8].classList.remove('span-none');
    span[8].classList.add('span-visible');
    span[8].textContent = 'field is required';
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
        span[9].classList.remove('span-none');
        span[9].classList.add('span-visible');
        span[9].textContent = 'at least 1 letter upper case';
      } else {
        if (countWords === 0 || countNums === 0) {
          span[9].classList.remove('span-none');
          span[9].classList.add('span-visible');
          span[9].textContent =
            'password must contain 8 alphanumeric characters';
        } else {
          if (countWords + countNums !== pass.length) {
            span[9].classList.remove('span-none');
            span[9].classList.add('span-visible');
            span[9].textContent =
              'password must contain 8 alphanumeric characters';
          } else {
            span[9].classList.add('span-none');
            span[9].classList.remove('span-visible');
            span[9].textContent = 'valid';
          }
        }
      }
    } else {
      span[9].classList.remove('span-none');
      span[9].classList.add('span-visible');
      span[9].textContent = 'password must contain 8 alphanumeric characters';
    }
  } else {
    span[9].classList.remove('span-none');
    span[9].classList.add('span-visible');
    span[9].textContent = 'field is required';
  }
}

function verifyRePass(event) {
  var rePass = event.target.value;
  var pass = input[9].value;
  if (rePass !== pass) {
    span[10].classList.remove('span-none');
    span[10].classList.add('span-visible');
    span[10].textContent = 'password do not match';
  }
}

user.addEventListener('focus', nameErrorDisable);
lastname.addEventListener('focus', nameErrorDisable);
dni.addEventListener('focus', function () {
  errorDisable(2);
});
birthdate.addEventListener('focus', function () {
  errorDisable(3);
});
cell.addEventListener('focus', function () {
  errorDisable(4);
});
address.addEventListener('focus', function () {
  errorDisable(5);
});
city.addEventListener('focus', function () {
  errorDisable(6);
});
pc.addEventListener('focus', function () {
  errorDisable(7);
});
email.addEventListener('focus', function () {
  errorDisable(8);
});
password.addEventListener('focus', function () {
  errorDisable(9);
});
repassword.addEventListener('focus', function () {
  errorDisable(10);
});

function errorDisable(num) {
  console.log(num);
  span[num].classList.remove('span-visible');
  span[num].classList.add('span-none');
}

function nameErrorDisable(event) {
  var bool = event.target.name === 'name';
  if (bool) {
    span[0].classList.add('span-none');
    span[0].classList.remove('span-visible');
  } else {
    span[1].classList.add('span-none');
    span[1].classList.remove('span-visible');
  }
}

function handleSubmit(event) {
  event.preventDefault();
  for (let i = 0; i < span.length; i++) {
    var boole = false;
    if (input[i].value === '') {
      span[i].classList.remove('span-none');
      span[i].classList.add('span-visible');
      span[i].textContent = 'field is required';
      var alertText = 'fields are required';
      boole = true;
    }
  }
  for (let i = 0; i < span.length; i++) {
    if (input[i].value !== '') {
      if (span[i].textContent !== 'valid') {
        alert(span[i].textContent);
      } else {
      }
    }
  }
  boole ? alert(alertText) : null;
}
