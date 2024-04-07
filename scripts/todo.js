"use strict";
//Select elements
const inputTask = document.querySelector("#input-task");
const btnAdd = document.querySelector("#btn-add");
const containerList = document.querySelector("#todo-list");
//Varible
let todoArr = [];
let curtodoArr = [];
class Task {
  constructor(task, owner, isDone = false) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

function render_Todolist(data) {
  containerList.innerHTML = "";
  data.forEach((e) => {
    const x = e.isDone === true ? "checked" : "";
    let html = `<li class=${x}>${e.task}<span class="close" onclick="delete_todo('${e.task}')">x</span></li>`;
    containerList.insertAdjacentHTML("afterbegin", html);
  });
  toggle();
}

function toggle() {
  //Toggle the list had done
  const list_child = containerList.childNodes;
  list_child.forEach((x) =>
    x.addEventListener("click", function () {
      // this.classList.toggle("checked");
      //B.CHANGE PROPERTY OF OBJECT NEW TASK  isDone  false
      let find;
      //B.1 Gán lại giá trị todoArr nếu không gán thì khi ta reload lại page thì todoArr sẽ là empty array
      todoArr = getFromStorage("todo");

      // B.2 Ta xác định nội dung của todolist khi ta click vào danh sách đó.
      const stringText = this.innerText;
      const textTodo_arr = stringText.split("\n"); // output[("go to gym", "x")];
      const textTodo = textTodo_arr[0]; //output  go to gym

      //B.3 Tìm object  của todolist đó trong array và tìm vị trí
      //B.3.1 Tìm object mà ta vừa mới click
      // Ví dụ 2 tài khoản có todolist trùng nhau là go to gym nên ta phải thêm một điều kiện nữa là : obj.owner.username === curAcc.username để biết được chính xác todolist của tài khoảng nào đã thay đổi
      find = todoArr.find(
        (obj) => obj.task === textTodo && obj.owner.username === curAcc.username
      );
      //B.3.1 Tìm vị trí object ta vừa mới click trong toàn bộ tài khoản
      const findIndex = todoArr.findIndex(
        (obj) => obj.task === textTodo && obj.owner.username === curAcc.username
      );
      // B.4 Thay đổi thuộc tính của object ta vừa mới click
      console.log(find);
      if (find.isDone === true) {
        find.isDone = false;
      } else find.isDone = true;
      //B.5 Cập nhật lại dữ liệu vào trong todoArray và curtoArr
      //todoArray là của toàn bộ người dùng khác nhau
      //curtoArr là của người dùng hiện tại
      todoArr.splice(findIndex, 1, find);
      saveToStorage("todo", todoArr);
      curtodoArr = todoArr.filter(
        (obj) => obj.owner.username === curAcc.username
      );
      saveToStorage("todolist_curUser", curtodoArr);
      //B.6 Cập nhật lại giao diện mỗi khi ta click
      render_Todolist(getFromStorage("todolist_curUser"));
    })
  );
}

btnAdd.addEventListener("click", function () {
  //Nếu người dùng đăng nhập rồi thì curAcc.length = 1
  if (curAcc.length !== 0) {
    //Get input value
    const task = inputTask.value;
    //KHi ta reload lại page,hoặc chuyển page rồi quay lại thì todoArr sẽ trở lại
    // thành empty array
    //Nếu todoArr là empty array thì todoArr = getFromStorage("todo");
    // todoArr = todoArr.length > 0 ? todoArr : getFromStorage("todo");

    todoArr = getFromStorage("todo");
    todoArr.push(new Task(task, curAcc));
    //Save data to localStorage
    saveToStorage("todo", todoArr);
    //Filter
    curtodoArr = todoArr.filter(
      (obj) => obj.owner.username === curAcc.username
    );
    saveToStorage("todolist_curUser", curtodoArr);
    //Clear input field
    inputTask.value = "";
    //Update UI
    render_Todolist(getFromStorage("todolist_curUser"));
    //Toggle the list had done
    toggle();
  } else {
    alert("Please login first");
    //Clear inputfild
    inputTask.value = "";
  }
});

render_Todolist(getFromStorage("todolist_curUser"));
// toggle();

const delete_todo = function (task) {
  //Khi reload lại page thì todoArr sẽ là emptyarray => [].findIndex() =-1 => ta ấn xóa
  // một element bất kỳ nó sẽ xóa hết dữ liệu
  todoArr = getFromStorage("todo");
  curtodoArr = getFromStorage("todolist_curUser");
  const indexAll = todoArr.findIndex((obj) => obj.task === task);
  todoArr.splice(indexAll, 1);
  saveToStorage("todo", todoArr);
  const indexCur = curtodoArr.findIndex((obj) => obj.task === task);
  curtodoArr.splice(indexCur, 1);
  saveToStorage("todolist_curUser", curtodoArr);
  render_Todolist(getFromStorage("todolist_curUser"));
};
