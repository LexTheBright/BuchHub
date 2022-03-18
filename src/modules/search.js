import { renderBooks } from "./renderBooks";

export const search = function () {
  const searchInput = document.querySelector('.search-input')
  const goodsContainer = document.querySelector('.long-goods-list')
  //const inputButton = document.getElementById('button-addon2');
  const inputButton = document.querySelector('.search-block > button')
  let inText

  // var dict = {
  //     Фантастика : "Fiction",
  //     Поэзия : "Poetry",
  //     Искусство : "Art",
  //     История : "History",
  //     Религия : "Religion",
  //     Наука : "Science",
  //     Криминал : "Crime",
  //     Литература : "Literature"
  //   }

  // var langs = {
  //   ru : 'Русский',
  //   en : 'Английский'
  // }

  // const getKeyByValue = (object, value) => {
  //   return Object.keys(object).find(key => object[key] == value);
  // }

  // const getButtonContent = (good, keyword) => {
  //   if (keyword == 'epub') {
  //     return `
  //     <button type="button" onclick="window.open('${good.accessInfo.epub.downloadLink}','popUpWindow','width=700,height=500,menubar=no');" class="btn-fb2 btn-long" data-id="012">
  //       <span>Скачать ${keyword}</span>
  //     </button>`
  //   }
  //   if (keyword == 'pdf') {
  //     return `
  //     <button type="button" onclick="window.open('${good.accessInfo.pdf.downloadLink}','popUpWindow','width=700,height=500,menubar=no');" class="btn-fb2 btn-long" data-id="012">
  //       <span>Скачать ${keyword}</span>
  //     </button>`
  //   }
  //   else {
  //     return `
  //     <button type="button" onclick="window.open('${good.saleInfo.buyLink}','popUpWindow','width=1000,height=1000,menubar=no');" class="btn-fb2 btn-long" data-id="012">
  //       <span>Google Play</span>
  //     </button>`
  //   }
  // }

  // const renderBooks = (goods) => {
  //   const goodsContainer = document.querySelector('.long-goods-list')
  //   goodsContainer.innerHTML = ''

  //   goods.forEach((good) => {
  //     // console.log(getKeyByValue(dict, good.volumeInfo.categories)  + ' is key')
        
  //       const goodBlock = document.createElement('div')

  //       goodBlock.classList.add('col-xxl-3')
  //       goodBlock.classList.add('col-xl-4')
  //       goodBlock.classList.add('col-lg-6') 
  //       goodBlock.classList.add('mb-3')

  //       goodBlock.innerHTML = `
  //       <div class="books-card">
  //       <div class="books-place">
  //         <!-- <span class="label">New</span> -->
  //         <!-- /.label -->
  //         <!-- <div class="books-image-place"><img src="" alt="image: Hoodie" class="books-image"></div> -->
  //         <div class="cart-img-place">
  //           <img src="${good.volumeInfo.imageLinks.thumbnail}" alt="image: Hoodie" class="books-image">
  //         </div>
  //         <div class="cart-description">
  //             <h3 class="books-title">${good.volumeInfo.title}</h3>
  //           <!-- /.books-title -->
  //           <p class="books-author">${good.volumeInfo.authors ? good.volumeInfo.authors : 'Автор неизвестен'}</p>
  //           <p class="year">${good.volumeInfo.publishedDate ? good.volumeInfo.publishedDate + ' г.': 'Дата неизвестна' }</p>
  //           <p class="desc"><span class="desc-title">Жанры</span>
  //           <span class="desc-text">${getKeyByValue(dict, good.volumeInfo.categories) ? getKeyByValue(dict, good.volumeInfo.categories) : good.volumeInfo.categories ? good.volumeInfo.categories : '-'}</span></p>
  //           <p class="desc"><span class="desc-title">Язык оригинала</span>
  //           <span class="desc-text">${langs[good.volumeInfo.language] ? langs[good.volumeInfo.language] : good.volumeInfo.language ? good.volumeInfo.language : '-'}</span></p>
  //           <p class="desc"><span class="desc-title">Издатель</span>
  //           <span class="desc-text">${good.volumeInfo.publisher ? good.volumeInfo.publisher : '-' }</span></p>
  //           <!-- /.books-description -->
  //           <!-- /.books-price -->
  //           <table>
  //             <tr>
  //               <td>
  //                 <button type="button" onclick="window.open('${good.accessInfo.webReaderLink}','popUpWindow','width=700,height=1080,menubar=no');" class="btn-read btn-long" data-id="012">
  //                   <span>Читать онлайн</span>
  //                 </button>
  //               </td>
  //               <td rowspan="3">
  //                 <button class="btn-addC btn-short" data-id="012">
  //                   <img class="btn-icon" src="img/collection2.png" alt="icon: cart">
  //                 </button>
  //                 <button class="btn-addF btn-short" data-id="012">
  //                   <img class="btn-icon" src="img/collection.png" alt="icon: cart">
  //                 </button>
  //               </td>
  //             </tr>
  //             <tr>
  //               <td> 
  //                 ${good.accessInfo.epub.downloadLink ? getButtonContent(good, 'epub') : good.saleInfo.buyLink ? getButtonContent(good, 'sale') : null}
  //               </td>
  //             </tr>
  //             <tr>
  //               <td>
  //                 ${good.accessInfo.pdf.downloadLink ? getButtonContent(good, 'pdf') : good.saleInfo.buyLink ? getButtonContent(good, 'sale') : null}
  //               </td>
  //             </tr>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //     `
  //     goodsContainer.append(goodBlock)
  //   })

  //   console.dir(goods)
  // }

  const getData = (value) => {
    const cat_title = document.querySelector('.section-title')
    cat_title.innerHTML = '\'' + value + '\''

    fetch('https://www.googleapis.com/books/v1/volumes?q=' + value + '&filter=free-ebooks&printType=books&maxResults=40')
    .then((res) => res.json())
    .then((data) => {
      // const array = category ? data.filter((item) => item[category] == value) : data
      const array = data.items     
      array.map(book => book.isAddedToShelf = false)
      array.map(book => book.isAddedtoFav = false)
      if (window.location.pathname !== "/goods.html") window.location.href = '/goods.html'
      else if (array) {
        localStorage.setItem('searched', JSON.stringify(array))
        renderBooks(array)
      } else {
        cat_title.innerHTML = `По запросу  '${value}'  ничего не найдено :(`
        goodsContainer.innerHTML = ''
      }
    })
    .catch(error => console.log(error.message))
  }

  try {
   inputButton.addEventListener('click', () => {
     getData(searchInput.value)
   })
  } catch (e) {
    console.log(e.message)
  }  

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      getData(searchInput.value)
    }
  })
}