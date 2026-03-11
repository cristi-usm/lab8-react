import Telecomanda from "./Telecomanda"
import { useState } from "react"
export default function Televizor(){
    const [tel, setTel] = useState(0)
    const next = () =>{
        setTel(()=>tel +1)
    }
    const prev = ()=>{
        setTel(()=>tel - 1)
    }
    return(
        <div>
            <p>Canal {tel}</p>
            <Telecomanda
            prevChannel={prev}
            nextChannel={next}
            />
        </div>
    )
}