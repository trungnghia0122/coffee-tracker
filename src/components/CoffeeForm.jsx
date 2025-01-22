import { coffeeOptions } from "../utils"
import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"

export default function CoffeeForm(props) {
  const { isAuthenticated } = props
  const [showCoffeeOptions, setShowCoffeeOptions] = useState(false)
  const [selectedCoffee, setSelectedCoffee] = useState("")
  const [coffeeCost, setCoffeeCost] = useState(0)
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)
  const [showModal, setShowModal] = useState(false)

  function handleSubmitForm() {
    if (!isAuthenticated) {
      setShowModal(true)
      return
    }
    console.log(selectedCoffee, coffeeCost, hour, min)
    setSelectedCoffee("")
    setCoffeeCost(0)
    setHour(0)
    setMin(0)
    setShowCoffeeOptions(false)
  }

  return (
    <>
      {showModal && (
        <Modal handleCloseModal={() => setShowModal(false)}>
          <Authentication />
        </Modal>
      )}
      <div className='section-header'>
        <i className='fa-solid fa-pencil' />
        <h2>Start Tracking Today</h2>
      </div>
      <h4>Select coffee type</h4>
      <div className='coffee-grid'>
        {coffeeOptions.slice(0, 5).map((option, index) => {
          return (
            <button
              onClick={() => {
                setShowCoffeeOptions(false)
                setSelectedCoffee(option.name)
              }}
              className={`button-card ${
                option.name === selectedCoffee && !showCoffeeOptions
                  ? "coffee-button-selected"
                  : ""
              }`}
              key={index}
            >
              <h4>{option.name}</h4>
              <p>{option.caffeine} mg</p>
            </button>
          )
        })}

        <button
          onClick={() => {
            setShowCoffeeOptions(true)
            setSelectedCoffee("")
          }}
          className={`button-card ${
            showCoffeeOptions ? "coffee-button-selected" : ""
          }`}
        >
          <h4>Other</h4>
          <p>n/a</p>
        </button>
      </div>

      {showCoffeeOptions && (
        <select
          value={selectedCoffee}
          onChange={(e) => setSelectedCoffee(e.target.value)}
          id='coffee-list'
          name='coffee-list'
        >
          <option value={null}>Select Type</option>
          {coffeeOptions.slice(5).map((option, index) => {
            return (
              <option value={option.name} key={index}>
                {option.name} {option.caffeine} mg
              </option>
            )
          })}
        </select>
      )}

      <h4>Add the cost ($)</h4>
      <input
        value={coffeeCost}
        onChange={(e) => setCoffeeCost(Math.max(0, e.target.value))}
        className='w-full'
        type='number'
        placeholder='E.g. 4.50'
      />

      <h4>Time since consumption</h4>
      <div className='time-entry'>
        <div>
          <h6>Hours</h6>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            id='hours-select'
          >
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23,
            ].map((hour, index) => {
              return (
                <option key={index} value={hour}>
                  {hour}
                </option>
              )
            })}
          </select>
        </div>

        <div>
          <h6>Minutes</h6>
          <select
            value={min}
            onChange={(e) => setMin(e.target.value)}
            id='minutes-select'
          >
            {[0, 5, 10, 15, 30, 45].map((min, index) => {
              return (
                <option key={index} value={min}>
                  {min}
                </option>
              )
            })}
          </select>
        </div>
        <button disabled={!selectedCoffee} onClick={handleSubmitForm}>
          <p>Add Entry</p>
        </button>
      </div>
    </>
  )
}
