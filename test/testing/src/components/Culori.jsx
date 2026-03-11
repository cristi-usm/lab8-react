import { useState } from "react";
export default function Culori(){
     const colors = ["red", "blue", "green", "orange"];
     const [cul, setCul] = useState(0)

    const nextCul = () => {
        if(cul === colors.length - 1){
            setCul(0);
        }else{
            setCul(cul + 1)
        }
    }
    const rand = () =>{
        setCul(() => Math.floor(Math.random() * colors.length))
    }
    return(
        <div>
            <p style={{background: colors[cul]}}>culoare</p>
            <p>ranmdom numar {cul}</p>
            <button onClick={nextCul}>set</button>
            <button onClick={rand}>set 2</button>
        </div>
    )
}