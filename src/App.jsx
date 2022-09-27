import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const API_URL = "https://retoolapi.dev/7c813f/data"
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [orderStatusOptions, setOrderStatusOptions] = useState([])
  const [selected, setSelected] = useState("");

  useEffect(() => {
    async function fetchData() {
      // fetch orders from API
      const res = await fetch(API_URL)
      const data = await res.json()
      setTransactions(data)

      // set options for sort data
      let orderOptions = ["Select Option..."]
      for (let order of data) {
        let optionName = order.orderStatus
        if (!orderOptions.includes(optionName)) {
          orderOptions.push(optionName)
        }
      }
      setOrderStatusOptions(orderOptions)

      setSelected(orderOptions[0])
    }

    fetchData()
  }, [])

  function handleChange(e) {
    filterTransactionByOrderStatus(e.target.value)
  }

  function filterTransactionByOrderStatus(status) {
    setSelected(status)
    if (status != orderStatusOptions[0]) {
      const filteredTransactions = transactions.filter((x) => x.orderStatus == status)
      setFilteredTransactions(filteredTransactions)
    } else {
      setFilteredTransactions([])
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <p>Sort by Order Status</p>
        <select name="orderStatus" value={selected} onChange={handleChange}>
          {orderStatusOptions && orderStatusOptions.map((option, index) => (
            <option value={option} key={index}>{ option }</option>
          )) }
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Order ID</th>
            <th>Order Status</th>
            <th>Total Transaction</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions && filteredTransactions.length ?
            filteredTransactions.map((trx) => (
              <tr key={trx.id}>
                <td>{trx.name}</td>
                <td>{trx.email}</td>
                <td>{trx.orderId}</td>
                <td>{trx.orderStatus}</td>
                <td>{trx.totalTransaction}</td>
              </tr>
              )) :
            transactions.map((trx) => (
              <tr key={trx.id}>
                <td>{trx.name}</td>
                <td>{trx.email}</td>
                <td>{trx.orderId}</td>
                <td>{trx.orderStatus}</td>
                <td>{trx.totalTransaction}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
