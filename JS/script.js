"use strict";

import g from "./script2.js";

g();

const d = new Date();
console.log(d);
let text = d.toLocaleString();

console.log(text);

const modalWindow = document.querySelector(".modal-window");
const btnClose = document.querySelector(".button-close");
const uploadPost = document.querySelector("#upload-post");
const addPost = document.querySelector(".add-post");
const overlay = document.querySelector(".overlay");
const postContent = document.querySelector("#post-content");
const titleContent = document.querySelector("#title-content");
const form = document.querySelector("#form");
const postList = document.querySelector(".post-list");
const btnDelete = document.querySelector(".delete-button");
const btnEdit = document.querySelector(".edit-button");

uploadPosts();

const closeModal = function () {
  modalWindow.classList.remove("active");
  overlay.classList.add("hidden");
};

addPost.addEventListener("click", () => {
  modalWindow.classList.toggle("active");
  overlay.classList.toggle("hidden");
});

btnClose.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalWindow.classList.contains("active")) {
    closeModal();
  }
});

form.addEventListener("submit", addPostToServer);

async function addPostToServer(e) {
  if (postContent.value === "") {
    alert("It seems that you forgot to add a post, bro");
  } else if (titleContent.value === "") {
    alert("It seems that you forgot to add a title, bro");
  } else {
    e.preventDefault();
    const response = await fetch(
      "https://pocketbase.sksoldev.com/api/collections/blog/records",
      {
        method: "POST",
        body: JSON.stringify({
          body: postContent.value,

          title: titleContent.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    titleContent.value = "";

    postContent.value = "";

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
    closeModal();
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
}

function template(item) {
  const data = new Date(item.created);

  function del(item) {
    return () => deletePost(item);
  }

  const currentTime = data.toLocaleDateString("ru", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const li = document.createElement("li");
  // Add class
  li.className = `flex flex-col justify-between p-6 bg-slate-100 space-y-8 rounded-lg`;

  //Add id

  li.setAttribute("id", `${item.id}`);

  li.innerHTML = `<div class="flex justify-between items-center">
            <h2 class="text-2xl">${item.title}</h2>
            <div class="flex items-center space-x-3">
              <button
                class="edit-button px-7 py-2 bg-blue-400 rounded-2xl text-white hover:bg-blue-300 active:bg-blue-700 hover:shadow-lg hover:shadow-slate-500 transition-all duration-200 active:translate-y-0.5"
              >
                Edit
              </button>
              <button onclick="del()"
                class="delete-button px-4 py-2 bg-blue-400 rounded-2xl text-white hover:bg-blue-300 active:bg-blue-700 hover:shadow-lg hover:shadow-slate-500 transition-all duration-200 active:translate-y-0.5"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div>
           ${item.body}
          </div>
          
          <div class="flex justify-between items-center div-likes">
            <button  class="relative " onclick=" ${() => g()}" >
              <p class="ml-8">${item.likes}</p>
              <div
                class="h-6 w-6 absolute top-0.5 -left-0 hover:scale-125 rounded-2xl hover:bg-pink-500 transition-all active:translate-y-1 hover:shadow-lg hover:shadow-slate-500 duration-300"
              >
                <img class="button-like"  id="${
                  item.id
                }" src="../img/like.svg" style="fill: white" alt="" />
              </div>
            </button>
            <div>${currentTime}</div>
          </div>`;

  // const theFirstChild = postList.firstChild;

  // postList.insertBefore(li, theFirstChild);

  postList.appendChild(li);
}

async function editLikeNumber(object) {
  console.log(object);
  await fetch(
    `https://pocketbase.sksoldev.com/api/collections/blog/records/${object.id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        likes: object.likes++,
        body: object.body,
        title: object.title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  console.log("------");
}

// async function editLikeNumber(e) {
//   const response = await fetch(
//     `https://pocketbase.sksoldev.com/api/collections/blog/records/${id}`,
//     {
//       method: "PATCH",
//       body: JSON.stringify({
//         body: taskInputCurrent.value,
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     }
//   );
//   const post = await response.json();

//   console.log(post);

//   currentTask.body = post.body;

//   let li = document.getElementById(`${id}`);

//   li.innerHTML = "";

//   li.innerHTML = ``;
// }

async function deletePost(id) {
  console.log("______");
  await fetch(
    `https://pocketbase.sksoldev.com/api/collections/blog/records/${id}`,
    {
      method: "DELETE",
    }
  );
}
