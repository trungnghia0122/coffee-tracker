import {
  calculateCurrentCaffeineLevel,
  coffeeConsumptionHistory,
  getCaffeineAmount,
  timeSinceConsumption,
} from "../utils"

export default function History() {
  return (
    <>
      <div className='section-header'>
        <i className='fa-solid fa-timeline' />
        <h2>History</h2>
      </div>

      <p>
        <i>Hover for more information!</i>
      </p>

      <div className='coffee-history'>
        {Object.keys(coffeeConsumptionHistory)
          .sort((a, b) => b - a)
          .map((utcTime, index) => {
            const coffee = coffeeConsumptionHistory[utcTime]
            const timeSinceConsume = timeSinceConsumption(utcTime)
            const originalAmount = getCaffeineAmount(coffee.name)
            const remainingAmount = calculateCurrentCaffeineLevel({
              [utcTime]: coffee,
            })

            const summary = `Name: ${coffee.name}\nTime Since Consumption: ${timeSinceConsume}\nCost: $${coffee.cost}\nOriginal Amount of Caffeine: ${originalAmount} mg\nAmount of Caffeine Remaining: ${remainingAmount} mg`

            return (
              <div title={summary} key={index}>
                <i className='fa-solid fa-mug-hot' />
              </div>
            )
          })}
      </div>
    </>
  )
}
