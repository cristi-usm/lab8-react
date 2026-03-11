export default function Produs({nume, add}){
    return(
        <div>
            <p>{nume}</p>
            <button onClick={add}>Adauga</button>
        </div>
    )
}