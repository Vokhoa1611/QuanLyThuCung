"use strict";
//Select elements
const useNameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");
const btnLogin = document.querySelector("#btn-submit");
//Global varible
//Biến này  global này để các file js khác có thể dùng được
let currentAccount;

console.log(userArr); //[{…}, {…}]
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  function validateData() {
    const check_userName = useNameInput.value !== "";
    const checked_password = passwordInput.value !== "";
    if (check_userName && checked_password && true) return true;
    else {
      if (!check_userName) alert("Fill your username !!");
      if (!checked_password) alert("Fill your passord!!");

      return false;
    }
  }
  if (validateData()) {
    //Check correct data
    const check_userName_same = userArr.some(
      (e) => e.username === useNameInput.value
    );
    if (check_userName_same) {
      currentAccount = userArr.find(
        (obj) => obj.username === useNameInput.value
      );
      if (currentAccount.password === passwordInput.value) {
        console.log("Welcome back");
        //Save  CURRENT data to localStorage
        saveToStorage("curAcc", currentAccount);
        //Filter todolist at todo.html
        saveToStorage(
          "todolist_curUser",
          getFromStorage("todo").filter(
            (obj) => obj.owner.username === useNameInput.value
          )
        );
        //Filter settinglist at setting.html to seclect Setiing list of CURRENT USER
        saveToStorage(
          "curAcc_Setting",
          getFromStorage("allAcc_Setting").filter(
            (obj) => obj.username === useNameInput.value
          )
        );
        //Clear input field
        useNameInput.value = passwordInput.value = "";
        // Move to home page
        window.location.href = "../index.html";
      } else alert("Your password is not TRUE");
    } else alert("Your username is not TRUE");
  }
});
