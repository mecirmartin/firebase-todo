import firebase from "firebase/app"
import "firebase/auth"

import { auth } from "../pages"

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.useDeviceLanguage()
    auth.signInWithRedirect(provider)
  }

  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <div id="firebaseui-auth-container"></div>
    </>
  )
}

export default SignIn
