/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useCallback, useContext } from 'react'
import { auth, firestore, googleAuthProvider } from '@lib/firebase'
import { UserContext } from '@lib/context'
import debounce from 'lodash.debounce'

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
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const { user, username } = useContext(UserContext)

  useEffect(() => {
    checkUsername(formValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue])

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase()
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    if (val.length < 3) {
      setFormValue(val)
      setLoading(false)
      setIsValid(false)
    }

    if (re.test(val)) {
      setFormValue(val)
      setLoading(true)
      setIsValid(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`)
        const { exists } = await ref.get()
        console.log('Firestore read executed!')
        setIsValid(!exists)
        setLoading(false)
      }
    }, 500),
    []
  )

  const onSubmit = async (e) => {
    e.preventDefault()

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`)
    const usernameDoc = firestore.doc(`usernames/${formValue}`)

    // Commit both docs together as a batch write
    const batch = firestore.batch()
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    })
    batch.set(usernameDoc, { uid: user.uid })

    try {
      await batch.commit()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />

          <UserNameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />

          <button type="submit" disabled={!isValid} className="btn-green">
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid : {isValid.toString()}
          </div>
        </form>
      </section>
    )
  )
}

const UserNameMessage = ({ username, isValid, loading }) => {
  if (username.length < 1) {
    return (
      <p>
        <br />
      </p>
    )
  } else if (username.length < 3) {
    return <p className="text-danger">Need at least 3 characters</p>
  } else if (loading) {
    return <p>Checking...</p>
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>
  } else {
    return (
      <p>
        <br />
      </p>
    )
  }
}
