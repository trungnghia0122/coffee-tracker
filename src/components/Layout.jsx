import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"

export default function Layout(props) {
  const { children } = props

  const [showModal, setShowModal] = useState(false)

  const header = (
    <header>
      <div>
        <h1 className='text-gradient'>CAFFIEND</h1>
        <p>For Coffee Insatiates</p>
      </div>
      <button onClick={() => setShowModal(true)}>
        <p>Login</p>
        <i className='fa-solid fa-mug-saucer'></i>
      </button>
    </header>
  )

  const footer = (
    <footer>
      <p>
        <span className='text-gradient'>Caffiend</span> was developed by Tony
        Tran
      </p>
    </footer>
  )

  return (
    <>
      {showModal && (
        <Modal handleCloseModal={() => setShowModal(false)}>
          <Authentication />
        </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  )
}
