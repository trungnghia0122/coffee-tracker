import { createContext, useState, useContext, useEffect } from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { auth, db } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider(props) {
  const { children } = props
  const [globalUser, setGlobalUser] = useState("")
  const [globalData, setGlobalData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    setGlobalUser(null)
    setGlobalData(null)
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setGlobalUser(user)
      if (!user) {
        console.log("no active user")
        return
      }
      try {
        setIsLoading(true)

        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const firebaseData = docSnap.data()
          setGlobalData(firebaseData)
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        globalUser,
        globalData,
        setGlobalData,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
