import { IUser } from '@/core/types/IUser'
import { db } from '@/firebase'
import { User } from 'firebase/auth'
import { updateDoc, doc, getDoc, setDoc } from 'firebase/firestore'

export const updateUserInDB = async (user: User) => {
  const dataUser: IUser = {
    id: user.uid,
    displayName: user.displayName ?? undefined,
    photoURL: user.photoURL ?? undefined,
  }

  const userDocRef = doc(db, 'users', user.uid)

  getDoc(userDocRef)
    .then((doc) => {
      if (doc.exists()) {
        updateDoc(userDocRef, { ...dataUser })
      } else {
        setDoc(userDocRef, { ...dataUser })
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
