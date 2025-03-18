const body = document.querySelector("body");
const form1 = window.document.querySelector("#registration");
const form2 = document.getElementById("login");
const error = document.createElement("div");
error.setAttribute('id', 'errorDisplay');
const uname = form1.elements["username"];
const button = document.getElementById("btn");
const userlogin = form2.elements["username"];
const passlogin = form2.elements["password"];
const pwd = form1.elements["password"];
const pwdcheck = form1.elements["passwordCheck"];
body.appendChild(error);
console.log(form1.parentNode);
function validateRegister(evt) {
  //checking username
  console.log(form1.parentNode);
  evt.preventDefault();
  const user = validateUname();
  if (user === false) {
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
  
  localStorage.setItem(user.toLowerCase(), passvalue);
  error.textContent = "REGISTRATION SUCCESSFULLY COMPLETED";
  error.setAttribute("style","display:flex");
  form1.reset();
  
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
  const regex1 = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  if (!regex1.test(pass)) {
    error.textContent =
      "Password should include atleast one lowercase letter and one upper case and one digit";
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
  

  return pass;
}
//VALIDATING PASSWORD CHECK
function validatePasswordCheck() {
  const passcheck = pwdcheck.value;
  if (passcheck !== pwd.value) {
    window.alert("Passwords mismatching");
    pwdcheck.focus();
    return false;
  }
  return passcheck;
}

//VALIDATING THE EMAIL


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
  
  const user = userlogin.value;
  //VALIDATING IF THE USERNAME ALREADY EXISTS
  if (loginCheck(user) === false) {
    return false;
  }
  //KEEPME LOGGEDIN CHECKED
  console.log(form2.lastChild);

  //VALIDATING IF PASSWORD MATCHING
  const pwd = passlogin.value;
  //console.log(keepsignin);
  if (passcheck(user, pwd) === false) return false;
   else {
    
    error.innerHTML = "VALIDATION SUCCESS - Screen Width : " + screen.width;
    error.style.display = "flex";
  }
  form2.reset();
}
form1.addEventListener("submit", validateRegister);
form2.addEventListener("submit", validateLogin);
//DOCUMENT FRAGMENT IMPLEMENTED TO SHOW THE LOCAL STORAGE
button.addEventListener('click' , function()
{
  const form3 = document.getElementById("login");
  const f = form3.cloneNode(false);
  const ul = document.createElement("ul");
  ul.textContent = "The values stored in local Storage";
  //const fragment = new DocumentFragment();
  for(let i =0;i<localStorage.length;i++)
  {
    const li = document.createElement("li");
    const key = localStorage.key(i);
    li.textContent = key + ":" + localStorage.getItem(key);
    f.append(li);
  }
  
  ul.append(f);
  error.append(ul);
  error.style.display = "flex";
});