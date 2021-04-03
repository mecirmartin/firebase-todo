import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"

import SignIn from "../components/SignIn"
import Todos from "../components/Todos"

const config = {
  apiKey: "AIzaSyBFHfa2rWWASIoRkXz8TrLQPrHPYvfXmWc",
  authDomain: "fir-todo-ee845.firebaseapp.com",
  projectId: "fir-todo-ee845",
  storageBucket: "fir-todo-ee845.appspot.com",
  messagingSenderId: "31763364400",
  appId: "1:31763364400:web:b38edb3ff7cbec602f8bf5",
  measurementId: "G-QV5YSQWG2S",
}

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

export const auth = firebase.auth()
export const db = firebase.firestore()

export default function Home() {
  const [user, loading] = useAuthState(auth)
  return (
    <div className="flex items-center justify-center h-screen ">
      {user ? <Todos /> : loading ? <p>Redirecting user...</p> : <SignIn />}
    </div>
  )
}
