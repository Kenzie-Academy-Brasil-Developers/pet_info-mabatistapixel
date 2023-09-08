import { toast } from "./toast.js";
const baseUrl = "http://localhost:3333";
const token = localStorage.getItem("@petinfo:token");

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();
  return user;
}

export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  })
  const posts = await request.json();
  return posts;

}

export const loginRequest = async (requestBody) => {
  const wrongEmailMessage = document.querySelector("#wrong-email")
  const wrongPasswordMessage = document.querySelector("#wrong-password")

  const loginToken = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(async (res) => {
      const resConvert = await res.json()

      if (res.ok) {
        localStorage.setItem("@petinfo:token", resConvert.token)

        toast('Login realizado com sucesso', '#9985FE')
        setTimeout(() => {
          location.assign("src/pages/feed.html")
        }, 2000)

        return resConvert
      } else {
        throw new Error(resConvert.message)
      }
    })
    .catch(error => {
      if (error.message === 'O email está incorreto') {
        wrongEmailMessage.innerHTML = 'Email incorreto';
        wrongEmailMessage.classList.remove('hidden')
        wrongEmailMessage.classList.add('show')

      } else if (error.message === 'A senha está incorreta') {
        wrongPasswordMessage.innerHTML = 'Senha incorreta';
        wrongPasswordMessage.classList.remove('hidden')
        wrongPasswordMessage.classList.add('show')
      } else {
        console.error('Erro:', error.message);
      }
    })
  return loginToken
}

export const userRegister = async (requestBody) => {

  const register = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify(requestBody)
  })
    .then(async (res) => {
      const resConvert = await res.json()

      if (res.ok) {
        toast('Usuário cadastrado com sucesso', '#9985FE')
        setTimeout(() => {
          location.replace("/index.html")

        }, 2000)
      } else {
        toast(resConvert.message, '#9985FE')
      }
    })
  return register
}

export const handlePublication = async (postBody) => {

  const post = await fetch(`${baseUrl}/posts/create`, {
    method: 'POST',
    headers:requestHeaders,
    body: JSON.stringify(postBody)
  })
  .then(async (res) => {
    const resConvert = await res.json()
    
    if(res.ok){
      toast('Post criado com sucesso', '#9985FE')
    }else {
      toast(resConvert.message, '#ef1c1c')
    }
    return resConvert
  })
return post
}

export const getCurrentPost = async (postId) => {
  const currentPost = await fetch(`${baseUrl}/posts/${postId}`, {
    method: 'GET',
    headers: requestHeaders,
  })
  .then((res) => {
    const resConvert = res.json()
    if(res.ok){
      return resConvert
    }
  })
  .catch((err) => console.error("Error:", err) )

  return currentPost
}