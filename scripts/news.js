"use strict";
//Select elements
const newContainer = document.querySelector("#news-container");
const btn_next = document.querySelector("#btn-next");
const btn_prev = document.querySelector("#btn-prev");
const pageLink = document.querySelectorAll(".page-link");
const pageNum = document.querySelector("#page-num");
let page = 0; //Là thứ tự trang mỗi khi click thì nó sẽ tăng hoặc giảm
let pageMax;

const pageSize = getFromStorage("curAcc_Setting")[0].setting.psize;
const category = getFromStorage("curAcc_Setting")[0].setting.categoty;

function renderData(data) {
  newContainer.innerHTML = "";
  for (let i = 0; i <= pageSize; i++) {
    let html = `
  <div class="card flex-row flex-wrap">
 <div class="card mb-3">
   <div class="row no-gutters">
     <div class="col-md-4">
       <img
         src=${data[i].urlToImage}
         class="card-img"
         alt=${data[i].title}
       />
     </div>
     <div class="col-md-8">
       <div class="card-body">
         <h5 class="card-title">${data[i].title}</h5>
         <p class="card-text">${data[i].description}</p>
         <a  class="btn btn-primary"
           href= ${data[i].url}
           >View</a
         >
       </div>
     </div>
   </div>
 </div>
</div>
`;
    newContainer.insertAdjacentHTML("afterbegin", html);
  }
}
//Get API
const news = async function (n) {
  const api = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=e3bbe9073031494fbc105d71d36f4737&page=${n}&pageSize=${pageSize}`
  );

  const data = await api.json();
  pageMax = Math.ceil(data.totalResults / 3);
  return data.articles;
};

news(page).then((x) => renderData(x));

if (page === 0) btn_prev.style.display = "none";
else btn_prev.style.display = "block";

btn_next.addEventListener("click", function () {
  page++;
  pageNum.innerHTML = page;
  if (page === 1) btn_prev.style.display = "none";
  else btn_prev.style.display = "block";

  news(page)
    .then((x) => {
      if (page === pageMax) btn_next.style.display = "none";
      else btn_next.style.display = "block";
      if (page === 1) btn_prev.style.display = "none";
      else btn_prev.style.display = "block";

      renderData(x);
    })
    .catch((err) => console.log(err));
});
btn_prev.addEventListener("click", function () {
  page--;
  news(page)
    .then((x) => {
      if (page === pageMax) btn_next.style.display = "none";
      else btn_next.style.display = "block";

      if (page === 1) btn_prev.style.display = "none";
      else btn_prev.style.display = "block";
      renderData(x);
    })
    .catch((err) => console.error(err));
  pageNum.innerHTML = page;
});
