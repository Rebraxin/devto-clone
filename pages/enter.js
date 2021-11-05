/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback, useContext } from 'react'
import { auth, firestore, googleAuthProvider } from '@lib/firebase'
import { UserContext } from '@lib/context'

const EnterPage = (props) => {
  const { user, username } = useContext(UserContext)

  return (
    <main>
      {user ? (
        !username ? (
          <UserNameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  )
}

export default EnterPage

// Sign in button with google
const SignInButton = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.svg'} /> Sign in with Google
    </button>
  )
}

// Sign out button
const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>
}

// username form
const UserNameForm = () => {
  return null
}
