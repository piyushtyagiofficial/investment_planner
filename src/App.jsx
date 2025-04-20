import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { IncomeForm } from './components/IncomeForm'
import { InvestmentChart } from './components/InvestmentChart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=''>
      <IncomeForm/>
      <InvestmentChart/>
    </div>
  )
}

export default App
