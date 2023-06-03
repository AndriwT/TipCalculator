import { useState, KeyboardEvent, ChangeEvent, MouseEventHandler } from "react";

const InputTip = () => {
  const [total, setTotal] = useState("");
  const [percent, setPercent] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTotal(e.target.value);
  };

  const handleClick = (e: any) => {
    setPercent(e.target.value);
    console.log(percent);
  };

  // const onSetClick = (e: MouseEventHandler<HTMLInputElement>) => {
  //   setPercent(e.target.value)
  // }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // calculate();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-12">
      <h1 className="text-3xl">Welcome to Tip-Tap!</h1>
      <div className="flex flex-col flex-center items-center main-h-screen pt-20">
        <div className="flex">
          <p className="pr-4">$</p>
          <input
            placeholder="Enter bill total"
            className="text-black"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={total}
          />
        </div>
        <fieldset className="flex pt-6 pb-6">
          <div className="flex flex-col pr-4">
            <input type="radio" name="rating" id="1" value="1" />
            <label htmlFor="1">1</label>
          </div>
          <div className="flex flex-col pr-4">
            <input type="radio" name="rating" id="2" value="2" />
            <label htmlFor="2">2</label>
          </div>
          <div className="flex flex-col pr-4">
            <input type="radio" name="rating" id="3" value="3" />
            <label htmlFor="3">3</label>
          </div>
          <div className="flex flex-col pr-4">
            <input type="radio" name="rating" id="4" value="4" />
            <label htmlFor="4">4</label>
          </div>
          <div className="flex flex-col">
            <input type="radio" name="rating" id="5" value="5" />
            <label htmlFor="5">5</label>
          </div>
        </fieldset>
        <div className="flex flex-col items-center pb-10">
          <h2>How many people are splitting the tip?</h2>
          <input placeholder="1" className="w-12 mt-4 text-black" />
        </div>
        <button
          className="bg-blue-300 px-16 py-2 rounded-md"
          onClick={handleClick}
        >
          Calculate
        </button>
      </div>
      <div className="flex mt-4">
        <h2 className="mr-4">Tip per person:</h2>
        <>
          <p>$</p>
          <p>5</p>
        </>
      </div>
    </div>
  );
};

export default InputTip;
