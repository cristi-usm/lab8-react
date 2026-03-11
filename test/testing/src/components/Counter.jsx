import { useState } from 'react'
import '../App.css'


export default function counter(){
    const [show, setShow] = useState(false)
  return (
    <>
    <p className={show ? "show" : "hide"}>test</p>
    <button onClick={()=> setShow(!show)}>Show/hide</button>
    </>
  )
  }



