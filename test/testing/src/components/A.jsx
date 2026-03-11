import data from "./data.json"
import B from "./B.jsx"

export default function A(){

    return(
        <>
            {data.map((item) => {
                return (
                    <B
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        status={item.status}
                    />
                )
            })}
        </>
    )
}