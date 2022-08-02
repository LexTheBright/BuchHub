import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export const createUserInDB = async (nickname, email, uid) => {
  const auth = getAuth();
  var db = getFirestore();
  try {
    await setDoc(doc(db, "USERS", uid), {
      nickname: nickname,
      email: email,
      uid: uid,
    });
    // await setDoc(doc(db, "USERS/" + nickname + "/" + 'userBookshelf', book.id), book)
  } catch (e) {
    console.error(e.message);
  }
};

export const getUserBooksFromServer = async (nameOfCollection) => {
  const auth = getAuth();
  if (auth.currentUser) {
    var db = getFirestore();
    var userBooks = [];
    try {
      const querySnapshot = await getDocs(
        collection(db, "USERS", auth.currentUser.uid, nameOfCollection)
      );
      // console.dir(querySnapshot)
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          userBooks.push(doc.data());
        });
      }
    } catch (e) {
      console.error(
        "Здесь он не находит коллекцию, потому, что ее нет..." + e.message
      );
    }
    return userBooks;
  }
};

export const addBookIntoCollection = async (nameOfCollection, book) => {
  const auth = getAuth();
  if (auth.currentUser) {
    var db = getFirestore();
    try {
      await setDoc(
        doc(
          db,
          "USERS/" + auth.currentUser.uid + "/" + nameOfCollection,
          book.id
        ),
        book
      );
    } catch (e) {
      console.error(e.message);
    }
  }
};

export const removeBookFromCollection = async (nameOfCollection, book) => {
  const auth = getAuth();
  var db = getFirestore();
  try {
    await deleteDoc(
      doc(
        db,
        "USERS/" + auth.currentUser.uid + "/" + nameOfCollection,
        book.id
      ),
      book
    );
  } catch (e) {
    console.error(e.message + " - Ошибка удаления");
  }
};

// import { getAuth, signOut } from "firebase/auth";

// const auth = getAuth();
// signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });
