import { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";

const InputTip = () => {
  const [total, setTotal] = useState("");
  const [rating, setRating] = useState(0);
  const [percent, setPercent] = useState("0.20");
  const [people, setPeople] = useState("");
  const [tip, setTip] = useState("$ 0.00");
  const [netTotal, setNetTotal] = useState("$ 0.00");
  const [netTotalPerPerson, setNetTotalPerPerson] = useState("$ 0.00");

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const totalParam = searchParams.get("total");
  //   if (totalParam !== null) {
  //     setTotal(totalParam);
  //   }
  // }, []);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);

  //   searchParams.set("total", String(total));

  //   let params = `?${searchParams.toString()}`;
  //   window.history.replaceState(null, "", params);
  // }, [total]);

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

    if (!people) {
      alert("Please enter Bill Total and Split amount");
    } else {
      setTip("$ " + totalTipPerPerson.toFixed(2).toString());
      setNetTotalPerPerson("$ " + netTotalPerPerson.toFixed(2).toString());
    }

    setNetTotal("$ " + (totalTipNum + totalNum).toFixed(2).toString());
  };

  const share = () => {
    alert("The URL of this page is: " + window.location.href);
  };

  return (
    <>
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
              <StarRatingComponent
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
          <div
            data-tooltip-target="tooltip-total"
            className="flex flex-col items-center mt-4"
          >
            <h2 className="text-xs mr-4">Net Total</h2>
            <p className="text-4xl">{netTotal}</p>
            {/*TOOLTIP*/}
            <div
              id="tooltip-total"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Bill total plus Tip total
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            {/*TOOLTIP*/}
          </div>
          <div
            data-tooltip-target="tooltip-split-tip-total"
            className="flex flex-col items-center mt-4"
          >
            <h2 className="text-xs mr-4">Split Tip</h2>
            <p className="text-4xl">{tip}</p>
            {/*TOOLTIP*/}
            <div
              id="tooltip-split-tip-total"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Tip total split between people
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            {/*TOOLTIP*/}
          </div>
          <div
            data-tooltip-target="tooltip-split-net-total"
            className="flex flex-col items-center mt-4 mb-4"
          >
            <h2 className="text-xs mr-4">Split Net Total</h2>
            <p className="text-4xl">{netTotalPerPerson}</p>
            {/*TOOLTIP*/}
            <div
              id="tooltip-split-net-total"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Bill total plus Tip total split between people
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            {/*TOOLTIP*/}
          </div>
        </div>
      </div>
      <div>
        <button className="text-white" onClick={share}>
          Share!
        </button>
      </div>
    </>
  );
};

export default InputTip;
