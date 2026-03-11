export default function Candid({nume, nrVot, add}){
    return(
        <div>
                <p>{nume}</p>
                <p>{nrVot}</p>
                <button onClick={add}>Add</button>
        </div>
    )
}