const reg = () => {
  
  const cartButton = document.querySelector('.button-cart')
  const cartModal = document.getElementById('reg')
  const mailInput = document.getElementById('EM')
  const passInput = document.getElementById('PW')
  const modalForm = document.getElementById('regis_form')
  
  cartButton.addEventListener('click', () => {
    cartModal.style.display = 'flex'
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cartModal.style.display = 'none' 
    }
  })

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    email = mailInput.value
    password = passInput.value
    firebase.auth().createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user
      console.dir(userCredential.user)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(error.message)
    })
  })
}

reg()