import { IUser } from '@/core/types/IUser'
import { db } from '@/firebase'
import { User } from 'firebase/auth'
import { updateDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { GENERATED_PSEUDOS } from '@/data/pseudos'

export const updateUserInDB = async (user: User) => {
  const generatedPseudo =
    GENERATED_PSEUDOS[Math.floor(Math.random() * GENERATED_PSEUDOS.length)]

  const dataUser: IUser = {
    id: user.uid,
    photoURL: user.photoURL?.replace('s96-c', 's192-c') ?? undefined,
  }

  const userDocRef = doc(db, 'users', user.uid)

  getDoc(userDocRef)
    .then((doc) => {
      if (doc.exists()) {
        updateDoc(userDocRef, { ...dataUser })
      } else {
        setDoc(userDocRef, { displayName: generatedPseudo, ...dataUser })
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
