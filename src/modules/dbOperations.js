import { getAuth } from "firebase/auth";
import { doc, setDoc, addDoc, collection, getDocs, getDoc  } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

export const createUserInDB = async (nickname, email, uid) => {
  const auth = getAuth()
  var db = getFirestore()
  try {
      await setDoc(doc(db, "USERS", nickname), {
        email: email,
        uid: uid,
        // userFavoritess: {},
        // userCollection: {}
      }).then( async () => {
        await setDoc(doc(db, "USERS/" + nickname + "/userFavorites", 'book'), {
          email: email, 
          kek: 'pishib naxui'
        }).catch(error => console.error(error.message))
      })
  } catch (e) {
    console.error(e.message)
  }
}

export const getUserBooksFromServer = async (nameOfCollection) => {
  const auth = getAuth()
  var db = getFirestore()
  try {
    const querySnapshot = await getDocs(collection(db, "USERS", auth.currentUser.displayName, nameOfCollection))
    var userBooks = []
      querySnapshot.forEach(doc => {
        userBooks.push(doc.data())
      })
    return userBooks
  } catch (e) {
    console.error(e.message)
  }
}

export const addBookIntoFavorite = async (book) => {
  const auth = getAuth()
  var db = getFirestore()
  try {
      await setDoc(doc(db, "USERS/" + auth.currentUser.displayName + "/Favorite", 'book.title'), {
      title: "meh",
      text: "kek",
    })
  } catch (e) {
    console.error(e.message)
  }
}

export const addBookIntoCollecion = async (book) => {
  const auth = getAuth()
  var db = getFirestore()
  try {
      await setDoc(doc(db, "USERS/" + auth.currentUser.displayName + "/Read", 'book.title'), {
      title: "meh",
      text: "kek",
    })
  } catch (e) {
    console.error(e.message)
  }
}





// import { getAuth, signOut } from "firebase/auth";

// const auth = getAuth();
// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });