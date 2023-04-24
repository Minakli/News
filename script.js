const selectCategory = document.querySelector(".select__category");

const newsWrapper = document.querySelector(".news__wrapper");
const addNews = document.querySelector(".add__news");

const modal = document.querySelector(".modal");
const modalBtnSend = document.querySelector(".modal__btn_send");

const editor = document.querySelector(".editor");
const showEditor = document.querySelector(".btn__category_editor");
const editorUl = document.querySelector(".editor__ul");
const editorApply = document.querySelector(".editor__apply");

let arrCategory = [];
let arrNews = [];

//Geting Categories from the server
async function getArrCategory() {
  let response = await fetch("http://24api.ru/rest-news-category");
  arrCategory = await response.json();
  selectCategory.innerHTML = "";
  arrCategory.forEach((elem) => {
    createBtnCategory(elem);
  });
}

// Displaying the Category Editor
showEditor.addEventListener("click", () => {
  modal.style.display = "none";
  editorUl.innerHTML = "";
  arrCategory.forEach((elem) => {
    createEditorLi(elem);
  });
  // createEditorLi();
  editor.style.display = "flex";
});

// Creating a buttons of Categories
function createBtnCategory(obj) {
  const btnCategory = document.createElement("button");
  btnCategory.classList.add("btn__category");
  btnCategory.textContent = obj.name;
  selectCategory.append(btnCategory);
  btnCategory.addEventListener("click", () => {});
}

// Apply Category Editor changes
editorApply.addEventListener("click", () => {
  //Get li array
  let arrLi = editorUl.querySelectorAll("li");
  arrLi.forEach((elem) => {
    const checkbox = elem.querySelector(`input[type="checkbox"]`);
    if (checkbox.checked) {
      deleteCategory(elem);
    }
    editCategory(elem);
  });

  createCategory();

  getArrCategory();
  editor.style.display = "none";
  // Перезагрузка страницы
  // location.reload();
});

// Deleting a Category
async function deleteCategory(elem) {
  let response = await fetch("http://24api.ru/rest-news-category/" + elem.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  let isDelete = await response.json();
  console.log(isDelete);
}

//Editing a Category
async function editCategory(elem) {
  const text = elem.querySelector(`input[type="text"]`);
  let unit = { name: "qwe" };
  unit = arrCategory.find((item) => elem.id == item.id);
  if (text.value !== unit.name) {
    let response = await fetch(
      "http://24api.ru/rest-news-category/" + unit.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: text.value }),
      }
    );
    let isEdited = await response.json();
    console.log(isEdited);
  }
}

// Creating a new Category
async function createCategory() {
  const editorInputAdd = document.querySelector(".editor__input_add");
  if (editorInputAdd.value) {
    const id = Math.random();
    await fetch("http://24api.ru/rest-news-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name: editorInputAdd.value, id: id }),
    });
  }
}

// Showing all the news
async function getArrNews() {
  let response = await fetch("http://24api.ru/rest-news", {});
  arrNews = await response.json();
  arrNews.forEach((elem) => {
    createSingleNews(elem);
  });
}

//Creating a piece of news
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

// Creating  editor unit
function createEditorLi(object) {
  const editorLi = document.createElement("li");
  editorLi.classList.add("editor__li");
  editorLi.setAttribute("id", object.id);
  editorUl.append(editorLi);
  const editorLiCheckbox = document.createElement("input");
  editorLiCheckbox.classList.add("editor__checkbox");
  editorLiCheckbox.setAttribute("type", "checkbox");
  const editorLiText = document.createElement("input");
  editorLiText.classList.add("editor__news_text");
  editorLiText.setAttribute("type", "text");
  editorLiText.value = object.name;
  editorLi.append(editorLiCheckbox, editorLiText);
}

modalBtnSend.addEventListener("click", () => {
  modal.style.display = "none";
});

addNews.addEventListener("click", () => {
  modal.style.display = "block";
  editor.style.display = "none";
});

getArrCategory();
getArrNews();
