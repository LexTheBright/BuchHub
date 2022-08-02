export const checkDouble = () => {
  const nickField = document.getElementById('LG')
  const mailField = document.getElementById('EM')
  const passFieldOne = document.getElementById('PW')
  const passFieldTwo = document.getElementById('PW2')
  const mailFieldLg = document.getElementById('LGE')
  const passFieldOLg = document.getElementById('LGP')

  passFieldTwo.addEventListener('input', () => {
    if (passFieldOne.value !== passFieldTwo.value) {
      passFieldTwo.setCustomValidity('Пароли не совпадают!')
      passFieldTwo.reportValidity()
    } else {
      passFieldTwo.setCustomValidity('')
    }
  })
  

  nickField.addEventListener('input', (e) => {
    if (e.target.validity.patternMismatch) {
      nickField.setCustomValidity('Никнейм должен содержать от 3 до 12 символов. Только буквы и цифры.') //
    }
    else {
       nickField.setCustomValidity('') //
    }
  })

  mailField.addEventListener('input', (e) => {
    if (e.target.validity.patternMismatch) {
      mailField.setCustomValidity('Неверный формат почты.') //
    }
    else {
       mailField.setCustomValidity('') //
    }
  })

  mailFieldLg.addEventListener('input', (e) => {
    if (e.target.validity.patternMismatch) {
      mailFieldLg.setCustomValidity('Неверный формат почты.') //
    }
    else {
       mailFieldLg.setCustomValidity('') //
    }
  })

  passFieldOne.addEventListener('input', (e) => {
    if (e.target.validity.patternMismatch) {
      passFieldOne.setCustomValidity('Пароль должен содержать от 8 до 20 символов. Только буквы и цифры') //
    }
    else {
       passFieldOne.setCustomValidity('') //
    }
  })

  passFieldOLg.addEventListener('input', (e) => {
    if (e.target.validity.patternMismatch) {
      passFieldOLg.setCustomValidity('Пароль должен содержать от 8 до 20 символов. Только буквы и цифры') //
    }
    else {
       passFieldOLg.setCustomValidity('') //
    }
  })

}