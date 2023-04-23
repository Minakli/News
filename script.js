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
let arr = [
  { title: "qwe", body: "qweqweqwe", kategory: 1, id: "id" },
  { title: "asd", body: "asdasdasd", kategory: 2, id: "id" },
  { title: "zxc", body: "zxczcxzxc", kategory: 3, id: "id" },
];

//Get categories from the server
async function getArrCategory() {
  let response = await fetch("http://24api.ru/rest-news-category");
  arrCategory = await response.json();
  arrCategory.forEach((elem) => {
    createCategory(elem);
  });
}
getArrCategory();

// Showing all the news
function showAllNews() {
  arr.forEach((elem) => {
    createSingleNews(elem);
  });
}
// Creating a category
function createCategory(obj) {
  const btnCategory = document.createElement("button");
  btnCategory.classList.add("btn__category");
  btnCategory.textContent = obj.name;
  selectCategory.append(btnCategory);
  btnCategory.addEventListener("click", () => {});
}

// Deleting a category
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

//Editing a category
async function editCategory(elem) {
  const text = elem.querySelector(`input[type="text"]`);
  let unit = { name: "qwe" };
  unit = arrCategory.find((item) => elem.id == item.id);
  console.log(unit);
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

modalBtnSend.addEventListener("click", () => {
  modal.style.display = "none";
});

addNews.addEventListener("click", () => {
  modal.style.display = "block";
  editor.style.display = "none";
});

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

editorApply.addEventListener("click", () => {
  //Get li array
  let arrLi = editorUl.querySelectorAll("li");
  console.log(arrLi);

  arrLi.forEach((elem) => {
    const checkbox = elem.querySelector(`input[type="checkbox"]`);
    if (checkbox.checked) {
      deleteCategory(elem);
    }

    editCategory(elem);
  });

  arrCategory.forEach(() => {});
  editor.style.display = "none";
});

showAllNews();
