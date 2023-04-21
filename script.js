let arr = [
  { title: "qwe", body: "qweqweqwe", kategory: 1, id: "id" },
  { title: "asd", body: "asdasdasd", kategory: 2, id: "id" },
  { title: "zxc", body: "zxczcxzxc", kategory: 3, id: "id" },
];
let arrCategory = [
  {
    name: "QQQQQQ",
    id: "Q",
  },
  {
    name: "WWWWWW",
    id: "W",
  },
  {
    name: "EEEEEE",
    id: "E",
  },
];
const selectCategory = document.querySelector(".select__category");
const newsWrapper = document.querySelector(".news__wrapper");
const addNews = document.querySelector(".add__news");
const modal = document.querySelector(".modal");
const modalBtnSend = document.querySelector(".modal__btn_send");

arrCategory.forEach((elem) => {
  createCategory(elem);
});

arr.forEach((elem) => {
  createSingleNews(elem);
});

//Show all news
function showAllNews() {
  arr.forEach((elem) => {
    createSingleNews(elem);
  });
}
//Create categories
function createCategory(obj) {
  const btnCategory = document.createElement("button");
  btnCategory.classList.add("btn__category");
  btnCategory.textContent = obj.name;
  selectCategory.append(btnCategory);
}

//Create piece of news
function createSingleNews(obj) {
  const singleNews = document.createElement("div");
  singleNews.classList.add("single_news");
  newsWrapper.prepend(singleNews);
  const newsTitle = document.createElement("h3");
  newsTitle.classList.add("news_title");
  newsTitle.textContent = obj.title;
  const newsBody = document.createElement("p");
  newsBody.classList.add("news__body");
  newsBody.textContent = obj.body;
  const btnEdit = document.createElement("button");
  btnEdit.classList.add("news__btn_edit");
  btnEdit.textContent = "Edit";
  btnEdit.addEventListener("click", () => {
    modal.style.display = "block";
  });
  singleNews.append(btnEdit, newsTitle, newsBody);
}

modalBtnSend.addEventListener("click", () => {
  modal.style.display = "none";
});
addNews.addEventListener("click", () => {
  modal.style.display = "block";
});
