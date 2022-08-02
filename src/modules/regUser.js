import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { createUserInDB } from "./dbOperations";

export const reg = () => {

  const cartButton = document.getElementById('showRegForm')
  const authModal = document.getElementById('auth')
  const regModal = document.getElementById('reg')
  const messageModal = document.getElementById("messagee")
  const nicknameInput = document.getElementById('LG')
  const mailInput = document.getElementById('EM')
  const passInput = document.getElementById('PW')
  const modalForm = document.getElementById('regis_form')
  const setD = document.getElementById('setD')
  const showAuth = document.getElementById('showAuthForm')

  regModal.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.modal') && e.target.classList.contains('overlay')) {
      regModal.style.display = ''
    }
  })
  
  cartButton.addEventListener('click', () => {
    authModal.style.display = ''
    regModal.style.display = 'flex'
  })

  showAuth.addEventListener('click', () => {
    authModal.style.display = 'flex'
    regModal.style.display = ''
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      regModal.style.display = '' 
      messageModal.style.display = '' 
    }
  })

  modalForm.addEventListener('submit', (e) => {
  console.dir(e.target)
    e.preventDefault()
    let nickname = nicknameInput.value
    let email = mailInput.value
    let password = passInput.value

    var auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      createUserInDB(nickname, email, userCredential.user.uid)
    })
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: nickname
      })
      showMessage('Вы успешно зарегистрированы!')
      document.getElementById('nick-place').innerText = nickname
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(errorMessage)
      showMessage('Ошибка! Такая почта уже зарегистрирована в системе! ' + errorMessage)
    })
  })

  const showMessage = (message) => {
    regModal.style.display = ''
    messageModal.innerHTML = `
    <div class="modal" id="messForm">${message}</div>
    `
    messageModal.style.display = 'flex'
  }

  messageModal.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.modal') && e.target.classList.contains('overlay')) {
      regModal.style.display = ''
    }
  })
}
