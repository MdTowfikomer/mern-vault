import { useState } from "react";
import Ticket from "./Ticket";
import { genTicket, sum } from "./helper";

export default function Lottery({n = 3, winningSum = 15}) {
    let [ticket, setTicket] = useState(genTicket(n));
    let isWinning = sum(ticket) === winningSum;

    let buyTicket = () =>{
        setTicket(genTicket(n));
    };

    return (
        <div>
            <h1>Lottery Game!</h1>
            <Ticket ticket={ticket}></Ticket>
            <button onClick={buyTicket}>Buy New Ticket</button>
            <h3 {...isWinning && "congratulation, you won!"}></h3>
        </div>
    )


} 