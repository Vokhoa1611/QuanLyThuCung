"use strict";
//Select elements
const pagesize = document.querySelector("#input-page-size");
const categoty = document.querySelector("#input-category");
const btnSet = document.querySelector("#btn-submit");
let allAcc_set = [];
class Setting {
  constructor(setting, owner) {
    this.setting = setting;
    this.owner = owner;
  }
}
btnSet.addEventListener("click", function () {
  if (curAcc.length !== 0) {
    if (Number(pagesize.value) > 0) {
      //Get input data
      const data_set = {
        psize: pagesize.value,
        categoty: categoty.value,
      };

      //curAcc.setting là một object chứa thông tin của người dùng HIỆN TẠI
      curAcc.setting = data_set;
      //allAcc_set là một array chưa toàn bộ thông tin setting của TOÀN BỘ người dùng
      //FIXME allAcc_Set gán lại giá trị , vì ko gán, khi ta reload thì nó sẽ lại là empty array.
      allAcc_set = getFromStorage("allAcc_Setting");
      if (allAcc_set.some((obj) => obj.username === curAcc.username)) {
        const index = allAcc_set.findIndex(
          (obj) => obj.username === curAcc.username
        );
        console.log(index);
        //Replace 1 element from position index by setting inputvalue
        allAcc_set.splice(index, 1, curAcc);
        //Save data on local Storage
        saveToStorage("curAcc_Setting", [curAcc]);
        saveToStorage("allAcc_Setting", allAcc_set);
      } else {
        allAcc_set.push(curAcc);
        //Save data on local storage
        saveToStorage("curAcc_Setting", [curAcc]);
        saveToStorage("allAcc_Setting", allAcc_set);
      }
    } else {
      alert("Number page must positive");
    }
  } else {
    alert("Please login");
  }
});
//Display current setting list of current users
//Khi ta reload page hoặc chuyển page rồi quay lại thì dữ liệu vẫn được hiện thị
console.log(getFromStorage("curAcc_Setting"));

//Nếu người dùng đã đăng nhập rồi thì sẽ hiện thị thông số cài đặt trước đó,còn nếu chưa cài đặt thì toàn bộ thông số cài đặt sẽ ko hiển thị
if (curAcc.length !== 0) {
  pagesize.value = getFromStorage("curAcc_Setting")[0]?.setting.psize; //Dấu ?. để xác định xem  getFromStorage("curAcc_Setting")[0] có tồn tại hay không ?
  categoty.value = getFromStorage("curAcc_Setting")[0]?.setting.categoty;
} else {
  pagesize.value = "";
  categoty.value = "";
}
