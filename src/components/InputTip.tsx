import { useState, KeyboardEvent, ChangeEvent, MouseEventHandler } from "react";

const InputTip = () => {
  const [total, setTotal] = useState("");
  const [percent, setPercent] = useState("0.20");
  const [people, setPeople] = useState("1");
  const [tip, setTip] = useState("$ 0");
  const [netTotal, setNetTotal] = useState("$ 0");
  const [netTotalPerPerson, setNetTotalPerPerson] = useState("$ 0");

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

  const isRatingSelected = (value: string): boolean => percent === value;

  const handleRatingClick = (e: ChangeEvent<HTMLInputElement>): void =>
    setPercent(e.currentTarget.value);

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
    <div className="flex flex-col justify-center items-center pt-8 p-8 mt-10 bg-stone-500 rounded-3xl">
      <h1 className="text-3xl">Welcome to Tip-Tap!</h1>
      <div className="flex flex-col flex-center items-center main-h-screen pt-20">
        <div className="flex items-center">
          <p className="pr-2 text-3xl">$</p>
          <input
            placeholder="Enter bill total"
            className="text-black rounded-full p-2"
            onKeyDown={handleKeyDown}
            onChange={handleTotalChange}
            value={total}
          />
        </div>
        <fieldset className="flex pt-6 pb-6">
          <div className="flex flex-col pr-4">
            <input
              type="radio"
              name="rating"
              id="1"
              value="0.05"
              checked={isRatingSelected("0.05")}
              onChange={handleRatingClick}
            />
            <label htmlFor="1">1</label>
          </div>
          <div className="flex flex-col pr-4">
            <input
              type="radio"
              name="rating"
              id="2"
              value="0.10"
              checked={isRatingSelected("0.10")}
              onChange={handleRatingClick}
            />
            <label htmlFor="2">2</label>
          </div>
          <div className="flex flex-col pr-4">
            <input
              type="radio"
              name="rating"
              id="3"
              value="0.15"
              checked={isRatingSelected("0.15")}
              onChange={handleRatingClick}
            />
            <label htmlFor="3">3</label>
          </div>
          <div className="flex flex-col pr-4">
            <input
              type="radio"
              name="rating"
              id="4"
              value="0.20"
              checked={isRatingSelected("0.20")}
              onChange={handleRatingClick}
            />
            <label htmlFor="4">4</label>
          </div>
          <div className="flex flex-col">
            <input
              type="radio"
              name="rating"
              id="5"
              value="0.25"
              checked={isRatingSelected("0.25")}
              onChange={handleRatingClick}
            />
            <label htmlFor="5">5</label>
          </div>
        </fieldset>
        <div className="flex flex-col items-center pb-10">
          <h2>How many people are splitting the tip?</h2>
          <input
            className="w-10 mt-4 text-black p-2 rounded-full"
            onKeyDown={handleKeyDown}
            onChange={handlePeopleChange}
            value={people}
          />
        </div>
        <button
          className="bg-blue-300 px-16 py-2 rounded-full"
          onClick={calculate}
        >
          Calculate
        </button>
      </div>
      <div className="flex mt-4">
        <h2 className="mr-4">Net Total:</h2>
        <>
          <p>{netTotal}</p>
        </>
      </div>
      <div className="flex mt-4">
        <h2 className="mr-4">Tip per person:</h2>
        <>
          <p>{tip}</p>
        </>
      </div>
      <div className="flex mt-4">
        <h2 className="mr-4">Net Total Per Person:</h2>
        <>
          <p>{netTotalPerPerson}</p>
        </>
      </div>
    </div>
  );
};

export default InputTip;
