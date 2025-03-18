const form1 = document.getElementById("registration");
const form2 = document.getElementById("login");
const error = document.getElementById("errorDisplay");
const uname = form1.elements["username"];
const userlogin = form2.elements["username"];
const passlogin = form2.elements["password"];
const email = form1.elements["email"];
const pwd = form1.elements["password"];
const pwdcheck = form1.elements["passwordCheck"];
const keepsignin = form2.elements["persist"];

function validateRegister(evt) {
  //checking username
  //localStorage.clear();
  evt.preventDefault();
  const user = validateUname();
  if (user === false) {
    return false;
  }

  //validating email

  const emailvalue = validateEmail();
  if (emailvalue === false) {
    return false;
  }

  //validate password
  const passvalue = validatePassword();
  if (passvalue === false) {
    evt.returnValue = false;
    return false;
  }

  //vaidate repeat password
  const passcheck = validatePasswordCheck();
  if (passcheck === false) {
    evt.returnValue = false;
    return false;
  }
  //const obj = {};
  //obj.username = user.toLowerCase();
  //obj.email = emailvalue.toLowerCase();
  //obj.password = passvalue;

  //ADDING USER TO THE LOCAL STORAGE
  //localStorage.setItem("user", JSON.stringify(obj));
  localStorage.setItem(user.toLowerCase(), passvalue);
  error.textContent = "REGISTRATION SUCCESSFULLY COMPLETED";
  error.style.display = "flex";
  form1.reset();
  //const userData = JSON.parse(localStorage.getItem("user"));
}

//VALIDATING USERNAME
function validateUname() {
  const user = uname.value;
  //CHECKING USERNAME FOR ATLEAST 2 UNIQUE CHARACTERS
  const uniquechar = new Set(user);
  if (uniquechar.size < 2) {
    error.textContent = "Username should have atleast 2 unique characters";
    error.style.display = "flex";
    uname.focus();
    return false;
  }

  //VALIDATING IF THE USERNAME ALREADY EXISTS
  if (usercheck(user)) {
    error.textContent = "Username already exists";
    error.style.display = "flex";
    return false;
  }
  return user;
}

//VALIDATING THE PASSWORD
function validatePassword() {
  const pass = pwd.value;
  //INCLUDE ATLEAST ONE LOWER AND UPPER CASE LETTER
  const regex1 = /(?=.*[a-z])(?=.*[A-Z])/;
  if (!regex1.test(pass)) {
    error.textContent =
      "Password should include atleast one lowercase letter and one upper case";
    error.style.display = "flex";
    pwd.focus();
    return false;
  }

  //CHECKING IF PASSWORD CONTAINS ATLEAST ONE DIGIT
  const regex2 = /(?=.*[0-9])/;
  if (!regex2.test(pass)) {
    error.textContent = "Password should include atleast one digit";
    error.style.display = "flex";
    pwd.focus();
    return false;
  }
  //CHECKING IF PASSWORD CONTAINS ATLEAST ONE SPECIAL CHARACTER
  const regex3 = /(?=.*[-+_!@#$%^&*., ?])/;
  if (!regex3.test(pass)) {
    error.textContent = "Password should contain atleast one special character";
    error.style.display = "flex";
    pwd.focus();
    return false;
  }
  //CHECKING IF IT CONTAINS WORD PASSWORD
  const regex4 = /\bpassword\b/;
  if (regex4.test(pass)) {
    error.textContent = "Password should not contain word Password";
    error.style.display = "flex";
    pwd.focus();
    return false;
  }
  //CHECKING IF PASSWORD CONTAINS USERNAME
  const regex5 = new RegExp(uname.value);
  if (regex5.test(pass)) {
    error.textContent = "Password should not contain username";
    error.style.display = "flex";
    pwd.focus();
    return false;
  }

  return pass;
}
//VALIDATING PASSWORD CHECK
function validatePasswordCheck() {
  const passcheck = pwdcheck.value;
  if (passcheck !== pwd.value) {
    error.textContent = "Passwords dont match";
    error.style.display = "flex";
    pwdcheck.focus();
    return false;
  }
  return passcheck;
}

//VALIDATING THE EMAIL
function validateEmail() {
  const emailval = email.value;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(emailval)) {
    error.textContent = "Email address not in right format";
    error.style.display = "flex";
    email.focus();
    return false;
  }

  if (emailval === "example.com") {
    error.textContent = "Email address cannot be from domain example.com";
    error.style.display = "flex";
    email.focus();
    return false;
  }
  return emailval;
}

function usercheck(username) {
  for (let i = 0; i < localStorage.length; i++) {
    const userData = localStorage.getItem(username);
    if (userData) return userData;
    else return false;
  }
}

//CHECKING IF USERNAME FOUND IN localStorage
function loginCheck(user) {
  if (usercheck(user)) {
    //console.log("Evaluating");
    return true;
  } else {
    error.textContent = "username Not found";
    error.style.display = "flex";
    return false;
  }
}

//CHECKING IF THE PASSWORD MATCHES
function passcheck(user, password) {
  const val = usercheck(user);
  if (password === val) return true;
  else {
    error.textContent = "Incorrect Password !Try again";
    error.style.display = "flex";
    passlogin.focus();
    return false;
  }
}

//PART4
//LOGIN FORM VALIDATION
function validateLogin(evt) {
  evt.preventDefault();
  error.textContent = "hello";
  error.style.display = "flex";
  const user = userlogin.value;
  //VALIDATING IF THE USERNAME ALREADY EXISTS
  if (loginCheck(user) === false) {
    return false;
  }
  //KEEPME LOGGEDIN CHECKED
  if (keepsignin) {
    error.textContent = "VALIDATION SUCCESSFUL";
    error.style.display = "flex";
  }

  //VALIDATING IF PASSWORD MATCHING
  const pwd = passlogin.value;
  //console.log(keepsignin);
  if (passcheck(user, pwd) === false) return false;
  if (keepsignin.checked === true) {
    error.textContent = "KEEP ME SIGNED IN CHECKED VALIDATION SUCCESSFUL";
    error.style.display = "flex";
  } else {
    error.textContent = "VALIDATION SUCCESS";
    error.style.display = "flex";
  }
  form2.reset();
}
form1.addEventListener("submit", validateRegister);
form2.addEventListener("submit", validateLogin);
