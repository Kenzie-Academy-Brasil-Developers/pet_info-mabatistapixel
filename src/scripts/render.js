import { getCurrentUserInfo, getAllPosts } from "./requests.js";

export async function renderAllPosts() {
  const postSection = document.querySelector(".posts");
  postSection.innerHTML = "";
  const posts = await getAllPosts();

  posts.forEach(async (post) => {
    const postArticle = await renderPost(post, true);
    postSection.appendChild(postArticle);
  });
}

export async function renderPost(post) {
  const currentUserImg = document.querySelector(".user__image")
  const currentUser = await getCurrentUserInfo();
  currentUserImg.src = currentUser.avatar;

  const postContainer = document.createElement("article");
  postContainer.classList.add("post");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post__title", "text1", "bolder");
  postTitle.innerText = post.title;

  const postContent = document.createElement("p");
  postContent.classList.add("post__content", "text3");

  const postHeader = await renderPostHeader(post);

  postContent.classList.add("post__content--feed", "text3");
  postContent.innerText = post.content;

  const openButton = document.createElement("a");
  openButton.classList.add("post__open", "text3", "bold");
  openButton.innerText = "Acessar publicação";
  openButton.dataset.id = post.id;

  postContainer.append(postHeader, postTitle, postContent, openButton);

  return postContainer;
}

async function checkEditPermission(authorID) {
  const { id } = await getCurrentUserInfo();

  if (Object.values({ id }, [0]).toString() == authorID) {
    return true;
  } else {
    return false;
  }
}

async function renderPostHeader(post) {
  const userInfo = post.user;

  const currentUser = await getCurrentUserInfo();
  const uniqueName = document.querySelector(".user__uniquename")
  uniqueName.innerHTML = `@${currentUser.username}`;

  const postDateInfo = handleDate(post.createdAt);

  const postHeader = document.createElement("header");
  postHeader.classList.add("post__header");

  const postInfo = document.createElement("div");
  postInfo.classList.add("post__info");

  const authorImage = document.createElement("img");
  authorImage.classList.add("post__author-image");
  authorImage.src = userInfo.avatar;

  const authorName = document.createElement("h2");
  authorName.classList.add("post__author-name", "text4", "bolder");
  authorName.innerText = userInfo.username;

  const divisor = document.createElement("small");
  divisor.innerText = "|";
  divisor.classList.add("post__date", "text4");

  const postDate = document.createElement("small");
  postDate.classList.add("post__date", "text4");
  postDate.innerText = postDateInfo;

  postInfo.append(authorImage, authorName, divisor, postDate);

  postHeader.appendChild(postInfo);

  const editable = await checkEditPermission(userInfo.id);

  if (editable) {
    const postActions = renderPostActions(post.id);
    postHeader.appendChild(postActions);
  }

  return postHeader;
}

function renderPostActions(postID) {
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("post__actions");

  const editButton = document.createElement("button");
  editButton.classList.add(
    "post__button--edit",
    "btn",
    "btn--gray",
    "btn--small",
    "text4"
  );
  editButton.dataset.id = postID;
  editButton.innerText = "Editar";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add(
    "post__button--delete",
    "btn",
    "btn--gray",
    "btn--small",
    "text4"
  );
  deleteButton.dataset.id = postID;
  deleteButton.innerText = "Excluir";

  actionsContainer.append(editButton, deleteButton);

  return actionsContainer;
}

function handleDate(timeStamp) {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const date = new Date(timeStamp);
  const month = months.at(date.getMonth());
  const year = date.getFullYear();

  return `${month} de ${year}`;
}


export const renderModal = async (post) => {
  const div = document.querySelector("#myPost")

  const infoHeader = document.createElement("header")
  infoHeader.classList.add("post__header")

  const img = document.createElement("img")
  img.classList.add("post__author-image")
  img.src = post.user.avatar


  const name = document.createElement("h2")
  name.classList.add("post__author-name", "text4", "bolder")
  name.innerHTML = post.user.username
  name.id = 'nameId';

  const dateInfo = await handleDate(post.created_at)

  const date = document.createElement("small")
  date.classList.add("post__date")
  date.innerHTML = dateInfo;

  const postTitle = document.createElement("h2")
  postTitle.classList.add('post__title', 'text1', 'bolder')
  postTitle.innerHTML = post.title

  const postContent = document.createElement("p")
  postContent.classList.add("post__content", "text3")
  postContent.innerHTML = post.content;
  postContent.id = "openPost"

  infoHeader.append(img, name, date)
  div.append(infoHeader, postTitle, postContent)

}
