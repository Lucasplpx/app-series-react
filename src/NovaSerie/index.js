import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovaSerie = () => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const onChange = evt => {
    setName(evt.target.value)    
  }

  const save = async () => {
    const res = await axios.post('/api/series', { name })

    if(res.status === 200){
      setSuccess(true)
    }    
  }
  if (success) {
   return <Redirect to='/series'/>
  }

  return (
    <div className='container'>
      <h1>Nova Série</h1>
      <Form>
        <FormGroup>
          <Label for='name'>Nome</Label>
          <Input type='text' value={name} onChange={onChange} name='name' id='nome' placeholder='Nome da Série' />
        </FormGroup>       
        <Button onClick={save} color='primary' size='sm'>Salvar</Button>
      </Form>
    </div>
  )
}

export default NovaSerie