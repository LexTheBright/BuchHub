import { getUserBooksFromServer } from "./dbOperations"
import { togleAllBooksButtons } from "./authUser"

var dict = {
  Фантастика : "Fiction",
  Поэзия : "Poetry",
  Искусство : "Art",
  История : "History",
  Религия : "Religion",
  Наука : "Science",
  Криминал : "Crime",
  Литература : "Literature",
  Коллекция: "userBookshelf",
  Избранное: "userFavorites"
}

var langs = {
  ru : 'Русский',
  en : 'Английский'
}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] == value);
}

const getButtonContent = (book, keyword) => {
  if (keyword == 'epub') {
    return `
    <button type="button" onclick="window.open('${book.accessInfo.epub.downloadLink}','popUpWindow','width=700,height=500,menubar=no');" class="btn-fb2 btn-long">
      <span>Скачать ${keyword}</span>
    </button>`
  }
  if (keyword == 'pdf') {
    return `
    <button type="button" onclick="window.open('${book.accessInfo.pdf.downloadLink}','popUpWindow','width=700,height=500,menubar=no');" class="btn-fb2 btn-long">
      <span>Скачать ${keyword}</span>
    </button>`
  }
  else {
    return `
    <button type="button" onclick="window.open('${book.saleInfo.buyLink}','popUpWindow','width=1000,height=1000,menubar=no');" class="btn-fb2 btn-long">
      <span>Google Play</span>
    </button>`
  }
}
  
export const renderBooks = async (books) => {
  const goodsContainer = document.querySelector('.long-goods-list')
  
  goodsContainer.innerHTML = ''
  if (books) {
    const curTitle = document.querySelector('.section-title')
    var curCategory
    if (dict[curTitle.innerText] != undefined) curCategory = dict[curTitle.innerText]
    else curCategory = 'searched'
    localStorage.setItem('lastCategory', curCategory)

    // if (sessionStorage.getItem('isUserLoged') == "true") {
    if (curCategory == 'userBookshelf') {
      await getUserBooksFromServer('userBookshelf').then(res => {
        if (res) {
          localStorage.setItem('userBookshelf', JSON.stringify(res))
          books = res
        }
      })
    }
    if (curCategory == 'userFavorites') {
      await getUserBooksFromServer('userFavorites').then(res => {
        if (res) {
          localStorage.setItem('userFavorites', JSON.stringify(res))
          books = res
        }
      })
    }

    books.forEach((book) => {
      //if ()
      // console.log(getKeyByValue(dict, book.volumeInfo.categories)  + ' is key')
      // var curCategory
      // const isUndef = dict[document.querySelector('.section-title').innerText]
      // if (isUndef != undefined) curCategory = dict[document.querySelector('.section-title').innerText]
      // else curCategory = 'searched'
      
      const bookBlock = document.createElement('div')

      bookBlock.classList.add('col-xxl-3')
      bookBlock.classList.add('col-xl-4')
      bookBlock.classList.add('col-lg-6') 
      bookBlock.classList.add('mb-3')

      bookBlock.innerHTML = `
      <div class="books-card">
      <div class="books-place">
        <!-- <span class="label">New</span> -->
        <!-- /.label -->
        <!-- <div class="books-image-place"><img src="" alt="image: Hoodie" class="books-image"></div> -->
        <div class="cart-img-place">
          <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="image: Hoodie" class="books-image">
        </div>
        <div class="cart-description">
            <h3 class="books-title">${book.volumeInfo.title}</h3>
          <!-- /.books-title -->
          <p class="books-author">${book.volumeInfo.authors ? book.volumeInfo.authors : 'Автор неизвестен'}</p>
          <p class="year">${book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate + ' г.': 'Дата неизвестна' }</p>
          <p class="desc"><span class="desc-title">Жанры</span>
          <span class="desc-text">${getKeyByValue(dict, book.volumeInfo.categories) ? getKeyByValue(dict, book.volumeInfo.categories) : book.volumeInfo.categories ? book.volumeInfo.categories : '-'}</span></p>
          <p class="desc"><span class="desc-title">Язык оригинала</span>
          <span class="desc-text">${langs[book.volumeInfo.language] ? langs[book.volumeInfo.language] : book.volumeInfo.language ? book.volumeInfo.language : '-'}</span></p>
          <p class="desc"><span class="desc-title">Издатель</span>
          <span class="desc-text">${book.volumeInfo.publisher ? book.volumeInfo.publisher : '-' }</span></p>
          <!-- /.books-description -->
          <!-- /.books-price -->
          <table>
            <tr>
              <td>
                <button type="button" onclick="window.open('${book.accessInfo.webReaderLink}','popUpWindow','width=700,height=1080,menubar=no');" class="btn-read btn-long" data-id="012">
                  <span>Читать онлайн</span>
                </button>
              </td>
              <td rowspan="3">
                <button class="btn-addC btn-short" id="${book.id}" data-id="${book.id}" data-category="${curCategory}" data-isadded="false">
                  <img class="btn-icon bsh-icon" src="img/collection2.png" alt="icon: bookshelf">
                </button>
                <button class="btn-addF btn-short" id="${book.id}" data-id="${book.id}" data-category="${curCategory}" data-isadded="false"">
                  <img class="btn-icon fav-icon" src="img/minilove.png" alt="icon: favorive">
                </button>
              </td>
            </tr>
            <tr>
              <td> 
                ${book.accessInfo.epub.downloadLink ? getButtonContent(book, 'epub') : book.saleInfo.buyLink ? getButtonContent(book, 'sale') : null}
              </td>
            </tr>
            <tr>
              <td>
                ${book.accessInfo.pdf.downloadLink ? getButtonContent(book, 'pdf') : book.saleInfo.buyLink ? getButtonContent(book, 'sale') : null}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    `
      goodsContainer.append(bookBlock) 
    })
  }
  if (sessionStorage.getItem('isUserLoged') == "true") togleAllBooksButtons()
}

