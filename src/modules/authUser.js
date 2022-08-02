import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { getBooks } from "./getbooks";
import { getUserBooksFromServer } from "./dbOperations";

export const togleAllBooksButtons = () => {
  document.querySelectorAll(".addedBtn1").forEach((bookbtn) => {
    bookbtn.dataset.isadded = "false";
    bookbtn.classList.remove("addedBtn1");
  });
  document.querySelectorAll(".addedBtn2").forEach((bookbtn) => {
    bookbtn.dataset.isadded = "false";
    bookbtn.classList.remove("addedBtn2");
  });
  getUserBooksFromServer("userBookshelf").then((res) => {
    //console.dir(res.length)
    if (res) {
      localStorage.setItem("userBookshelf", JSON.stringify(res));
      res.forEach((book) => {
        var bsBtn = document.querySelectorAll(`[id='${book.id}']`);
        if (bsBtn[0]) {
          bsBtn[0].classList.add("addedBtn1");
          bsBtn[0].dataset.isadded = "true";
        }
      });
    }
  });
  getUserBooksFromServer("userFavorites").then((res) => {
    //console.dir(res.length)
    if (res) {
      localStorage.setItem("userFavorites", JSON.stringify(res));
      res.forEach((book) => {
        var bsBtn = document.querySelectorAll(`[id='${book.id}']`);
        if (bsBtn[1]) {
          bsBtn[1].classList.add("addedBtn2");
          bsBtn[1].dataset.isadded = "true";
        }
      });
    }
  });
};

export const showAuthForm = () => {
  const SignInButton = document.querySelector(".button-signIn");
  const authModal = document.getElementById("auth");
  const messageModal = document.getElementById("messagee");
  const nickPlace = document.getElementById("nick-place");
  const modalForm = document.getElementById("logis_form");
  const emailPlaceForLG = document.getElementById("LGE");
  const passPlaceForLG = document.getElementById("LGP");
  const authDisp = document.querySelectorAll(".auth-cl");
  const buttonOut = document.querySelector(".btn-out");
  const buttonFav = document.querySelector(".btn-fav");
  const buttonCol = document.querySelector(".btn-col");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    // auth.setPersistence(browserSessionPersistence)
    //getBooks()
    sessionStorage.setItem("isUserLoged", user ? true : false);
    togleAllBooksButtons();
    if (user) {
      disableBtns(false);
      const nick = document.getElementById("nick-place");
      nick.innerText = user.displayName;

      SignInButton.style.display = "none";
      authDisp.forEach((child) => (child.style.display = "flex"));
      //authDisp.style.display = 'flex'
      // SignInPlace.innerHTML = `<span class="outclean">${user.displayName}</span><button class="btn btn-out outclean" type="button" id="button-addon2"><img src="img/search.png" alt="search"></button>`
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      console.log("Есть контакт. Пользователь: " + user.displayName);
      // ...
    } else {
      disableBtns(true);
      SignInButton.style.display = "flex";
      authDisp.forEach((child) => (child.style.display = "none"));
      // User is signed out
      // ...
      console.log("Нет контакта");
    }
  });

  const disableBtns = (flag) => {
    const btn_addC = document.querySelector(".btn-addC");
    const btn_addF = document.querySelector(".btn-addF");
    if (flag) {
      if (!document.querySelector("style")) {
        const style = document.createElement("style");
        // add CSS styles
        style.innerHTML = `
            .btn-addC {
                opacity: 0.3;
            }
            .btn-addC:hover {
                opacity: 0.3;
            }
            .btn-addF {
              opacity: 0.3;
            }
            .btn-addF:hover {
              opacity: 0.3;
            }
        `;
        document.head.appendChild(style);
        if (btn_addC) {
          btn_addC.disabled = true;
          btn_addF.disabled = true;
        }
      }
    } else if (document.querySelector("style")) {
      document.head.removeChild(document.querySelector("style"));
      if (btn_addC) {
        btn_addC.disabled = false;
        btn_addF.disabled = false;
      }
    }
  };

  buttonOut.addEventListener("click", () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear();
      })
      .catch((error) => {
        console.error(e.message);
      });
  });

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      emailPlaceForLG.value,
      passPlaceForLG.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        authModal.style.display = "";
      })
      .catch((err) => showMessage("Неверная почта\\пароль<br>" + err.message));
  });

  SignInButton.addEventListener("click", () => {
    authModal.style.display = "flex";
  });

  authModal.addEventListener("mousedown", (e) => {
    if (!e.target.closest(".modal") && e.target.classList.contains("overlay")) {
      authModal.style.display = "";
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      authModal.style.display = "";
    }
  });

  const showMessage = (message) => {
    //authModal.style.display = ''
    messageModal.innerHTML = `
    <div class="modal" id="messForm">${message}</div>
    `;
    messageModal.style.display = "flex";
  };

  messageModal.addEventListener("mousedown", (e) => {
    if (!e.target.closest(".modal") && e.target.classList.contains("overlay")) {
      messageModal.style.display = "";
    }
  });
};
