import router from '@/core/router'
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

const getErrorMessage = (code: string) => {
  switch (code) {
    case 'auth/account-exists-with-different-credential':
      return 'Autre service utilisé'
    case 'auth/invalid-email':
      return 'Invalid email'
    case 'auth/user-not-found':
      return 'No account with that email was found'
    case 'auth/wrong-password':
      return 'Incorrect password'
    default:
      return 'Une erreur est survenue'
  }
}

export const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
      console.log('Successfully signed in!')
      router.push('/')
    })
    .catch((error) => {
      const message = getErrorMessage(error.code)
      console.warn(message)
      return message
    })
}

export const register = (email: string, password: string) => {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
      console.log('Successfully registered!')
      router.push('/')
    })
    .catch((error) => {
      const message = getErrorMessage(error.code)
      console.warn(message)
      return message
    })
}

export const signInWithGoogle = (route: string = '/') => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      console.log('Successfully registered!')
      router.push(route)
    })
    .catch((error) => {
      const message = getErrorMessage(error.code)
      console.warn(message)
      return message
    })
}

export const signInWithTwitter = (route: string = '/') => {
  const provider = new TwitterAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      console.log('Successfully registered!')
      router.push('/')
    })
    .catch((error) => {
      const message = getErrorMessage(error.code)
      console.warn(message)
      return message
    })
}
