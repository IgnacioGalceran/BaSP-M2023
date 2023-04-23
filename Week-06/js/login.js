var input = document.querySelector('input[name="email"]');
var inputPass = document.querySelector('input[name="password"]');
var btnSignIn = document.getElementById('sign-in-btn');
var emailExpression = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);

input.addEventListener('focus', emailErrorDisable);
inputPass.addEventListener('focus', passErrorDisable);

input.addEventListener('blur', verifyEmail);

function verifyEmail() {
  if (input.value.length !== 0) {
    if (!emailExpression.test(input.value)) {
      var div = document.querySelector('.email-contain');
      var p = document.createElement('p');
      div.appendChild(p);
      p.textContent = 'email is invalid';
      p.classList = 'email-error';
      input.classList = 'input-email-error';
      return false;
    } else {
      var index = input.value.indexOf('@');
      var subEmail = input.value.substring(0, index);
      if (subEmail.length < 6) {
        var div = document.querySelector('.email-contain');
        var p = document.createElement('p');
        div.appendChild(p);
        p.textContent =
          'your mail has to contain at least 6 characters before @';
        p.classList = 'email-error';
        input.classList = 'input-email-error';
        return false;
      } else {
        input.classList = 'input-email-valid';
        return true;
      }
    }
  } else {
    var div = document.querySelector('.email-contain');
    var p = document.createElement('p');
    div.appendChild(p);
    p.textContent = 'this field is required';
    p.classList = 'email-error';
    input.classList = 'input-email-error';
    return false;
  }
}

inputPass.addEventListener('blur', verifyPass);

function verifyPass() {
  if (inputPass.value.length !== 0) {
    if (inputPass.value.length >= 8) {
      var countNums = 0;
      var countLower = 0;
      var countUpper = 0;
      for (let i = 0; i < inputPass.value.length; i++) {
        var code = inputPass.value.charCodeAt(i);
        if (code > 47 && code < 58) {
          countNums++;
        } else if (code > 64 && code < 90) {
          countUpper++;
        } else {
          if (code > 96 && code < 123) {
            countLower++;
          }
        }
      }
      if (countUpper === 0) {
        var div = document.querySelector('.password-contain');
        var p = document.createElement('p');
        div.appendChild(p);
        p.textContent = 'password must contain at least 1 upper case';
        p.classList = 'pass-error';
        inputPass.classList = 'input-pass-error';
        return false;
      } else {
        if (countLower === 0 || countNums === 0) {
          var div = document.querySelector('.password-contain');
          var p = document.createElement('p');
          div.appendChild(p);
          p.textContent =
            'password must contain at least 1 lower case and 1 number';
          p.classList = 'pass-error';
          inputPass.classList = 'input-pass-error';
          return false;
        }
        if (countUpper + countLower + countNums !== inputPass.value.length) {
          var div = document.querySelector('.password-contain');
          var p = document.createElement('p');
          div.appendChild(p);
          p.textContent = 'password must contain 8 alphanumeric characters';
          p.classList = 'pass-error';
          inputPass.classList = 'input-pass-error';
          return false;
        } else {
          inputPass.classList = 'input-pass-valid';
          return true;
        }
      }
    } else {
      var div = document.querySelector('.password-contain');
      var p = document.createElement('p');
      div.appendChild(p);
      p.textContent = 'password must contain 8 alphanumeric characters';
      p.classList = 'pass-error';
      inputPass.classList = 'input-pass-error';
      return false;
    }
  } else {
    var div = document.querySelector('.password-contain');
    var p = document.createElement('p');
    div.appendChild(p);
    p.textContent = 'this field is required';
    p.classList = 'pass-error';
    inputPass.classList = 'input-pass-error';
    return false;
  }
}

function emailErrorDisable() {
  var p = document.querySelector('.email-error');
  var i = document.querySelector('.input-email-error');
  if (p !== null) {
    p.remove();
    i.classList.remove('input-email-error');
  }
}

function passErrorDisable() {
  var p = document.querySelector('.pass-error');
  var i = document.querySelector('.input-pass-error');
  if (p !== null) {
    p.remove();
    i.classList.remove('input-pass-error');
  }
}

btnSignIn.addEventListener('click', function (event) {
  event.preventDefault();
  var verEmail = verifyEmail();
  var verPass = verifyPass();
  if (verEmail && verPass) {
    console.log(true);
    alert(
      `successful login email: ${input.value} password: ${inputPass.value}`
    );
  } else {
    if (verEmail && !verPass) {
      var p = document.querySelector('.pass-error');
      alert(`${p.innerHTML}`);
      p.remove();
    } else {
      if (verPass && !verEmail) {
        var p = document.querySelector('.email-error');
        alert(`${p.innerHTML}`);
        p.remove();
      } else {
        if (!verPass && !verEmail) {
          var e = document.querySelector('.email-error');
          var p = document.querySelector('.pass-error');
          alert(`error email: ${e.innerHTML} error password: ${p.innerHTML}`);
          e.remove();
          p.remove();
        }
      }
    }
  }
});
