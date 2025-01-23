import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function Authentication(props) {
  const { handleCloseModal } = props
  const [isRegistration, setIsRegistration] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState(null)

  const { signup, login } = useAuth()

  async function handleAuthentication() {
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.length < 6 ||
      isAuthenticating
    ) {
      if (isRegistration) {
        setError("Invalid Email or Password")
      } else {
        setError("Email or Password is incorrect.")
      }

      return
    }

    try {
      setIsAuthenticating(true)
      setError(null)
      if (isRegistration) {
        //sign up
        await signup(email, password)
      } else {
        // log in
        await login(email, password)
      }
      handleCloseModal()
    } catch (error) {
      console.log(error.message)
      setError("Email or Password is incorrect.")
      setEmail("")
      setPassword("")
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <>
      <h2 className='sign-up-text'>{isRegistration ? "Sign Up" : "Login"}</h2>
      <p>
        {isRegistration ? "Create a new account" : "Sign in to your account"}
      </p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='user@email.com'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='********'
        type='password'
      />
      <button onClick={handleAuthentication}>
        <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />
      <div className='register-content'>
        <p>
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button onClick={() => setIsRegistration(!isRegistration)}>
          <p>{isRegistration ? "Login" : "Sign up"}</p>
        </button>
      </div>
    </>
  )
}
