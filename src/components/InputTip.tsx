import { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import { ShareBrowser, ShareMobil } from "./Share";

const InputTip = () => {
  const [loaded, setLoaded] = useState(false);
  const [total, setTotal] = useState("");
  const [rating, setRating] = useState(0);
  const [percent, setPercent] = useState("0.20");
  const [people, setPeople] = useState("");
  const [tip, setTip] = useState("");
  const [netTotal, setNetTotal] = useState("");
  const [netTotalPerPerson, setNetTotalPerPerson] = useState("");
  const [url, setUrl] = useState<any>();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const totalParam = searchParams.get("total");
    const splitParam = searchParams.get("people");
    const ratingParam = searchParams.get("rating");
    const tipParam = searchParams.get("tip");
    const netTotalParam = searchParams.get("netTotal");
    const netTotalPerPersonParam = searchParams.get("netTotalPerPerson");

    if (ratingParam) {
      console.log("setting rating: ", ratingParam);
      setRating(Number(ratingParam));
    }
    if (totalParam) {
      setTotal(totalParam);
    }
    if (splitParam) {
      setPeople(splitParam);
    }
    if (tipParam) {
      setTip(tipParam);
    }
    if (netTotalParam) {
      setNetTotal(netTotalParam);
    }
    if (netTotalPerPersonParam) {
      setNetTotalPerPerson(netTotalPerPersonParam);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      console.log({
        total,
        people,
        tip,
        netTotal,
        rating,
        netTotalPerPerson,
      });
      const searchParams = new URLSearchParams(window.location.search);

      searchParams.set("total", String(total));
      searchParams.set("people", String(people));
      searchParams.set("tip", String(tip));
      searchParams.set("netTotal", String(netTotal));
      searchParams.set("rating", String(rating));
      searchParams.set("netTotalPerPerson", String(netTotalPerPerson));

      let params = `?${searchParams.toString()}`;

      let stateUrl = window.history.replaceState(null, "", params);
      setUrl(stateUrl);
    }
  }, [total, people, tip, netTotal, netTotalPerPerson, rating, loaded]);

  const handleTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numberInput = input.replace(/\D/g, "");
    setTotal(numberInput);
  };

  const handlePeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numberInput = input.replace(/\D/g, "");

    setPeople(numberInput);
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
      setNetTotal("$ " + (totalTipNum + totalNum).toFixed(2).toString());
    }
  };

  const mobil = () => {
    try {
      return typeof screen.orientation !== "undefined";
    } catch (error) {
      return false;
    }
  };

  const reset = () => {
    setTotal("");
    setRating(0);
    setPercent("0.20");
    setPeople("");
    setTip("");
    setNetTotal("");
    setNetTotalPerPerson("");
    setUrl("https://tiptapcalculator.netlify.app/");
  };

  return (
    <div className="flex justify-center items-end ml-12">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center mt-4 mb-4 bg-slate-500 rounded-3xl shadow-lg">
          <div className="flex flex-col justify-center items-center rounded-t-3xl bg-gradient-to-t from-purple-700 to-cyan-500 p-6 pt-2 pb-4 shadow-xl">
            <h2 className="text-xl">Welcome to</h2>
            <h1 className="text-6xl">Tip-Tap!</h1>
            <div className="flex flex-col flex-center items-center main-h-screen pt-10">
              <div className="flex items-center">
                <div>
                  <h2 className="mb-2">Bill total</h2>
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
                  <h2 className="mb-2">Split</h2>
                  <input
                    className="w-10 text-white text-2xl bg-transparent border-b-2 mb-6 h-8 outline-0"
                    onKeyDown={handleKeyDown}
                    onChange={handlePeopleChange}
                    value={people}
                  />
                </div>
              </div>
              <div
                data-tooltip-target="rating"
                className="flex flex-col items-center star-rating mb-4"
              >
                <h3 className="text-xs">Rate your experience</h3>
                {loaded && (
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
                )}
                {/*TOOLTIP*/}
                <div
                  id="rating"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                  Tip rate from 5% to 25%
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                {/*TOOLTIP*/}
              </div>
            </div>
            <button
              className="rounded-full bg-cyan-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white w-40 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-cyan-300 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-purple-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
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
        <div className="flex flex-row justify-center items-center w-100">
          <button
            className="rounded-full bg-purple-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white w-72 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-purple-300 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            onClick={reset}
          >
            RESET
          </button>
          {mobil() ? <ShareBrowser /> : <ShareMobil url={url} />}
        </div>
      </div>
    </div>
  );
};

export default InputTip;
