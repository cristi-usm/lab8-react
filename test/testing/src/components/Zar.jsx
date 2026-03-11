import { useState } from "react";
export default function Zar(){
    const [zar, setZar] = useState(1)
    const setRandom = () =>{
        setZar(() => Math.floor(Math.random() * 6) + 1)
    }
    return(
        <div>
            <p>{zar}</p>
            <button onClick={setRandom}>click</button>
        </div>
    )
}