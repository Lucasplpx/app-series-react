import React, { useState, useEffect } from 'react'
import { Table, Alert } from 'reactstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {
  const [data, setData] = useState([])

  useEffect(()=>{
    axios.get('/api/series').then(res => {
     setData(res.data.data)
    })
  }, [])

  const deleteSerie = async (id) => {
    await axios.delete('/api/series/'+id)
    const filtrado = data.filter(item => item.id !== id)
    setData(filtrado)
  }

  const renderizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Excluir</button>
          <Link to={'/series/'+record.id} className='btn btn-warning'>Info</Link>
        </td>
      </tr>      
    )
  }

  if(data.length === 0){
    return(
      <div className='container'>
        <h1>Séries</h1>    
        <Link to='/series/nova' className='btn btn-primary'>Nova série</Link>   
        <Alert color="warning">          
          Você não possui séries criadas.
        </Alert>
      </div>
    )
  }


  return (
    <div className='container'>
      <h1>Séries</h1>     
      <Link to='/series/nova' className='btn btn-primary'>Nova série</Link>

      <Table dark>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>          
          </tr>
        </thead>
        <tbody>
          {data.map(renderizaLinha)}
        </tbody>
      </Table>     
    </div>
  )

}

export default Series