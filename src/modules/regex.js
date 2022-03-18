export const checkDouble = () => {
  const nickField = document.getElementById('LG')
  const passFieldOne = document.getElementById('PW')
  const passFieldTwo = document.getElementById('PW2')

  passFieldTwo.addEventListener('input', () => {
    if (passFieldOne.value !== passFieldTwo.value) {
      passFieldTwo.setCustomValidity('Пароли не совпадают!')
    } else {
      passFieldTwo.setCustomValidity('')
    }
  })
}