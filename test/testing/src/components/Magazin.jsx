import Produs from "./Produs.jsx"
import { useState } from "react"
export default function Magazin(){
    const [prod, setProd] = useState(0);
    const onAdd = () =>{
        setProd(() => prod + 1)
    }
    return(
        <div>
            <p>ai in cos {prod}</p>
            <Produs nume="mere" add={onAdd}/>
            <Produs nume="banane"  add={onAdd}/>
            <Produs nume="pere"  add={onAdd}/>
        </div>
    )
}