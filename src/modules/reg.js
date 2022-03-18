import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { createUserInDB } from "./dbOperations";

export const reg = () => {

  const cartButton = document.getElementById('showRegForm')
  const authModal = document.getElementById('auth')
  const regModal = document.getElementById('reg')
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
      // Signed in 
      const user = userCredential.user
      console.dir(userCredential.user)
      createUserInDB(nickname, email, user.uid)
    })
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: nickname
      })
      //window.location.reload()
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(errorMessage)
    })
  })

  // setD.addEventListener('click', (e) => {
  //   e.preventDefault()
  //    let auth = getAuth()
  //    console.dir(auth)
  //   createUser('Lox Ebat', 'mailInput.value')
  // })
}