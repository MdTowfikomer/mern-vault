import { useState } from "react";

export default function LotteryTicket() {
  let [lottery, setLottery] = useState({ num: 0, isWon: false });

  let generateLottery = () => {
    setLottery((prevLottery) => {
      return { ...prevLottery, num: Math.floor(Math.random() * 1000) };
    });
  };

  let checkLottery = (lotteryNum) => {
    let sum = 0;
    while (lotteryNum > 0) {
      sum += Math.floor(lotteryNum % 10);
      lotteryNum = lotteryNum / 10;
    }
    if (sum === 15) {
      return true;
    } else {  
      return false;
    }
  };
  return (
    <div>
      <h1>
        Lottery
        <span
          style={
            checkLottery(lottery.num)
              ? { display: "inline" }
              : { display: "none" }
          }
        >
          'Congratulations, you won!'
        </span>
      </h1>

      <p>Lottery Ticket = {lottery.num}</p>

      <button onClick={generateLottery}> Get New Ticket</button>
    </div>
  );
}
