import Latex from "react-latex";

interface propTypes {
  onChangeMinIntegral: (value: number) => void,
  onChangeMaxIntegral: (value: number) => void
}

function Integral({ onChangeMaxIntegral, onChangeMinIntegral }: propTypes) {
  const fraction = '$\\int$';

  return (
    <div className="flex relative text-[30px]">
      <Latex>
        {fraction}
      </Latex>
      <div className="integral-input-container">
        <input
          type="number"
          defaultValue="0"
          className="relative -left-6 -top-6 integral-input w-[25px] text-center"
          onChange={(e) => onChangeMaxIntegral(+e.target.value)}
        />
        <input
          type="number"
          defaultValue="0"
          className="relative -left-10 -bottom-4 integral-input w-[25px] text-center"
          onChange={(e) => onChangeMinIntegral(+e.target.value)}
        />
      </div>
    </div>
  )
}

export default Integral;
