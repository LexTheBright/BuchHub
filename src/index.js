import { initializeApp } from 'firebase/app'


const firebaseConfig = {
  apiKey: "AIzaSyDK-yVgixBJPE-xQnNmWtHpLbOW9xuwLWw",
  authDomain: "firsttry-abd90.firebaseapp.com",
  projectId: "firsttry-abd90",
  storageBucket: "firsttry-abd90.appspot.com",
  messagingSenderId: "381836072490",
  appId: "1:381836072490:web:a9e5a567d9723b3baf1553"
}

const app = initializeApp(firebaseConfig)

import { showAuthForm } from "./modules/authUser";
showAuthForm()

import { checkDouble } from "./modules/regex";
checkDouble()
 
import { reg } from "./modules/regUser";
reg()

import { search } from "./modules/search";
search()

import { getBooks } from "./modules/getbooks";
getBooks()