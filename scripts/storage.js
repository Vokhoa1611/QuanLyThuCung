"use strict";
//2.Lưu dữ liệu dưới LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//Get data from petlist
function getFromStorage(key) {
  const result = localStorage.getItem(key);
  if (result) {
    return JSON.parse(result);
  } else return [];
}
