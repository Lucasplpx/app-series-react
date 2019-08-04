import React, { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditarGenero = ({match}) => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(()=>{
    axios.get('/api/genres/'+match.params.id).then(res => {
      setName(res.data.name)
    })
  }, [match.params.id])  

  const onChange = evt => {
    setName(evt.target.value)    
  }

  const save = async () => {
    const res = await axios.put('/api/genres/'+ match.params.id, { name })

    if(res.status === 200){
      setSuccess(true)
    }    
  }
  if (success) {
   return <Redirect to='/generos'/>
  }

  return (
    <div className='container'>
      <h1>Editar Genero</h1>
      <Form>
        <FormGroup>
          <Label for='name'>Nome</Label>
          <Input type='text' value={name} onChange={onChange} name='name' id='nome' placeholder='Nome do Genêro' />
        </FormGroup>       
        <Button onClick={save} color='warning' size='sm'>Editar</Button>
      </Form>
    </div>
  )
}

export default EditarGenero