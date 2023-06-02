const InputTip = () => {
  return (
    <div className="flex flex-col justify-center pt-12">
      <h1 className="text-3xl">Welcome to Tip-Tap!</h1>
      <div className="flex flex-center items-center main-h-screen pt-20">
        <p>$</p>
        <input placeholder="Enter bill total" className="text-black" />
        <button>Calculate</button>
      </div>
    </div>
  );
};

export default InputTip;
