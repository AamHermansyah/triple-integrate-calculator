import Latex from "react-latex";

type propTypes = {
  result: string[] | null;
}

function Result({ result }: propTypes) {
  const regexFilter = /^[a-zA-Z.:\-\s]+$/gi;

  return (
    <div className="overflow-x-auto pb-4">
      {result !== null ? result.map((step, index) => (
        <div
          key={index}
          className={`
            ${regexFilter.test(step) ||
              step.includes('Penyelesaian') ||
              step.includes('Langkah') ||
              step.includes('Jadi') 
                ? 'text-sky-500' 
                : 'bg-white text-slate-700 p-2 px-4 rounded'
            }
            ${step.includes('Penyelesaian') ||
              step.includes('Langkah')
                ? 'text-xl text-white font-semibold' : ''
            }
            mt-4
            whitespace-nowrap
            w-max
          `}
        >
          <Latex>
            {step}
          </Latex>
        </div>
      )) : (
        <p>Siuu... Hasil operasi masih kosong:(</p>
      )}
    </div>
  )
}

export default Result;