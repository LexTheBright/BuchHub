import { renderBooks } from "./renderBooks";
import { getUserCollectionFromServer } from "./dbOperations";

export const getBooks = () => {
  const links = document.querySelectorAll('.navigation-link')
  const goodsContainer = document.querySelector('.long-goods-list')

  var do_fetching = 1;
  var dict = {
      Фантастика : "Fiction",
      Поэзия : "Poetry",
      Искусство : "Art",
      История : "History",
      Религия : "Religion",
      Наука : "Science",
      Криминал : "Crime",
      Литература : "Literature"
    }
 
  /*
  https://www.googleapis.com/books/v1/volumes/volumeId
  https://www.googleapis.com/books/v1/volumes?q=
  &filter=free-ebook - бесплатные
  q=inauthor:flowers+intitle:what - в авторе\названии
  &printType=books - только книги
  subject:
  https://www.googleapis.com/books/v1/volumes?q=subject:fiction&filter=free-ebooks&printType=books&langRestrict=ru&maxResults=20 - фантастика
  */

  const getData = (value) => {
    const cat_title = document.querySelector('.section-title')
    cat_title.innerHTML = value
    
    value = dict[value]

    Object.keys(localStorage).forEach((category) => {
        if (value == category) {
          if (window.location.pathname !== "/goods.html") window.location.href = '/goods.html'
          renderBooks(JSON.parse(localStorage.getItem(category)))
          do_fetching = 0
        }
    })
    
    if (do_fetching) {
      fetch('https://www.googleapis.com/books/v1/volumes?q=subject:' + value + '&filter=free-ebooks&printType=books&langRestrict=ru&maxResults=20')
      .then((res) => res.json())
      .then((data) => {
        // const array = category ? data.filter((item) => item[category] == value) : data
        const array = data.items
        array.map(book => book.isAddedtoCol = false)
        array.map(book => book.isAddedtoFav = false)
        console.dir(data.totalItems)
        localStorage.setItem(value, JSON.stringify(array))
        if (window.location.pathname !== "/goods.html") window.location.href = '/goods.html'
        renderBooks(array)
      })
    }
    do_fetching = 1;
  }

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        getData(link.textContent)
      })
    }) 

    // if (localStorage.getItem('books') && window.location.pathname === "/goods.html") renderBooks(JSON.parse(localStorage.getItem('books')))
     if (localStorage.key(localStorage.length) && window.location.pathname === "/goods.html") renderBooks(JSON.parse(localStorage.key(localStorage.length)))
    //  if ( localStorage.forEach(category => category == dict.) && window.location.pathname === "/goods.html") renderBooks(JSON.parse(localStorage.getItem('books')))

    //работает только в index
    const moreButton = document.querySelector('.more')
    if (moreButton) {
      moreButton.addEventListener('click', (e) => {
      e.preventDefault()
      getData()
      })
    }

    //работает только в index
    const fuckB = document.getElementById('fuck')
    if (fuckB) {
      fuckB.addEventListener('click', (e) => {
      e.preventDefault()
      getUserCollectionFromServer()
      })
    }

    // в сторидже постоянно лежит актуальная коллекция!
    // 
    const addToCollection = (id, category) => {
      const books = JSON.parse(localStorage.getItem(category))
      const clickedBook = books.find(book => book.id == id)
      const userCollection = localStorage.getItem('userCollection') ? 
        JSON.parse(localStorage.getItem('userCollection')) : []

      //при нормальных условиях не актуально (всегда выполняется елс)
      if (userCollection.some(book => book.id === clickedBook.id)) {
        //перебор массива с изменением его структуры
        // userCollection.map(book => {
        //   if (book.id === clickedBook.id) book.count++
        //   return book
        // })
      } else {
        clickedBook.isAddedtoCol = true
        userCollection.push(clickedBook)
      }

      localStorage.setItem('userCollection', JSON.stringify(userCollection))
    }

    if (goodsContainer) {
    goodsContainer.addEventListener('click', (e) => {
      if (e.target.closest('.btn-addC')) {
        const buttonColl = e.target.closest('.btn-addC')
        const buttonId = buttonColl.dataset.id
        const buttonCategory = buttonColl.dataset.category
        // !обновить_коллекцию()
        addToCollection(buttonId, buttonCategory)
      }
      if (e.target.closest('.btn-addF')) {
        const buttonColl = e.target.closest('.btn-addF')
        const buttonId = buttonColl.dataset.id
        const buttonCategory = buttonColl.dataset.category
        // !обновить_коллекцию()
        addToFavorite(buttonId, buttonCategory)
      }
    })
  }
}

// const testingLocalStore = () => {
//   localStorage.setItem('kek', JSON.stringify([1,2,3,4,5]))
//   console.dir(JSON.parse(localStorage.getItem('kek')))
// }

// testingLocalStore()