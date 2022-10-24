"use strict";

// import axios from "axios";

import g from "./script2.js";

g();

const d = new Date();
console.log(d);
let text = d.toLocaleString();

console.log(text);
const loader = document.querySelector(".loader");
const addModalWindow = document.querySelector(".add-modal-window");
const addBtnClose = document.querySelector(".add-button-close");
const addUploadPost = document.querySelector(".add-upload-post");
const addPost = document.querySelector(".add-post");
const overlay = document.querySelector(".overlay");
const addPostContent = document.querySelector(".add-post-content");
const addTitleContent = document.querySelector(".add-title-content");
const addForm = document.querySelector("#add-form");
const editForm = document.querySelector("#edit-form");
let postList = document.querySelector(".post-list");
const editBtnClose = document.querySelector(".edit-button-close");
// const editForm = document.querySelector("#edit-form");
const editModalWindow = document.querySelector(".edit-modal-window");
const editUploadPost = document.querySelector(".edit-upload-post");

const editPostContent = document.querySelector(".edit-post-content");
const editTitleContent = document.querySelector(".edit-title-content");

//Delete Handlers

const deleteModalWindow = document.querySelector(".delete-modal-window");
const deleteBtnClose = document.querySelector(".delete-button-close");
const deletePostBtn = document.querySelector(".delete-post-btn");
const deleteForm = document.querySelector("#delete-form");

// Autorization Page

const loginForm = document.querySelector("#login-form");
const loginBtnClose = document.querySelector(".login-button-close");
const addLogin = document.querySelector(".add-login");
const addPassword = document.querySelector(".add-password");
const loginBtn = document.querySelector(".login-btn");
const loginBtnOpen = document.querySelector(".login-btn-open");
const loginModalWindow = document.querySelector(".login-modal-window");

//Login Modal Window
const closeLoginModal = function () {
  loginModalWindow.classList.remove("active");
  overlay.classList.add("hidden");
};

loginBtnOpen.addEventListener("click", () => {
  loginModalWindow.classList.toggle("active");
  overlay.classList.toggle("hidden");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && loginModalWindow.classList.contains("active")) {
    closeLoginModal();
  }
});

loginBtnClose.addEventListener("click", closeLoginModal);

overlay.addEventListener("click", closeLoginModal);

loginForm.addEventListener("submit", loginToServer);

function loginToServer(e) {
  e.preventDefault();
  const login = addLogin.value;
  const password = addPassword.value;

  console.log(login);
  console.log(password);
}

kennyQuotes();
uploadPosts();

//Add Modal Window
const closeDeleteModal = function () {
  deleteModalWindow.classList.remove("active");
  overlay.classList.add("hidden");
};

const closeAddModal = function () {
  addModalWindow.classList.remove("active");
  overlay.classList.add("hidden");
};

addPost.addEventListener("click", () => {
  addModalWindow.classList.toggle("active");
  overlay.classList.toggle("hidden");
});

addBtnClose.addEventListener("click", closeAddModal);
deleteBtnClose.addEventListener("click", closeDeleteModal);

overlay.addEventListener("click", closeAddModal);
overlay.addEventListener("click", closeDeleteModal);

document.addEventListener("keydown", function (e) {
  if (
    (e.key === "Escape" && addModalWindow.classList.contains("active")) ||
    (e.key === "Escape" && editModalWindow.classList.contains("active"))
  ) {
    closeAddModal();
    closeEditModal();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && deleteModalWindow.classList.contains("active")) {
    closeDeleteModal();
  }
});

//Delete modal window

//Edit Modal Window

const closeEditModal = function () {
  editModalWindow.classList.remove("active");
  overlay.classList.add("hidden");
};

editBtnClose.addEventListener("click", closeEditModal);

overlay.addEventListener("click", closeEditModal);

addForm.addEventListener("submit", addPostToServer);

async function addPostToServer(e) {
  try {
    if (addPostContent.value === "") {
      alert("It seems that you forgot to add a post, bro");
    } else if (addTitleContent.value === "") {
      alert("It seems that you forgot to add a title, bro");
    } else {
      e.preventDefault();

      const formData = new FormData(addForm);

      console.log(formData);
      await axios.post(
        "https://pocketbase.sksoldev.com/api/collections/blog/records",
        formData
      );

      addTitleContent.value = "";

      addPostContent.value = "";

      postList.innerHTML = "";
      uploadPosts();
      closeAddModal();
    }
  } catch (error) {
    console.log(error);
  }
}

function template(item) {
  const data = new Date(item.created);

  const currentTime = data.toLocaleDateString("ru", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const li = document.createElement("li");
  // Add class
  li.className = `post flex flex-col transition-all duration-300 hover:bg-slate-200 justify-between p-6 bg-slate-100 space-y-14 rounded-lg group overflow-auto  `;

  //Add id

  li.setAttribute("id", `${item.id}`);

  li.innerHTML = `<div class="flex justify-between items-center ">
            <h2 class="title overflow-auto text-2xl">${item.title}</h2>
            <div class="flex items-center  space-x-3" >
              <button data-id="${item.id}" data-title="${
    item.title
  }" data-body="${item.body}" data-likes="${item.likes}"      
                class="edit-button px-7 py-2 bg-blue-400 rounded-2xl text-white hover:bg-blue-300 active:bg-blue-700 hover:shadow-lg hover:shadow-slate-500 transition-all duration-200 active:translate-y-0.5 scale-0 group-hover:scale-100 "
              >
                Edit
              </button>
              <button data-id="${item.id}"  data-title="${item.title}" 
                class="delete-button   px-4 py-2 bg-rose-800 rounded-2xl text-white hover:bg-rose-700 active:bg-rose-900 hover:shadow-lg hover:shadow-slate-500 transition-all duration-200 active:translate-y-0.5 scale-0 group-hover:scale-100 "
              >
                Delete
              </button>
            </div>
          </div>
          <div class="flex space-x-3">
              <div class=" clickimg transition-all duration-300  max-w-[50%]  ">
                <img
                  class="myImg bg-cover bg-center" 
                  src="${
                    item.image
                      ? `https://pocketbase.sksoldev.com/api/files/blog/${item.id}/${item.image}`
                      : ""
                  }"
                  alt=""
                />
              </div>
            
          
          <div class='body overflow-auto z-20'>
           ${item.body}
          </div>
          </div>
          
          <div class="flex justify-between items-center div-likes">
            <button  class="relative like-button" >
              <p class="likes ml-8">${item.likes}</p>
              <div
                class="h-6 w-6 absolute top-0.5 -left-0 hover:scale-125 rounded-2xl hover:bg-pink-500 transition-all active:translate-y-1 hover:shadow-lg hover:shadow-slate-500 duration-300 active:bg-pink-700"
              >
                <img    src="../img/like.svg" style="fill: white" alt="" />
              </div>
            </button>
            <div>${currentTime}</div>
          </div>`;

  postList.appendChild(li);
}

async function likePost(e) {
  const parentDiv = e.target.closest(".post");
  let likes = parentDiv.querySelector(".likes").textContent;

  const totalLikes = Number(likes) + 1;
  let resultLikes = "";

  try {
    resultLikes = await axios.patch(
      `https://pocketbase.sksoldev.com/api/collections/blog/records/${parentDiv.id}`,
      {
        likes: totalLikes,
      }
    );
  } catch (error) {
    console.log(error);
  }

  const finalLikes = await resultLikes.data;

  parentDiv.querySelector(".likes").textContent = finalLikes.likes;
}

async function editPostToServer(e) {
  try {
    e.preventDefault();

    const id = `${editForm.dataset.id}`;
    postList = document.querySelector(".post-list");

    const currentPost = postList.querySelector(`#${id}`);

    const myImg = document.querySelector("#inputImgEdd");

    const formData = new FormData(editForm);

    let fileObject = {};

    [, , [, fileObject]] = [...formData];

    console.log(fileObject.name);

    const [...arrFormData] = formData;
    console.log(arrFormData);

    const array = [...formData];

    const [, [, body]] = array;
    const [[, title1]] = array;
    const [, , [, img1]] = array;

    console.log(title1);
    console.log(body);
    console.log(img1);

    const formDataObject = arrFormData[0];
    console.log(formDataObject);

    // if (fileObject.name === "") {
    //   arrFormData.pop();
    // }

    const [, , [, file]] = [...formData];

    console.log(file);

    console.log([...formData]);

    console.log(...formData);

    // const { File } = image;

    // console.log(File);

    console.log(arrFormData);

    // let rawPostResult = "";

    const finalObject = {
      title: `${title1}`,
      body: `${body}`,
    };

    const whyThisDoesNotWork = {
      title: `${title1}`,
      body: `${body}`,
      image: img1,
    };

    const rawPostResult = await axios.patch(
      `https://pocketbase.sksoldev.com/api/collections/blog/records/${id}`,
      fileObject.name === "" ? finalObject : formData
    );

    const postResult = await rawPostResult.data;
    console.log(postResult);

    const afterServerTitle = postResult.title;
    const afterServerBody = postResult.body;
    const afterServerImg = postResult.image;

    console.log(afterServerImg);

    console.log(afterServerBody);

    const finalImg = `https://pocketbase.sksoldev.com/api/files/blog/${id}/${afterServerImg}`;

    console.log(finalImg);

    currentPost.querySelector(".title").textContent = afterServerTitle;
    currentPost.querySelector(".body").textContent = afterServerBody;
    currentPost.querySelector(".myImg").src = finalImg;
    // currentPost.querySelector(".img").src = finalImg;

    // postList.innerHTML = "";
    // await uploadPosts();
    closeEditModal();
    // document.getElementById(`${id}`).scrollIntoView({
    //   behavior: "auto",
    //   block: "center",
    //   inline: "center",
    //   behavior: "smooth",
    // });
  } catch (error) {
    alert(error);
  }
}

deletePostBtn.addEventListener("click", deletePost);

async function deletePost(e) {
  try {
    await axios.delete(
      `https://pocketbase.sksoldev.com/api/collections/blog/records/${deleteForm.dataset.id}`
    );

    postList.querySelector(`#${deleteForm.dataset.id}`).remove();

    closeDeleteModal();
  } catch (error) {
    console.log(error);
  }
}

async function downloadPageNumber(e) {
  try {
    console.log(e.textContent);
    const response = await axios.get(
      `https://pocketbase.sksoldev.com/api/collections/blog/records?page=${e.textContent}&sort=-created`
    );
    const result = await response.data;

    console.log(result);

    postList.innerHTML = "";

    result.items.forEach((element) => {
      template(element);
    });

    document.querySelectorAll(".delete-button").forEach((el) =>
      el.addEventListener("click", () => {
        deleteModalWindow.classList.toggle("active");
        overlay.classList.toggle("hidden");
        const span = deleteForm.querySelector("#span");
        console.log(span.textContent);
        console.log(`${el.dataset.title}`);
        deleteForm.dataset.id = `${el.dataset.id}`;
        span.textContent = `${el.dataset.title}`;
      })
    );

    const btnLike = document
      .querySelectorAll(".like-button")
      .forEach((el) => el.addEventListener("click", likePost));

    const editPost = document.querySelectorAll(".edit-button");

    editPost.forEach((el) =>
      el.addEventListener("click", () => {
        console.log(el.dataset.id);
        console.log(el.dataset.title);
        console.log(el.dataset.body);
        console.log(el.dataset.likes);
        editForm.dataset.id = `${el.dataset.id}`;

        const postList = document.querySelector(".post-list");

        const currentPost = postList.querySelector(`#${id}`);

        //   editTitleContent.value =
        //   currentPost.querySelector(".title").textContent;
        // console.log(editTitleContent.value);
        // editPostContent.value = currentPost.querySelector(".body").textContent;

        console.log(editTitleContent.value);
        editTitleContent.value = el.dataset.title;
        editPostContent.value = el.dataset.body;
        console.log(editTitleContent.value);
        editModalWindow.classList.toggle("active");
        overlay.classList.toggle("hidden");
      })
    );

    const rawLi = result.items;
    const finalLi = rawLi.length;
    const size = 30 + 23.5 * finalLi;
    document.getElementById("overlay").style.height = `${size}vh`;
    editForm.addEventListener("submit", editPostToServer);

    postList = document.querySelector(".post-list");
  } catch (error) {
    console.log(error);
  }
}

async function uploadPages() {
  try {
    const response = await axios.get(
      "https://pocketbase.sksoldev.com/api/collections/blog/records"
    );
    const result = await response.data;

    const totalPages = result.totalPages;
    for (let i = 1; i <= totalPages; i++) {
      const paginationMenu = document.querySelector("#pagination-menu");

      const button = document.createElement("button");
      // Add class
      button.className = `pagination-btn w-12 h-12 font-bold hover:bg-slate-300 hover:scale-110 bg-slate-400 flex items-center justify-center rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-slate-700 active:translate-y-0.5 active:bg-slate-700 active:text-white`;

      button.innerHTML = `${i}`;
      paginationMenu.appendChild(button);
    }
    const paginationBtn = document
      .querySelectorAll(".pagination-btn")
      .forEach((el) =>
        el.addEventListener("click", () => downloadPageNumber(el))
      );
  } catch (error) {
    console.log(error);
  }
}

async function uploadPosts() {
  try {
    loader.classList.add("flex");
    loader.classList.remove("hidden");
    const result = await axios.get(
      "https://pocketbase.sksoldev.com/api/collections/blog/records?sort=-created"
    );

    console.log(result);
    console.log(result.data.items);

    result.data.items.forEach((element) => {
      template(element);
    });

    document.querySelectorAll(".delete-button").forEach((el) =>
      el.addEventListener("click", () => {
        deleteModalWindow.classList.toggle("active");
        overlay.classList.toggle("hidden");
        const span = deleteForm.querySelector("#span");
        console.log(span.textContent);
        console.log(`${el.dataset.title}`);
        deleteForm.dataset.id = `${el.dataset.id}`;
        span.textContent = `${el.dataset.title}`;
      })
    );

    document.querySelectorAll(".clickimg").forEach((el) =>
      el.addEventListener("click", (el) => {
        const x = el.path[1];

        x.classList.toggle("scale-150");
        x.classList.toggle("max-w-[50%]");
      })
    );

    document
      .querySelectorAll(".like-button")
      .forEach((el) => el.addEventListener("click", likePost));

    const editPost = document.querySelectorAll(".edit-button");

    editPost.forEach((el) =>
      el.addEventListener("click", () => {
        console.log(el.dataset.id);
        // console.log(el.dataset.title);
        // console.log(el.dataset.body);
        // console.log(el.dataset.likes);

        const postList = document.querySelector(".post-list");

        const currentPost = postList.querySelector(`#${el.dataset.id}`);

        editTitleContent.textContent =
          currentPost.querySelector(".title").textContent;
        console.log(editTitleContent.value);
        editPostContent.textContent =
          currentPost.querySelector(".body").textContent;

        editForm.dataset.id = `${el.dataset.id}`;
        // console.log(editPostContent.value);
        // editTitleContent.value = el.dataset.title;
        // editPostContent.value = el.dataset.body;
        // console.log(editPostContent.value);

        editModalWindow.classList.toggle("active");
        overlay.classList.toggle("hidden");
      })
    );

    const rawLi = result.data.items;
    console.log(rawLi);
    const finalLi = rawLi.length;
    console.log(finalLi);
    const size = 30 + 23.5 * finalLi;
    document.getElementById("overlay").style.height = `${size}vh`;
    editForm.addEventListener("submit", editPostToServer);

    uploadPages();
    loader.classList.add("hidden");
    loader.classList.remove("flex");
  } catch (error) {
    console.log(error);
  }
}

const quotes = document.querySelector(".kenny");
console.log(quotes);

async function kennyQuotes() {
  try {
    loader.classList.add("flex");
    loader.classList.remove("hidden");
    const result = await axios.get("https://api.kanye.rest/");

    quotes.textContent = result.data.quote;
    loader.classList.add("hidden");
    loader.classList.remove("flex");
  } catch (error) {
    console.log(error);
  }
}

// check add title characters

addTitleContent.addEventListener("keyup", addTitleCharacterCheck);

function addTitleCharacterCheck() {
  const charactersInput = addTitleContent.value.length;
  const charactersCheck = document.querySelector(".add-title-characters");

  if (charactersInput >= 1) {
    charactersCheck.classList.remove("hidden");
  } else if (charactersInput === 0) {
    charactersCheck.classList.add("hidden");
  }

  if (charactersInput === 150) {
    charactersCheck.classList.add("red-alert");
  } else {
    charactersCheck.classList.remove("red-alert");
  }

  charactersCheck.textContent = `${charactersInput} characters (max 150)`;
}

// check add post characters

addPostContent.addEventListener("keyup", addPostCharacterCheck);

function addPostCharacterCheck() {
  const charactersInput = addPostContent.value.length;
  const charactersCheck = document.querySelector(".add-post-characters");

  if (charactersInput >= 1) {
    charactersCheck.classList.remove("hidden");
  } else if (charactersInput === 0) {
    charactersCheck.classList.add("hidden");
  }

  if (charactersInput === 250) {
    charactersCheck.classList.add("red-alert");
  } else {
    charactersCheck.classList.remove("red-alert");
  }

  charactersCheck.textContent = `${charactersInput} characters (max 250)`;
}
// check add title characters

editTitleContent.addEventListener("keyup", editTitleCharacterCheck);

function editTitleCharacterCheck() {
  const charactersInput = editTitleContent.value.length;
  const charactersCheck = document.querySelector(".edit-title-characters");

  if (charactersInput >= 1) {
    charactersCheck.classList.remove("hidden");
  } else if (charactersInput === 0) {
    charactersCheck.classList.add("hidden");
  }

  if (charactersInput === 150) {
    charactersCheck.classList.add("red-alert");
  } else {
    charactersCheck.classList.remove("red-alert");
  }

  charactersCheck.textContent = `${charactersInput} characters (max 150)`;
}

// check add post characters

editPostContent.addEventListener("keyup", editPostCharacterCheck);

function editPostCharacterCheck() {
  const charactersInput = editPostContent.value.length;
  const charactersCheck = document.querySelector(".edit-post-characters");

  if (charactersInput >= 1) {
    charactersCheck.classList.remove("hidden");
  } else if (charactersInput === 0) {
    charactersCheck.classList.add("hidden");
  }

  if (charactersInput === 250) {
    charactersCheck.classList.add("red-alert");
  } else {
    charactersCheck.classList.remove("red-alert");
  }

  charactersCheck.textContent = `${charactersInput} characters (max 250)`;
}
