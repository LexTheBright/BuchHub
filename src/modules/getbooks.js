import { renderBooks } from "./renderBooks"
import { getUserBooksFromServer, addBookIntoCollection, removeBookFromCollection } from "./dbOperations"
import { togleAllBooksButtons } from "./authUser"


export const getBooks = () => {
  const links = document.querySelectorAll('.navigation-link')
  const goodsContainer = document.querySelector('.long-goods-list')
  const currentSectionTitle = document.querySelector('.section-title')

  var do_fetching = 1;
  var dict = {
      Фантастика : "Fiction",
      Поэзия : "Poetry",
      Искусство : "Art",
      История : "History",
      Религия : "Religion",
      Наука : "Science",
      Криминал : "Crime",
      Литература : "Literature",
      Поиск: "searched",
      Коллекция: "userBookshelf",
      Избранное: "userFavorites"
    }

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      getData(link.textContent)
    })
  }) 

  const hisBtn = document.querySelector('#History')
  if (hisBtn) {
    hisBtn.addEventListener('click' , (e) => {
        e.preventDefault()
        getData('История')
    })

  const LitBtn = document.querySelector('#Literature')
    LitBtn.addEventListener('click' , (e) => {
        e.preventDefault()
        getData('Литература')
    })

    const FicBtn = document.querySelector('#Fiction')
    FicBtn.addEventListener('click' , (e) => {
        e.preventDefault()
        getData('Фантастика')
    })
  }

  const favShelf = document.querySelector('.btn-col') 
  favShelf.addEventListener('click', (e) => {
    e.preventDefault()
    getData('Коллекция') 
  })

  const favButt = document.querySelector('.btn-fav') 
  favButt.addEventListener('click', (e) => {
    e.preventDefault()
    getData('Избранное')
  })

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] == value);
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
    console.log(value)
    Object.keys(localStorage).forEach((category) => {
        if (value == category) {
          if (window.location.pathname !== "/books.html") {
            localStorage.setItem('lastCategory', value)
            window.location.href = '/books.html'
          }
          else {
            renderBooks(JSON.parse(localStorage.getItem(category)))
            do_fetching = 0
          }
        }
    })
    
    if (do_fetching) {
      fetch('https://www.googleapis.com/books/v1/volumes?q=subject:' + value + '&filter=free-ebooks&printType=books&langRestrict=ru&maxResults=20')
      .then((res) => res.json())
      .then((data) => {
        //  const array = category ? data.filter((item) => item[category] == value) : data
        const array = data.items
        array.map(book => book.isAddedToShelf = false)
        array.map(book => book.isAddedtoFav = false)
        //console.dir(data.totalItems)
        localStorage.setItem(value, JSON.stringify(array))
        localStorage.setItem('lastCategory', value)
        if (window.location.pathname !== "/books.html") window.location.href = '/books.html'
        else renderBooks(array)
      })
    }
    do_fetching = 1;
  }


  if (localStorage.getItem('lastCategory') && window.location.pathname === "/books.html") {
    currentSectionTitle.innerHTML = getKeyByValue(dict, localStorage.getItem('lastCategory'))
    if (currentSectionTitle.innerHTML == "Поиск") currentSectionTitle.innerHTML = `Поиск по запросу '${sessionStorage.getItem('search_title')}'`
    renderBooks(JSON.parse(localStorage.getItem(Object.entries(localStorage).find(key => key[0] == localStorage.getItem('lastCategory'))[0])))
  }

  // '\'' + value + '\''
  //   sessionStorage.setItem('search_title', value)

  // //работает только в index
  // const moreButton = document.querySelector('.more')
  // if (moreButton) {
  //   moreButton.addEventListener('click', (e) => {
  //   e.preventDefault()
  //   getData()
  //   })
  // }

  // //работает только в index
  // const fuckB = document.getElementById('fuck')
  // if (fuckB) {
  //   fuckB.addEventListener('click', (e) => {
  //   e.preventDefault()
  //   console.log(auth.currentUser)
  //   })
  // }

  // в сторидже постоянно лежит актуальная коллекция!
  // 
  // const addToCollection = (id, category) => {
  //   const books = JSON.parse(localStorage.getItem(category))
  //   const clickedBook = books.find(book => book.id == id)
  //   const userCollection = localStorage.getItem('userCollection') ? 
  //     JSON.parse(localStorage.getItem('userCollection')) : []

  //   //при нормальных условиях не актуально (всегда выполняется елс)
  //   if (userCollection.some(book => book.id === clickedBook.id)) {
  //     //перебор массива с изменением его структуры
  //     // userCollection.map(book => {
  //     //   if (book.id === clickedBook.id) book.count++
  //     //   return book
  //     // })
  //   } else {
  //     clickedBook.isAddedToShelf = true
  //     userCollection.push(clickedBook)
  //   }
  //   localStorage.setItem('userCollection', JSON.stringify(userCollection))
  // }

  if (goodsContainer) {
    goodsContainer.addEventListener('click', (e) => {
      if (sessionStorage.getItem('isUserLoged') == "false") return;
      if (e.target.closest('.btn-addC')) {
        const clickedButton = e.target.closest('.btn-addC')
        const clickedButtonId = clickedButton.dataset.id
        const clickedButtonCategory = clickedButton.dataset.category
        const clickedBookObjFromLocalStore = JSON.parse(localStorage.getItem(clickedButtonCategory)).find(book => book.id == clickedButtonId)
        if (clickedButton.dataset.isadded == "false") {
          addBookIntoCollection('userBookshelf', clickedBookObjFromLocalStore)
          // getUserBooksFromServer('userBookshelf').then(res => {
          //   if (res != []) {
          //     localStorage.setItem('userBookshelf', JSON.stringify(res))
          //     console.dir(res)
          //   }
          // }).then(() => {
            clickedButton.dataset.isadded = "true"
            clickedButton.classList.add('addedBtn1')
          // })
        } else {
          removeBookFromCollection('userBookshelf', clickedBookObjFromLocalStore)
          .then(() => {
            // getUserBooksFromServer('userBookshelf')
            // .then(res => {
            //   if (res != []) {
            //     //localStorage.setItem('userBookshelf', JSON.stringify(res))
            //     console.dir(res)
            //   }
            // })
            // .then(() => {
              clickedButton.dataset.isadded = "false"
              clickedButton.classList.remove('addedBtn1')
              // if (document.querySelector('.section-title').innerText == "Коллекция") window.location.reload()
            // })
          })
        }
      } 
      if (e.target.closest('.btn-addF')) {
        const clickedButton = e.target.closest('.btn-addF')
        const clickedButtonId = clickedButton.dataset.id
        const clickedButtonCategory = clickedButton.dataset.category
        const clickedBookObjFromLocalStore = JSON.parse(localStorage.getItem(clickedButtonCategory)).find(book => book.id == clickedButtonId)
        if (clickedButton.dataset.isadded == "false") {
          addBookIntoCollection('userFavorites', clickedBookObjFromLocalStore)
          // getUserBooksFromServer('userFavorites').then(res => {
          //   if (res != []) {
          //     localStorage.setItem('userFavorites', JSON.stringify(res))
          //   }
          // }).then(() => {
            clickedButton.dataset.isadded = "true"
            clickedButton.classList.add('addedBtn2')
          // })
        } else {
          removeBookFromCollection('userFavorites', clickedBookObjFromLocalStore)
          .then(() => {
            // getUserBooksFromServer('userFavorites')
            // .then(res => {
            //   if (res != []) {
            //     localStorage.setItem('userFavorites', JSON.stringify(res))
            //   }
            // })
            // .then(() => {
              clickedButton.dataset.isadded = "false"
              clickedButton.classList.remove('addedBtn2')
               //if (document.querySelector('.section-title').innerText == "Избранное") window.location.reload()
            // })
          })

        }
      }
    })
  }
}

// const testingLocalStore = () => {
//   localStorage.setItem('kek', JSON.stringify([1,2,3,4,5]))
//   console.dir(JSON.parse(localStorage.getItem('kek')))
// }

// testingLocalStore()