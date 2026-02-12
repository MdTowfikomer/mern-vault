import { useState } from "react"
export default function Count(){
    let [count, setCount] = useState(0);
    function incCount(){
       setCount((curCount)=>{
        return curCount+1;
       });
       setCount((curCount)=>{
        return curCount+1;
       });
    }
    return(
        <div>
            <p>count is {count}</p>
            <button onClick={incCount}>click</button>
        </div>
    )
}  