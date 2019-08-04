import React, { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input, Badge } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: ''
  })
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('INFO')
  const [data, setData] = useState({})
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')

  useEffect(() => {      
    async function fetchData() {
      const res = await axios.get('/api/series/' + match.params.id)
      setData(res.data)
      setForm(res.data)
    }
    fetchData();
  }, [match.params.id])

  useEffect(() => {
    async function fetchData() {
      const gens = await axios.get('/api/genres')
      setGenres(gens.data.data)
      const genres = gens.data.data
      const encontrado = genres.find(value => data.genre === value.name)
      if(encontrado){
        setGenreId(encontrado.id)
      }      
    }
    fetchData();
  }, [data])

  // custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChangeGenre = evt =>{
    setGenreId(evt.target.value)    
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    })
  }


  const save = async () => {
    const res = await axios.put('/api/series/' + match.params.id, {
      ...form,
      genre_id: genreId
    })

    if (res.status === 200) {
      setSuccess(true)
    }
  }
  if (success) {
    return <Redirect to='/series' />
  }


  return (

    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-9'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  
                  { data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge> }
                  { data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Não visto</Badge> }
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <div>
          <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
        </div>
      </div>

      {
        mode === 'EDIT' &&
        <div className='container'>
          <h1>Editar Série</h1>          
          <button className='btn btn-danger' onClick={() => setMode('INFO')}>Cancelar edição</button>
          <Form>
            <FormGroup>
              <Label for='name'>Nome</Label>
              <Input type='text' value={form.name} onChange={onChange('name')} name='name' id='nome' placeholder='Nome da Série' />
            </FormGroup>
            <FormGroup>
              <Label for='name'>Comentários</Label>
              <Input type='text' value={form.comments} onChange={onChange('comments')} name='name' id='nome' placeholder='Nome da Série' />
            </FormGroup>

            <FormGroup>
              <Label for="gen">Genêro</Label>
              <Input type="select" value={genreId} onChange={onChangeGenre} value={genreId} name="gen">
                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
              </Input>
            </FormGroup>

            <FormGroup tag="fieldset">              
              <FormGroup check>
                <Label check>
                  <Input checked={form.status === 'ASSISTIDO'} value='ASSISTIDO' id='assistido' type='radio' name='status' onChange={seleciona('ASSISTIDO')} />{' '} 
                  Assistido
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input checked={form.status === 'PARA_ASSISTIR'} value='PARA_ASSISTIR' type='radio' id='paraAssistir' name='status' onChange={seleciona('PARA_ASSISTIR')}/>{' '} 
                  Para assistir
                </Label>
              </FormGroup>             
            </FormGroup>          


            <Button onClick={save} color='primary' size='sm'>Salvar</Button>
          </Form>
        </div>
      }
    </div>
  )
}

export default InfoSerie