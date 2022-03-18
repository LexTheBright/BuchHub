const search = function () {
  const input = document.querySelector('.form-control')
  //const inputButton = document.getElementById('button-addon2');
  const inputButton = document.querySelector('.search-block > button')
  let inText

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector('.long-goods-list')
    goodsContainer.innerHTML = ''

    goods.forEach((good) => {
      const goodBlock = document.createElement('div')
      goodBlock.classList.add('col-lg-3')
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

  const getData = (value) => {
    fetch('https://test1-ae33d-default-rtdb.europe-west1.firebasedatabase.app/db.json')
    .then((res) => res.json())
    .then((data) => {
      const array = data.filter(good => good.name.toLowerCase().includes(value.toLowerCase()) )
      localStorage.setItem('goods', JSON.stringify(array))
      if (window.location.pathname !== "/goods.html") window.location.href = '/goods.html'
      else renderGoods(array)
    })
  }

  try {
    input.addEventListener('input', (event) => {
      //console.log(event.target.value)
      inText = event.target.value
    })

   inputButton.addEventListener('click', () => {
     getData(inText)
   })
  } catch (e) {
    console.dir(e)
  }  
}

search()