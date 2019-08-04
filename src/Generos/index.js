import React, { useState, useEffect } from 'react'
import { Table, Alert } from 'reactstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Generos = () => {
  const [data, setData] = useState([])

  useEffect(()=>{
    axios.get('/api/genres').then(res => {
     setData(res.data.data)
    })
  }, [])

  const deleteGenero = async (id) => {
    const res = await axios.delete('/api/genres/'+id)
    const filtrado = data.filter(item => item.id !== id)
    setData(filtrado)
  }

  const renderizaLinha = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Excluir</button>
          <Link to={'/generos/'+record.id} className='btn btn-warning'>Editar</Link>
        </td>
      </tr>      
    )
  }

  if(data.length === 0){
    return(
      <div className='container'>
        <h1>Generos</h1>       
        <Alert color="warning">
          Você não possui generos criados.
        </Alert>
      </div>
    )
  }


  return (
    <div className='container'>
      <h1>Generos</h1>     
      <Link to='/generos/novo' className='btn btn-primary'>Novo genêro</Link>

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

export default Generos