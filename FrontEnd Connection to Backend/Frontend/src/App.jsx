import { useState,useEffect } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [jokes, setJokes] = useState([]);

  // async function jokeFetcher(){
  //   try {
  //     const data = await fetch("localhost:3000/jokes")
  //     const convert = await data.json()
  //   } catch (error) {
  //     throw new Error("Error 404 ! Not Found");
  //   }
  // }  
  // React.useEffect(() => {
  //   jokeFetcher()
  // })
  useEffect(() => {
    axios.get('/api/jokes').
    then((response) => {
      setJokes(response.data)
    }).
    catch((error) => {
      console.log(error)
    })
  },[])
  
  return (
    <>
      <h1>Jokes</h1>
      <p>Jokes Length : {jokes.length}</p>
      {jokes.map((item) => (
        <div key = {item.id}>
          <h3>{item.joke}</h3>
        </div>
      ))}
    </>
  )
}

export default App
