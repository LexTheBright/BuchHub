import { renderBooks } from "./renderBooks";

export const search = function () {
  const searchInput = document.querySelector('.search-input')
  const goodsContainer = document.querySelector('.long-goods-list')
  //const inputButton = document.getElementById('button-addon2');
  const inputButton = document.querySelector('.search-block > button')

  const getData = (value) => {
    const cat_title = document.querySelector('.section-title')
    cat_title.innerHTML = 'Поиск по запросу \'' + value + '\''
    
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + value + '&filter=free-ebooks&printType=books&maxResults=40')
    .then((res) => res.json())
    .then((data) => {
      // const array = category ? data.filter((item) => item[category] == value) : data
      const array = data.items     
      array.map(book => book.isAddedToShelf = false)
      array.map(book => book.isAddedtoFav = false)

      localStorage.setItem('searched', JSON.stringify(array))
      localStorage.setItem('lastCategory', 'searched')
      sessionStorage.setItem('search_title', value)
      if (window.location.pathname !== "/books.html") window.location.href = '/books.html'
      else if (array) {
        //  localStorage.setItem('searched', JSON.stringify(array))
        renderBooks(array)
      } else {
        cat_title.innerHTML = `По запросу  '${value}'  ничего не найдено :(`
        goodsContainer.innerHTML = ''
      }
    })
    .catch(error => console.log(error.message))
  }

  try {
   inputButton.addEventListener('click', (e) => {
     e.preventDefault()
     getData(searchInput.value)
   })
  } catch (e) {
    console.log(e.message)
  }  

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      getData(searchInput.value)
    }
  })
}