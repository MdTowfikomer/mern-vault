import { useState } from "react";

export default function LudoBoard() {
  let [move, setMove] = useState({ blue: 0, red: 0, yellow: 0, green: 0 });
  let [arr, setArr] = useState(["no moves"]);
  let updateMove = (color) => {
    // setMove((prevMove) => {
    //   return { ...prevMove, [color]: prevMove[color] + 1 };
    // });

    setArr((prevArr)=>{return [...prevArr, "Blue moves"]});
    console.log(arr);
  };

  return (
    <div>
      <h4>Game Begins</h4>
      <p>{arr}</p>
      <div className="board">
        <p>Blue moves {move.blue}</p>
        <button
          style={{ backgroundColor: "blue" }}
          onClick={() => updateMove("blue")}
        >
          +1
        </button>
        <p>Green moves{move.green}</p>
        <button
          style={{ backgroundColor: "green" }}
          onClick={() => updateMove("green")}
        >
          +1
        </button>
        <p>Red moves{move.red}</p>
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => updateMove("red")}
        >
          +1
        </button>
        <p>Yellow moves{move.yellow}</p>
        <button
          style={{ backgroundColor: "yellow", color: "black" }}
          onClick={() => updateMove("yellow")}
        >
          +1
        </button>
      </div>
    </div>
  );
}
