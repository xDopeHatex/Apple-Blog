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
const postList = document.querySelector(".post-list");
const editBtnClose = document.querySelector(".edit-button-close");
// const editForm = document.querySelector("#edit-form");
const editModalWindow = document.querySelector(".edit-modal-window");
const editUploadPost = document.querySelector(".edit-upload-post");

const editPostContent = document.querySelector(".edit-post-content");
const editTitleContent = document.querySelector(".edit-title-content");

uploadPosts();

//Add Modal Window

const closeAddModal = function () {
  addModalWindow.classList.remove("active");
  overlay.classList.add("hidden");
};

addPost.addEventListener("click", () => {
  addModalWindow.classList.toggle("active");
  overlay.classList.toggle("hidden");
});

addBtnClose.addEventListener("click", closeAddModal);

overlay.addEventListener("click", closeAddModal);

document.addEventListener("keydown", function (e) {
  if (
    (e.key === "Escape" && addModalWindow.classList.contains("active")) ||
    (e.key === "Escape" && editModalWindow.classList.contains("active"))
  ) {
    closeAddModal();
    closeEditModal();
  }
});

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
    const response = await fetch(
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

    addTitleContent.value = "";

    addPostContent.value = "";

    console.log(response);
    let rawAddPost = await response.json();
    console.log(rawAddPost.body);
    // Create li element

    template(rawAddPost);

    // const data = new Date(rawAddPost.created);
    // const currentTime = data.toLocaleDateString("ru", {
    //   day: "2-digit",
    //   month: "2-digit",
    //   year: "numeric",
    // });
    // console.log(rawAddPost.created);

    // const li = document.createElement("li");
    // // Add class
    // li.className = `flex flex-col justify-between p-6 bg-slate-100 space-y-8 rounded-lg`;

    // //Add id

    // console.log(rawAddPost.id);

    // li.setAttribute("id", `${rawAddPost.id}`);

    // li.innerHTML = `<div class="flex justify-between items-center">
    //           <h2 class="text-2xl">${rawAddPost.title}</h2>
    //           <div class="flex items-center space-x-3">
    //             <button
    //               class="px-7 py-2 bg-blue-400 rounded-2xl text-white hover:bg-blue-300 active:bg-blue-700 hover:shadow-lg hover:shadow-slate-500 transition-all duration-200 active:translate-y-0.5"
    //             >
    //               Edit
    //             </button>
    //             <button
    //               class="px-4 py-2 bg-blue-400 rounded-2xl text-white hover:bg-blue-300 active:bg-blue-700 hover:shadow-lg hover:shadow-slate-500 transition-all duration-200 active:translate-y-0.5"
    //             >
    //               Delete
    //             </button>
    //           </div>
    //         </div>

    //         <div>
    //          ${rawAddPost.body}
    //         </div>
    //         <!-- Likes and Date -->
    //         <div class="flex justify-between items-center">
    //           <div class="relative">
    //             <p class="ml-8">${rawAddPost.likes}</p>
    //             <div
    //               class="h-6 w-6 absolute top-0.5 -left-0 hover:scale-125 rounded-2xl hover:bg-pink-500 transition-all active:translate-y-1 hover:shadow-lg hover:shadow-slate-500 duration-300"
    //             >
    //               <img src="../img/like.svg" style="fill: white" alt="" />
    //             </div>
    //           </div>
    //           <div>${currentTime}</div>
    //         </div>`;

    // const theFirstChild = postList.firstChild;

    // postList.insertBefore(li, theFirstChild);

    postList.innerHTML = "";
    uploadPosts();
    closeAddModal();
  }
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

  const btnDelete = document
    .querySelectorAll(".delete-button")
    .forEach((el) => el.addEventListener("click", deletePost));

  // const btnEdit = document
  //   .querySelectorAll(".edit-button")
  //   .forEach((el) => el.addEventListener("click", editPostToServer));

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
  );

  editForm.addEventListener("submit", editPostToServer);

  // btnDelete.addEventListener("click", deletePost);
  // btnEdit.addEventListener("click", editPost);
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
              <button 
                class="delete-button px-4 py-2 bg-blue-400 rounded-2xl text-white hover:bg-blue-300 active:bg-blue-700 hover:shadow-lg hover:shadow-slate-500 transition-all duration-200 active:translate-y-0.5"
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
  const likes = parentDiv.querySelector(".likes").textContent;
  const body = parentDiv.querySelector(".body").value;
  const title = parentDiv.querySelector(".title").value;

  let totalLikes = Number(likes) + 1;

  console.log(body);

  await fetch(
    `https://pocketbase.sksoldev.com/api/collections/blog/records/${parentDiv.id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        likes: totalLikes,
        body: body,
        title: title,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  postList.innerHTML = "";
  await uploadPosts();
  document.getElementById(`${parentDiv.id}`).scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
    behavior: "smooth",
  });
}

async function editPostToServer(e) {
  e.preventDefault();
  const parentDiv = e.target.closest("#edit-form");

  console.log(parentDiv);

  const title = parentDiv.querySelector(".edit-title-content").value;
  const body = parentDiv.querySelector(".edit-post-content").value;
  const id = `${editForm.dataset.id}`;
  console.log(id);
  console.log(body);
  console.log(title);

  await fetch(
    `https://pocketbase.sksoldev.com/api/collections/blog/records/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        body: body,
        title: title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  postList.innerHTML = "";
  await uploadPosts();
  closeEditModal();
  document.getElementById(`${id}`).scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
    behavior: "smooth",
  });
}

async function deletePost(e) {
  const parentDiv = e.target.closest(".post");

  await fetch(
    `https://pocketbase.sksoldev.com/api/collections/blog/records/${parentDiv.id}`,
    {
      method: "DELETE",
    }
  );
  postList.innerHTML = "";
  uploadPosts();
}
