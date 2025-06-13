import React from 'react'
import Navbar from './Navbar'
import CreateExpense from './CreateExpense'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <h1>
          Expense
        </h1>
        <CreateExpense/>
      </div>
    </div>
  )
}

export default Home
