import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import NovoGenero from './NovoGenero'
import Generos from './Generos'
import EditarGenero from './EditarGenero'

function App() {
  const [data, setData] = useState({})
  useEffect(() => {
   axios.get('/api').then(res => {
    setData(res.data)
   })
  
  }, [])
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />      
          <Route path='/generos' exact component={Generos} />
          <Route path='/generos/novo' exact component={NovoGenero} />
          <Route path='/generos/:id' exact component={EditarGenero} />
        </Switch>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  )
}

export default App
