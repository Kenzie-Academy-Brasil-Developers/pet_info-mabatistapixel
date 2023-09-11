import { renderAllPosts, renderModal } from "./render.js";
import { handlePublication, getCurrentPost } from "./requests.js"

function showUserMenu() {
  const userAction = document.querySelector(".user__image");
  const menu = document.querySelector(".user__logout");

  userAction.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
  });
}

function main() {
  showUserMenu();
  renderAllPosts();
}

const handleModal = () => {
  const modal = document.querySelector("#myModal")
  const openModalBtn = document.querySelector("#user__newpost")
  const closeModalBtn = document.querySelector("#closeModalBtn")
  const cancelBtn = document.querySelector(".modal_cancel__button")
  const input = document.querySelector(".modal__input")
  const textarea = document.querySelector(".post__content")

  openModalBtn.addEventListener("click", () => {
    modal.showModal();

    cancelBtn.addEventListener("click", () => {
      input.value = '';
      textarea.value = '';
      modal.close()
    })

    closeModalBtn.addEventListener('click', () => {
      input.value = '';
      textarea.value = '';
      modal.close();

    })
    window.addEventListener("click", (event) => {
      if(event.target === modal){
        modal.close()
      }
    })
  })
}

const handleImage = async () => {
  const divLogout = document.querySelector(".user__logout")
  const imgBtn = document.querySelector(".user__image")
  const logoutBtn = document.querySelector(".logout__button")

  imgBtn.addEventListener("click", () => {
    divLogout.classList.toggle("remove")

    logoutBtn.addEventListener("click", () => {
      localStorage.clear()
      location.replace("/index.html")
    })
  })

}

const handlePublish =  () => {
  const modal = document.querySelector("#myModal")
  const input = document.querySelector(".modal__input");
  const post = document.querySelector(".post__content");
  const publishBtn = document.querySelector(".modal_submit__button");


  publishBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const newPost = {};

    newPost.title = input.value;
    newPost.content = post.value;

    handlePublication(newPost)
    modal.close();

    renderAllPosts()

    input.value = '';
    post.value = '';
    location.reload()
  })

}

const handleOpenButton = async () => {
  const modal = document.querySelector(".modal__post_expanse")
  const openBtn =  document.querySelectorAll("a")
  const div = document.querySelector("#myPost")
  
  openBtn.forEach((button) => {
    button.addEventListener("click", (event) => {
      div.innerHTML = '';
      const postId = event.target.dataset.id;

      const post =  getCurrentPost(postId)
      .then((res) => {
        
        renderModal(res)
        
        modal.showModal()
      })

    })
  })
}

const handleCloseButton = () => {
  const modal = document.querySelector(".modal__post_expanse")
  const closeBtn = document.querySelector("#closePostBtn")

  closeBtn.addEventListener("click", () => {
    modal.close()
  })
}

const closeModalBackdrop = () => {
  const modal = document.querySelector(".modal__post_expanse")

  window.addEventListener("click", (event) => {
    if(event.target === modal) {
      modal.close()
    }
  }
)}




main()
handleModal()
handleImage()
handlePublish()
setTimeout(handleOpenButton, 1000)
handleCloseButton()
closeModalBackdrop()

