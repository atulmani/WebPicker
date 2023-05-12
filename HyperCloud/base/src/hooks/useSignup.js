import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { timestamp } from '../firebase/config'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, phoneNumber, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      console.log('thumbnail in useSignup 1:', thumbnail)
      let imgUrl = ''
      if (thumbnail) {
        console.log('thumbnail in useSignup 2:', thumbnail)
        const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
        const img = await projectStorage.ref(uploadPath).put(thumbnail)
        imgUrl = await img.ref.getDownloadURL()
      }

      console.log('before updateProfile:', imgUrl)
      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ phoneNumber, displayName, photoURL: imgUrl })
      console.log('after updateProfile:', imgUrl)

      // create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        fullName: displayName,
        email,
        phoneNumber,
        city: '',
        address: '',
        photoURL: imgUrl,
        roles: ['user'],
        status: 'active',
        createdAt: timestamp.fromDate(new Date()),
        lastLoginTimestamp: timestamp.fromDate(new Date())

      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
      console.log('Error:', err)
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}