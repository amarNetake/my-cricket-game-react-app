import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const BallWiseResult = ({ result }) => {
  return (
    <div className="flex">
      {result.map((score, index) =>
        result.length - 1 - index <= 5 ? (
          <h1 className="mx-2 font-medium text-md" key={index}>
            {score}
          </h1>
        ) : null
      )}
    </div>
  );
};

function App() {
  const [score, setScore] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [result, setResult] = useState([]);
  const [comments, setComments] = useState([]);
  const inputRef = useRef(null);
  const commentRef = useRef(null);

  function increaseScore(score){
    if(score == 'W') setWicket(prev => prev + 1);
    else if (wicket < 10) setScore((prev) => prev + parseInt(score));
    setResult([...result, score]);
  }

  function handleClick(score){
    inputRef.current.value = score;
    inputRef.current.disabled = true;
  }

  function handleSubmit(e){
    e.preventDefault();
    setComments([...comments, commentRef.current.value]);
    increaseScore(inputRef.current.value);
    commentRef.current.value = '';
    inputRef.current.disabled = false;
    inputRef.current.value = '';
    commentRef.current.focus();
  }

  return (
    <>
      <div className="w-full flex flex-col items-center bg-red-100">
        <h1 className="uppercase font-medium text-2xl">Score keeper</h1>
        <h3 className="text-lg font-normal">
          Score: {score}/{wicket}
        </h3>
        <div
          className={`flex flex-row items-center justify-center mt-3 ${
            wicket == 10 ? "hidden" : ""
          }`}
        >
          <button
            className="px-2 border border-black"
            onClick={()=>handleClick(0)}
          >
            0
          </button>
          <button
            className="px-2 border border-black"
            onClick={()=>handleClick(1)}
          >
            1
          </button>
          <button
            className="px-2 border border-black"
            onClick={()=>handleClick(2)}
          >
            2
          </button>
          <button
            className="px-2 border border-black"
            onClick={()=>handleClick(3)}
          >
            3
          </button>
          <button
            className="px-2 border border-black"
            onClick={()=>handleClick(4)}
          >
            4
          </button>
          <button
            className="px-2 border border-black"
            onClick={()=>handleClick(5)}
          >
            5
          </button>
          <button
            className="px-2 border border-black"
            onClick={()=>handleClick(6)}
          >
            6
          </button>
          <button
            className="px-2 border border-black"
            onClick={() => handleClick('W')}
          >
            Wicket
          </button>
        </div>
        <div className="flex flex-row justify-center">
          Last 6 balls: <BallWiseResult result={result} />
        </div>
        <div className="flex gap-2">
          <form action="" onSubmit={handleSubmit}>
            <input
              className="px-2 py-1 border border-black m-2"
              ref={inputRef}
              type="text"
            />
            <input
              className="px-2 py-1 border border-black m-2"
              ref={commentRef}
              type="text"
              placeholder="Commentary"
            />
            <button className="px-2 py-1 border border-black rounded-md bg-green-200" type="submit">Submit</button>
          </form>
        </div>
        <div className={`${wicket == 10 ? "block" : "hidden"} my-3 text-lg font-semibold`}>
          You scored: {score}
        </div>
        <div className="flex flex-col gap-2 items-center">
            {comments? comments.map((comment,index)=><p key={index}>{comment}</p>):null}
        </div>
      </div>
    </>
  );
}

export default App;
