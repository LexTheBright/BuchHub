const cart = () => {
  const cartModal = document.getElementById('modal-cart')
  const cartButton = document.querySelector('.button-cart')
  const cartClose = document.querySelector('.modal-close')
  const goodsContainer = document.querySelector('.long-goods-list')
  const cartTable = document.querySelector('.cart-table__goods')
  const modalForm = document.querySelector('.modal-form')
  const modalInputName = document.getElementsByName('nameCustomer')
  const modalInputPhone = document.getElementsByName('phoneCustomer')

  cartButton.addEventListener('click', () => {
    renderCartGoods()
    cartModal.style.display = 'flex'
  })

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const newCart = cart.filter(good => {
      return good.id !== id
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods()
  }

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    cart.map(good => {
      if (good.id === id) good.count++
      return good
    })

    localStorage.setItem('cart', JSON.stringify(cart))
    renderCartGoods()
  }

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    cart.map(good => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--
          return good
        }
      }
    })

    localStorage.setItem('cart', JSON.stringify(cart))
    renderCartGoods()
  }

  const renderCartGoods = () => {
    const cart = localStorage.getItem('cart') ? 
      JSON.parse(localStorage.getItem('cart')) : []
    cartTable.innerHTML = ''
    cart.forEach(good => {
      const newRow = document.createElement('tr')
      newRow.innerHTML = `
      <tr>
        <td>${good.name}</td>
        <td>${good.price}$</td>
        <td><button class="cart-btn-minus" "="">-</button></td>
        <td>${good.count}</td>
        <td><button class="cart-btn-plus" "="">+</button></td>
        <td>${good.price * good.count}$</td>
        <td><button class="cart-btn-delete" "="">x</button></td>
      </tr>
      `
      cartTable.append(newRow)

      newRow.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-btn-minus')) {
          minusCartItem(good.id)
        }
        else if (e.target.classList.contains('cart-btn-plus')) {
          plusCartItem(good.id)
        }
        else if (e.target.classList.contains('cart-btn-delete')) {
          deleteCartItem(good.id)
        }
      })
    })
  }

  cartClose.addEventListener('click', () => {
    cartModal.style.display = 'none' 
  })

  cartModal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal') && e.target.classList.contains('overlay')) {
      cartModal.style.display = 'none' 
    }
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cartModal.style.display = 'none' 
    }
  })

  const sendForm = () => {
    const cartArr = localStorage.getItem('cart') ? 
      JSON.parse(localStorage.getItem('cart')) : []

    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        cart: cartArr,
        name: modalInputName[0].value,
        phone: modalInputPhone[0].value
      })
    }).then(() => {
      cartModal.style.display = 'none' 
    })
  }

  

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendForm().then(data => console.log(data)).catch(err => console.log(err))
  })

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods'))
    const clickedGoods = goods.find(good => good.id == id)
    const cart = localStorage.getItem('cart') ? 
      JSON.parse(localStorage.getItem('cart')) : []

    if (cart.some(good => good.id === clickedGoods.id)) {
      //перебор массива с изменением его структуры
      cart.map(good => {
        if (good.id === clickedGoods.id) good.count++
        return good
      })
    } else {
      clickedGoods.count = 1
      cart.push(clickedGoods)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  if (goodsContainer) {
    goodsContainer.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart')) {
        const buttonCart = e.target.closest('.add-to-cart')
        const buttonId = buttonCart.dataset.id
        addToCart(buttonId)
      }
    })
  }

}

cart()