import React, {useState, useEffect} from 'react'

import Header from './components/Header'
import api from './services/Api'

import './App.css'

import Img from './assets/photo.jpeg'

function App(){
  //const projects = ['Projeto1', 'Projeto2', 'Projeto3']
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    api.get('projects')
      .then(response => {
        setProjects(response.data)
      })
  }, [])

  async function handleAddProject(){
    //projects.push(`Projeto ${Date.now()}`)
    //setProjects([...projects, response.data])

    const response = await api.post('projects',{
      title: `Projeto de numero ${Date.now()}`,
      owner: 'Ricardo Mogio'
    })

    const project = response.data
    console.log(project)

    setProjects([...projects, project])
  }

  return(
    <>
      <Header title='Projects'/>
      <img src={Img} width={250} alt="Imagem de codigo"/>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
      <button type='button' onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App