"use strict";
//Select element
const btn_logout = document.querySelector("#btn-logout");
const noneLogin = document.querySelector("#login-modal");
const didLogin = document.querySelector("#main-content");
const messageLogin = document.querySelector("#welcome-message");
// Biến curAcc được lấy từ file User.js
console.log(curAcc);
if (curAcc.length !== 0) {
  // noneLogin.style.visibility = "hidden";
  noneLogin.style.display = "none";
  messageLogin.innerHTML = `Welcom back ${curAcc.lastName.toUpperCase()}`;
} else {
  didLogin.style.display = "none";
}
//Event click LOGOUT
btn_logout.addEventListener("click", function (e) {
  e.preventDefault();
  //Delete curret account
  localStorage.removeItem("curAcc");
  //Move to login.html
  window.location.href = "./pages/login.html";
});
