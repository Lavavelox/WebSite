import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, sendPasswordResetEmail } from "firebase/auth";
import { readUserData, } from "./database";


const auth = getAuth();

function onAuth(setUserProfile, setUserData) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserProfile(user)
      readUserData(`usuarios/${user.uid}`, setUserData)
    } else {
      setUserProfile(null)
      setUserData(null)
    }
  });
}

// ---------------------------Login, Sign Up and Sign In------------------------------------

async function signUpWithEmail(email, password, setUserProfile, setUserSuccess) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    const user = res.user;
    setUserProfile(user)
  } catch (error) {
    console.log(error)
    const errorCode = error.code;
    const errorMessage = error.message;
    setUserProfile(null)
    setUserSuccess(errorMessage)
  }
}
async function signInWithEmail(email, password, setUserProfile) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    setUserProfile(res.user)
  } catch (error) {
    setUserProfile(null)
  }
}
function sendPasswordReset(email, callback) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      callback()
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
function handleSignOut() {
  signOut(auth).then(() => {
  }).catch((error) => {
    // An error happened.
  });
}

export { onAuth, signUpWithEmail, signInWithEmail, handleSignOut, sendPasswordReset }

