import { useState } from "react"

export default function B({name, price, status}){
    const [ad, setAdd] = useState(price)
    const add = () =>{
        if(ad >= 1240){
            return
        }else{
        setAdd(()=> ad + 20)
        }
    }
    return(
        <div>  
                <p>{name}</p>
                <p>{status}</p>
                <p>{ad}</p>
                <button onClick={add}>Creste</button>
        </div>
    )
}