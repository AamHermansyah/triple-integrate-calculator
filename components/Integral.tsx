import Latex from "react-latex";

function Integral() {
  const fraction = '$\\int$';

  return (
    <div className="flex relative text-[30px]">
      <Latex>
        {fraction}
      </Latex>
      <div className="integral-input-container">
        <input
          type="text"
          className="relative -left-6 -top-6 integral-input w-[25px] text-center"
        />
        <input
          type="text"
          className="relative -left-10 -bottom-4 integral-input w-[25px] text-center"
        />
      </div>
    </div>
  )
}

export default Integral;
