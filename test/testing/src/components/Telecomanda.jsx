export default function Telecomanda( {nextChannel, prevChannel} ){
    return(
        <div>
            <button onClick={nextChannel}>Next</button>
            <button onClick={prevChannel}>Prev</button>
        </div>
    )
}