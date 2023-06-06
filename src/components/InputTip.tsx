import { useState, KeyboardEvent, ChangeEvent, MouseEventHandler } from "react";
import Rating from "react-star-rating-component";

const InputTip = () => {
  const [total, setTotal] = useState("");
  const [rating, setRating] = useState(0);
  const [percent, setPercent] = useState("0.20");
  const [people, setPeople] = useState("");
  const [tip, setTip] = useState("$ 0.00");
  const [netTotal, setNetTotal] = useState("$ 0.00");
  const [netTotalPerPerson, setNetTotalPerPerson] = useState("$ 0.00");

  const handleTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTotal(e.target.value);
  };

  const handlePeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPeople(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      calculate();
    }
  };

  const handleStarClick = (nextValue: number, prevValue: number) => {
    setRating(nextValue);
    if (nextValue === 1) {
      setPercent("0.05");
    } else if (nextValue === 2) {
      setPercent("0.10");
    } else if (nextValue === 3) {
      setPercent("0.15");
    } else if (nextValue === 4) {
      setPercent("0.20");
    } else if (nextValue === 5) {
      setPercent("0.25");
    }
  };

  const calculate = () => {
    let totalNum = Number(total);
    let percentNum = Number(percent);
    let peopleNum = Number(people);
    let totalTipNum = Number(totalNum * percentNum);
    let totalTipPerPerson = (totalNum * percentNum) / peopleNum;
    let netTotalPerPerson = (totalNum + totalTipNum) / peopleNum;

    setTip("$ " + totalTipPerPerson.toFixed(2).toString());
    setNetTotal("$ " + (totalTipNum + totalNum).toFixed(2).toString());
    setNetTotalPerPerson("$ " + netTotalPerPerson.toFixed(2).toString());
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4 mb-6 bg-gray-400 rounded-3xl border-4 border-white shadow-inner">
      <div className="flex flex-col justify-center items-center rounded-t-3xl bg-gradient-to-t from-cyan-900 to-teal-500 p-6 pb-4 shadow-lg">
        <h2 className="text-xl">Welcome to</h2>
        <h1 className="text-6xl">Tip-Tap!</h1>
        <div className="flex flex-col flex-center items-center main-h-screen pt-10">
          <div className="flex items-center">
            <div>
              <h2>Bill total</h2>
              <div className="flex">
                <p className="pr-2 text-3xl">$</p>
                <input
                  className="text-white text-2xl bg-transparent border-b-2 mb-8 mr-4 h-10 w-52 outline-0"
                  onKeyDown={handleKeyDown}
                  onChange={handleTotalChange}
                  value={total}
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2>Split</h2>
              <input
                className="w-10 text-white text-2xl bg-transparent border-b-2 mb-6 h-8 outline-0"
                onKeyDown={handleKeyDown}
                onChange={handlePeopleChange}
                value={people}
              />
            </div>
          </div>
          <div className="flex flex-col items-center star-rating mb-4">
            <h3 className="text-xs">Rate your experience</h3>
            <Rating
              name="rating"
              value={rating}
              onStarClick={(nextValue, prevValue) =>
                handleStarClick(nextValue, prevValue)
              }
              starCount={5}
              starColor={"#ffb400"}
              emptyStarColor={"#ccc"}
            />
          </div>
        </div>
        <button
          className="bg-cyan-950 px-16 py-2 rounded-full shadow-lg border-b-2 transition delay-50 duration-200 ease-in-out hover:bg-teal-400 hover:border-t-2 hover:text-black hover:border-b-0 hover:border-black click:bg-teal-400"
          onClick={calculate}
        >
          Calculate!
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-xs mr-4">Net Total</h2>
          <p className="text-4xl">{netTotal}</p>
        </div>
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-xs mr-4">Split Tip</h2>
          <p className="text-4xl">{tip}</p>
        </div>
        <div className="flex flex-col items-center mt-4 mb-4">
          <h2 className="text-xs mr-4">Split Net Total</h2>
          <p className="text-4xl">{netTotalPerPerson}</p>
        </div>
      </div>
    </div>
  );
};

export default InputTip;
