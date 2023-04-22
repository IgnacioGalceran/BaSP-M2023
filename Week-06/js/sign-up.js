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

for (let i = 0; i < span.length; i++) {
  span[i].style.display = 'none';
}

submit.addEventListener('click', handleSubmit);
user.addEventListener('blur', verifyName);
lastname.addEventListener('blur', verifyName);
dni.addEventListener('blur', verifyDni);
birthdate.addEventListener('blur', verifyBirth);

function verifyName(event) {
  var bool = event.target.name === 'name';
  var value = event.target.value;
  console.log(value.length);
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
          span[0].style.display = 'inline';
          span[0].textContent = 'name must be only words';
          return false;
        } else {
          span[1].style.display = 'inline';
          span[1].textContent = 'last name must be only words';
          return false;
        }
      } else {
        console.log(true);
        return true;
      }
    } else {
      if (bool) {
        span[0].style.display = 'inline';
        span[0].textContent = 'name must contain from 4 to 20 chars';
        return false;
      } else {
        span[1].style.display = 'inline';
        span[1].textContent = 'last name must contain from 4 to 20 chars';
        return false;
      }
    }
  } else {
    if (bool) {
      span[0].style.display = 'inline';
      span[0].textContent = 'field is required';
      return false;
    } else {
      span[1].style.display = 'inline';
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
        span[2].style.display = 'inline';
        span[2].textContent = 'dni must contain only numbers';
      }
    } else {
      span[2].style.display = 'inline';
      span[2].textContent = 'dni must contain between 8 and 10 numbers';
    }
  } else {
    span[2].style.display = 'inline';
    span[2].textContent = 'field is required';
  }
}

function verifyBirth(event) {
  var date = event.target.value;
  if (date.length !== 0) {
    if (date.length !== 10) {
      span[3].style.display = 'inline';
      span[3].textContent = 'dd/mm/aaaa only';
    } else {
      if (date.substring(2, 3) !== '/' || date.substring(5, 6) !== '/') {
        span[3].style.display = 'inline';
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
            : (span[3].style.display = 'inline');
          span[3].textContent = 'numbers only';
          codeM > 47 && codeM < 58
            ? countM++
            : (span[3].style.display = 'inline');
          span[3].textContent = 'numbers only';
          codeY1 > 47 && codeY1 < 58
            ? countY++
            : (span[3].style.display = 'inline');
          span[3].textContent = 'numbers only';
          codeY2 > 47 && codeY2 < 58
            ? countY++
            : (span[3].style.display = 'inline');
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
                span[3].style.display = 'inline';
                span[3].textContent = 'wrong day number';
              }
              if (y > 1910 && y < 2010) {
                console.log('valid date');
              } else {
                span[3].style.display = 'inline';
                span[3].textContent = 'invalid year';
              }
            } else {
              span[3].style.display = 'inline';
              span[3].textContent = 'invalid month';
            }
          } else {
            span[3].style.display = 'inline';
            span[3].textContent = 'invalid day';
          }
        }
      }
    }
  } else {
    span[3].style.display = 'inline';
    span[3].textContent = 'field is required';
    return false;
  }
}

function cell 

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
  console.log('hola');
  span[num].style.display = 'none';
}

function nameErrorDisable(event) {
  var bool = event.target.name === 'name';
  if (bool) {
    span[0].style.display = 'none';
  } else {
    console.log('lastname');
    span[1].style.display = 'none';
  }
}

function handleSubmit(event) {
  event.preventDefault();
  for (let i = 0; i < span.length; i++) {
    if (input[i].value === '') {
      span[i].style.display = 'inline';
      span[i].textContent = 'field is required';
    }
  }
}
