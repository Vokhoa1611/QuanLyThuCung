"use strict";
//Get data of all user from localStorage:
const KEY = "USER_ARRAY";
const userArr = getFromStorage(KEY) || [];

//Get data of current user from localStorage
//Key : "curAcc" được tạo từ file login.js và lấy trên localStorage
const curAcc = getFromStorage("curAcc");
//File home.js sẽ truy cập được biến curAcc này
//Biến curAcc này giúp chúng ta biết được, người dùng có đăng nhập login hay chưa
//curAcc.length = 0 là người dùng chưa đăng nhập
//curAcc.lenght =1 là người dùng đăng nhập rồi
class User {
  // todolist = [];
  // settinglist = [];
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
  // get_todoList(todo) {
  //   this.todolist.push(todo);
  //   return this;
  // }
  // get_settinglist(setting) {
  //   this.settinglist.push(setting);
  //   return this;
  // }
}
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );
  return user;
}
