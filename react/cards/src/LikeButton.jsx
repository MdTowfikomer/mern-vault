import { useState } from "react";

export default function LikeButton() {
  let [isLiked, setIsLiked] = useState(false);
  let [counter, setCounter] = useState(0);
  let toggleState = () => {
    setIsLiked(!isLiked);
    setCounter(counter+1);
  };
  let likeStyle = { color: "red" };
  return (
    <div>
      <h3>count is {counter}</h3>
      <p onClick={toggleState}>
        {isLiked ? (
          <i style={likeStyle} className="fa-solid fa-heart"></i>
        ) : (
          <i className="fa-regular fa-heart"></i>
        )}
      </p>
    </div>
  );
}
