"use strict";

import g from "./script2.js";

g();

const d = new Date();
console.log(d);
let text = d.toLocaleString();

console.log(text);

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
  if (addPostContent.value === "") {
    alert("It seems that you forgot to add a post, bro");
  } else if (addTitleContent.value === "") {
    alert("It seems that you forgot to add a title, bro");
  } else {
    e.preventDefault();
    const result = await fetch(
      "https://pocketbase.sksoldev.com/api/collections/blog/records",
      {
        method: "POST",
        body: JSON.stringify({
          body: addPostContent.value,

          title: addTitleContent.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    console.log(await result.json());

    addTitleContent.value = "";

    addPostContent.value = "";

    postList.innerHTML = "";
    uploadPosts();
    closeAddModal();
  }
}

// async function uploadPosts() {
//   const response = await fetch(
//     "https://pocketbase.sksoldev.com/api/collections/blog/records?sort=-created"
//   );
//   const result = await response.json();

//   console.log(result);

//   result.items.forEach((element) => {
//     template(element);
//   });

//   document.querySelectorAll(".delete-button").forEach((el) =>
//     el.addEventListener("click", () => {
//       deleteModalWindow.classList.toggle("active");
//       overlay.classList.toggle("hidden");
//       const span = deleteForm.querySelector("#span");
//       console.log(span.textContent);
//       console.log(`${el.dataset.title}`);
//       deleteForm.dataset.id = `${el.dataset.id}`;
//       span.textContent = `${el.dataset.title}`;
//     })
//   );

//   const btnLike = document
//     .querySelectorAll(".like-button")
//     .forEach((el) => el.addEventListener("click", likePost));

//   const editPost = document.querySelectorAll(".edit-button");

//   editPost.forEach((el) =>
//     el.addEventListener("click", () => {
//       console.log(el.dataset.id);
//       console.log(el.dataset.title);
//       console.log(el.dataset.body);
//       console.log(el.dataset.likes);
//       editForm.dataset.id = `${el.dataset.id}`;

//       editTitleContent.value = el.dataset.title;
//       editPostContent.value = el.dataset.body;

//       editModalWindow.classList.toggle("active");
//       overlay.classList.toggle("hidden");
//     })
//   );

//   const rawLi = result.items;
//   const finalLi = rawLi.length;
//   const size = 30 + 23.5 * finalLi;
//   document.getElementById("overlay").style.height = `${size}vh`;
//   editForm.addEventListener("submit", editPostToServer);
// }

function template(item) {
  const data = new Date(item.created);

  const currentTime = data.toLocaleDateString("ru", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const li = document.createElement("li");
  // Add class
  li.className = `post flex flex-col justify-between p-6 bg-slate-100 space-y-8 rounded-lg`;

  //Add id

  li.setAttribute("id", `${item.id}`);

  li.innerHTML = `<div class="flex justify-between items-center ">
            <h2 class="title text-2xl">${item.title}</h2>
            <div class="flex items-center  space-x-3" >
              <button data-id="${item.id}" data-title="${item.title}" data-body="${item.body}" data-likes="${item.likes}"      
                class="edit-button px-7 py-2 bg-blue-400 rounded-2xl text-white hover:bg-blue-300 active:bg-blue-700 hover:shadow-lg hover:shadow-slate-500 transition-all duration-200 active:translate-y-0.5"
              >
                Edit
              </button>
              <button data-id="${item.id}"  data-title="${item.title}" 
                class="delete-button   px-4 py-2 bg-blue-400 rounded-2xl text-white hover:bg-blue-300 active:bg-blue-700 hover:shadow-lg hover:shadow-slate-500 transition-all duration-200 active:translate-y-0.5"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div class='body'>
           ${item.body}
          </div>
          
          <div class="flex justify-between items-center div-likes">
            <button  class="relative like-button" >
              <p class="likes ml-8">${item.likes}</p>
              <div
                class="h-6 w-6 absolute top-0.5 -left-0 hover:scale-125 rounded-2xl hover:bg-pink-500 transition-all active:translate-y-1 hover:shadow-lg hover:shadow-slate-500 duration-300"
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
    resultLikes = await fetch(
      `https://pocketbase.sksoldev.com/api/collections/blog/records/${parentDiv.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          likes: totalLikes,
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
  } catch (error) {
    alert(error);
  }

  const finalLikes = await resultLikes.json();

  parentDiv.querySelector(".likes").textContent = finalLikes.likes;
}

async function editPostToServer(e) {
  e.preventDefault();
  const parentDiv = e.target.closest("#edit-form");

  console.log(parentDiv);

  const beforeServerTitle = parentDiv.querySelector(
    ".edit-title-content"
  ).value;
  const beforeServerBody = parentDiv.querySelector(".edit-post-content").value;
  const id = `${editForm.dataset.id}`;

  let rawPostResult = "";

  try {
    rawPostResult = await fetch(
      `https://pocketbase.sksoldev.com/api/collections/blog/records/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          body: beforeServerBody,
          title: beforeServerTitle,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
  } catch (error) {
    alert(error);
  }

  const postResult = await rawPostResult.json();
  const afterServerTitle = postResult.title;
  const afterServerBody = postResult.body;

  console.log(afterServerBody);
  console.log(afterServerTitle);
  postList = document.querySelector(".post-list");
  const currentPost = postList.querySelector(`#${id}`);

  currentPost.querySelector(".title").textContent = afterServerTitle;
  currentPost.querySelector(".body").textContent = afterServerBody;

  console.log(currentPost);

  // postList.innerHTML = "";
  // await uploadPosts();
  closeEditModal();
  // document.getElementById(`${id}`).scrollIntoView({
  //   behavior: "auto",
  //   block: "center",
  //   inline: "center",
  //   behavior: "smooth",
  // });
}

deletePostBtn.addEventListener("click", deletePost);

async function deletePost(e) {
  await fetch(
    `https://pocketbase.sksoldev.com/api/collections/blog/records/${deleteForm.dataset.id}`,
    {
      method: "DELETE",
    }
  );

  postList.querySelector(`#${deleteForm.dataset.id}`).remove();

  closeDeleteModal();
}

async function downloadPageNumber(e) {
  console.log(e.textContent);
  const response = await fetch(
    `https://pocketbase.sksoldev.com/api/collections/blog/records?page=${e.textContent}&sort=-created`
  );
  const result = await response.json();

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

      editTitleContent.value = el.dataset.title;
      editPostContent.value = el.dataset.body;

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
}

async function uploadPages() {
  const response = await fetch(
    "https://pocketbase.sksoldev.com/api/collections/blog/records"
  );
  const result = await response.json();

  const totalPages = result.totalPages;
  for (let i = 1; i <= totalPages; i++) {
    const paginationMenu = document.querySelector("#pagination-menu");

    const button = document.createElement("button");
    // Add class
    button.className = `pagination-btn w-12 h-12 font-bold hover:bg-slate-300 hover:scale-110 bg-slate-400 flex items-center justify-center rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-slate-700 active:translate-y-0.5 active:bg-slate-700 active:text-white`;

    //Add id

    button.innerHTML = `${i}`;
    paginationMenu.appendChild(button);
  }
  const paginationBtn = document
    .querySelectorAll(".pagination-btn")
    .forEach((el) =>
      el.addEventListener("click", () => downloadPageNumber(el))
    );
}

async function uploadPosts() {
  const response = await fetch(
    "https://pocketbase.sksoldev.com/api/collections/blog/records?sort=-created"
  );
  const result = await response.json();

  console.log(result);

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

      editTitleContent.value = el.dataset.title;
      editPostContent.value = el.dataset.body;

      editModalWindow.classList.toggle("active");
      overlay.classList.toggle("hidden");
    })
  );

  const rawLi = result.items;
  const finalLi = rawLi.length;
  const size = 30 + 23.5 * finalLi;
  document.getElementById("overlay").style.height = `${size}vh`;
  editForm.addEventListener("submit", editPostToServer);

  uploadPages();
}
