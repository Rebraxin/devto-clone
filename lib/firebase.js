// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/storage'

// const firebaseConfig = {
//   apiKey: 'AIzaSyAYkW61jLFvVse3qdrWb13Ha1I0IVWQC3Q',
//   authDomain: 'nextfire-demo-d1c8e.firebaseapp.com',
//   projectId: 'nextfire-demo-d1c8e',
//   storageBucket: 'nextfire-demo-d1c8e.appspot.com',
//   messagingSenderId: '422390207104',
//   appId: '1:422390207104:web:2c9640b6178d8210ffcc65',
//   measurementId: 'G-Z7ZS8N2MXW',
// }

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig)
// }

// export const auth = firebase.auth()
// export const firestore = firebase.firestore()
// export const storage = firebase.storage()

import { getFirestore } from 'firebase/firestore'
import { getApps, getApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAYkW61jLFvVse3qdrWb13Ha1I0IVWQC3Q',
  authDomain: 'nextfire-demo-d1c8e.firebaseapp.com',
  projectId: 'nextfire-demo-d1c8e',
  storageBucket: 'nextfire-demo-d1c8e.appspot.com',
  messagingSenderId: '422390207104',
  appId: '1:422390207104:web:2c9640b6178d8210ffcc65',
  measurementId: 'G-Z7ZS8N2MXW',
}

const firebase = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(firebase)
export const firestore = getFirestore(firebase)
export const storage = getStorage(firebase)
