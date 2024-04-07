"use strict";
//Select element
const btn_register = document.querySelector("#btn-submit");
const inputFirstName = document.querySelector("#input-firstname");
const inputLastName = document.querySelector("#input-lastname");
const inputUserName = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const inputConfirmPassword = document.querySelector("#input-password-confirm");
btn_register.addEventListener("click", function () {
  //Get input value
  const data = {
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    username: inputUserName.value,
    password: inputPassword.value,
    confirmPassword: inputConfirmPassword.value,
  };
  //Validate avalible data
  function validateData() {
    const checkData = {
      checked_FirstName: data.firstName !== "",
      checked_LastName: data.lastName !== "",
      checked_UserName: data.username !== "",
      checked_Password: data.password !== "",
      checked_Password_Length: data.password.length >= 8,
      checked_CFpassowrd: data.confirmPassword !== "",
      checked_SamePassword: data.password === data.confirmPassword,
    };
    if (
      checkData.checked_FirstName &&
      checkData.checked_LastName &&
      checkData.checked_UserName &&
      checkData.checked_Password &&
      checkData.checked_Password_Length &&
      checkData.checked_CFpassowrd &&
      checkData.checked_SamePassword &&
      true
    ) {
      return true;
    } else {
      if (!checkData.checked_FirstName) alert("Fill you first name !!");
      if (!checkData.checked_LastName) alert("Fill your last name !!");
      if (!checkData.checked_UserName) alert("Fill your user name!!");
      if (!checkData.checked_Password) alert("Fill yout password!!");
      if (!checkData.checked_Password_Length)
        alert("Your password must be longer than 8 letters");
      if (!checkData.checked_CFpassowrd) alert("Fill your confirm password");
      if (!checkData.checked_SamePassword)
        alert("Password and confirm password must be same!!");
      return false;
    }
  }
  //If data is availible save data to localStorage
  if (validateData()) {
    userArr.push(
      new User(data.firstName, data.lastName, data.username, data.password)
    );
    //Check duplicate username in array.
    function checkDuplicate(arr) {
      let arr_userName = [];
      let boolean;
      arr.forEach((e) => {
        arr_userName.push(e.username);
        const unique_userName = Array.from(new Set(arr_userName));
        boolean = arr_userName.length === unique_userName.length;
      });
      return boolean;
    }
    //Save data to local storage
    if (checkDuplicate(userArr)) {
      saveToStorage(KEY, userArr);
      //Move to login.html after click button register
      window.location.href = "../pages/login.html";
    } else alert(`User name already exists`);
    //Clear input field
    inputFirstName.value =
      inputLastName.value =
      inputUserName.value =
      inputPassword.value =
      inputConfirmPassword.value =
        "";
  }
});
