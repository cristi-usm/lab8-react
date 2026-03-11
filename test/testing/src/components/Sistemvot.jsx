import { useState } from "react"
import Candid from "./Candid.jsx"
export default function Sistemvot(){
    const [pis, setPis] = useState(0)
    const [cai, setCai] = useState(0)

    const addPis = () =>{
        setPis(()=> pis + 1)
    }
    const addCai = () => {
        setCai(() => cai + 1)
    }
    return(
        <div>
            <Candid
            nume="Pisica"
            nrVot={pis}
            add={addPis}
            />
            <Candid
            nume="Caine"
            nrVot={cai}
            add={addCai}
            />
        </div>
    )
}