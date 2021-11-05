import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAYkW61jLFvVse3qdrWb13Ha1I0IVWQC3Q',
  authDomain: 'nextfire-demo-d1c8e.firebaseapp.com',
  projectId: 'nextfire-demo-d1c8e',
  storageBucket: 'nextfire-demo-d1c8e.appspot.com',
  messagingSenderId: '422390207104',
  appId: '1:422390207104:web:2c9640b6178d8210ffcc65',
  measurementId: 'G-Z7ZS8N2MXW',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Auth exports
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

// Firestore exports
export const firestore = firebase.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const fromMillis = firebase.firestore.Timestamp.fromMillis
export const increment = firebase.firestore.FieldValue.increment

// Storage exports
// export const storage = firebase.storage()
// export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED

/// Helper functions

// /**`
//  * Gets a users/{uid} document with username
//  * @param  {string} username
//  */
// export async function getUserWithUsername(username) {
//   const usersRef = firestore.collection('users')
//   const query = usersRef.where('username', '==', username).limit(1)
//   const userDoc = (await query.get()).docs[0]
//   return userDoc
// }

// /**`
//  * Converts a firestore document to JSON
//  * @param  {DocumentSnapshot} doc
//  */
// export function postToJSON(doc) {
//   const data = doc.data()
//   return {
//     ...data,
//     // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
//     createdAt: data?.createdAt.toMillis() || 0,
//     updatedAt: data?.updatedAt.toMillis() || 0,
//   }
// }
