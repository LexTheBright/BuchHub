const getGoods = () => {
  const links = document.querySelectorAll('.navigation-link')

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector('.long-goods-list')
    goodsContainer.innerHTML = ''

    goods.forEach((good) => {
      const goodBlock = document.createElement('div')
      goodBlock.classList.add('col-lg-4')
      goodBlock.classList.add('col-sm-6')
      goodBlock.innerHTML = `
          <div class="goods-card">
						<span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
						<!-- /.label --><img src="db/${good.img}" alt="${good.name}" class="goods-image">
						<h3 class="goods-title">${good.name}</h3> 
						<!-- /.goods-title -->
						<p class="goods-description">${good.description}</p>
						<!-- /.goods-description -->
						<!-- /.goods-price -->
						<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
							<span class="button-price">$${good.price}</span>
						</button>
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
      })
    }) 

    if (localStorage.getItem('goods') && window.location.pathname === "/goods.html") renderGoods(JSON.parse(localStorage.getItem('goods')))

    //работает только в index
    const moreButton = document.querySelector('.more')
    if (moreButton) {
      moreButton.addEventListener('click', (e) => {
      e.preventDefault()
      getData()
      })
    }
}

getGoods()

// const testingLocalStore = () => {
//   localStorage.setItem('kek', JSON.stringify([1,2,3,4,5]))
//   console.dir(JSON.parse(localStorage.getItem('kek')))
// }

// testingLocalStore()