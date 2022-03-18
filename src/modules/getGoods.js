export const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link')

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector('.long-goods-list')
    goodsContainer.innerHTML = ''

    goods.forEach((good) => {
      const goodBlock = document.createElement('div')
      goodBlock.classList.add('col-xxl-3')
      goodBlock.classList.add('col-xl-4')
      goodBlock.classList.add('col-lg-6')
      goodBlock.classList.add('mb-3')
      // goodBlock.classList.add('col-sm-6')
      // goodBlock.innerHTML = `
      //     <div class="goods-card">
			// 			<span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
			// 			<!-- /.label --><img src="db/${good.img}" alt="${good.name}" class="goods-image">
			// 			<h3 class="goods-title">${good.name}</h3> 
			// 			<!-- /.goods-title -->
			// 			<p class="goods-description">${good.description}</p>
			// 			<!-- /.goods-description -->
			// 			<!-- /.goods-price -->
			// 			<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
			// 				<span class="button-price">$${good.price}</span>
			// 			</button>
			// 		</div>
      //   `
      goodBlock.innerHTML = `
      <div class="books-card">
      <div class="books-place">
        <!-- <span class="label">New</span> -->
        <!-- /.label -->
        <!-- <div class="books-image-place"><img src="img/image-119.jpg" alt="image: Hoodie" class="books-image"></div> -->
        <div class="cart-img-place">
          <img src="img/image-119.jpg" alt="image: Hoodie" class="books-image">
        </div>
        <div class="cart-description">
            <h3 class="books-title">Фантастический мир с обращённым в красавицу мужчиной и…</h3>
          <!-- /.books-title -->
          <p class="books-author">Николай Васильевич Гоголь</p>
          <p class="year">1959 г.</p>
          <p class="desc"><span class="desc-title">Жанры</span>
          <span class="desc-text">Роман, Сатира, Пикареска, Прикол, Попаданцы</span></p>
          <p class="desc"><span class="desc-title">Язык оригинала</span>
          <span class="desc-text">Азербайджан</span></p>
          <p class="desc"><span class="desc-title">Издатель</span>
          <span class="desc-text">The Planet</span></p>
          <!-- /.books-description -->
          <!-- /.books-price -->
          <table>
            <tr>
              <td>
                <button class="btn-read btn-long" data-id="012">
                  <span>Читать онлайн</span>
                </button>
              </td>
              <td rowspan="3">
                <button class="btn-addC btn-short" data-id="012">
                  <img class="btn-icon" src="img/collection2.png" alt="icon: cart">
                </button>
                <button class="btn-addF btn-short" data-id="012">
                  <img class="btn-icon" src="img/collection.png" alt="icon: cart">
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button class="btn-fb2 btn-long" data-id="012">
                  <span>Скачать fb2</span>
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button class="btn-pdf btn-long" data-id="012">
                  <span>Скачать pdf</span>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    `
      goodsContainer.append(goodBlock)
    })

    console.dir(goods)
  }

  const getData = (value, category) => {
    fetch('https://test1-ae33d-default-rtdb.europe-west1.firebasedatabase.app/db.json')
    .then((res) => res.json())
    .then((data) => {
      console.dir(data)
      const array = category ? data.filter((item) => item[category] == value) : data
      localStorage.setItem('goods', JSON.stringify(array))
      if (window.location.pathname !== "/goods.html") window.location.href = '/goods.html'
      else renderGoods(array)
    })
  }

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        getData(link.textContent, link.dataset.field)
        // getData(link.textContent, 'All')
      })
    }) 

    if (localStorage.getItem('goods') && window.location.pathname === "/goods.html") {
      renderGoods(JSON.parse(localStorage.getItem('goods')))
    }
    // if (typeof window.localStorage.getItem('')) console.dir('kek')

    //работает только в index
    const moreButton = document.querySelector('.more')
    if (moreButton) {
      moreButton.addEventListener('click', (e) => {
      e.preventDefault()
      getData()
      })
    }
}

// const testingLocalStore = () => {
//   localStorage.setItem('kek', JSON.stringify([1,2,3,4,5]))
//   console.dir(JSON.parse(localStorage.getItem('kek')))
// }

// testingLocalStore()