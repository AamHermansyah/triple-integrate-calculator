import { convertOperationsToLatex, convertSemiLatexToAlgebra, countSameChar, isValidFormGenerate } from "@/utils/helper";
import { FormEventHandler, useRef, useState } from "react";

interface propTypes {
  onGenerateLatex: (latexOperation: string) => void,
  onGenerateOperations: (latexOperation: string) => void,
  onClear: () => void
}

function FormGenerate({ onGenerateLatex, onGenerateOperations, onClear }: propTypes) {
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleGenerate: FormEventHandler<HTMLFormElement | HTMLButtonElement> = (e): void => {
    e.preventDefault();
    if (!inputRef.current) return;

    setErrorMessage('');
    let value = inputRef.current.value;

    const validation = isValidFormGenerate(value);
    if(validation !== 'ok') {
      setErrorMessage(validation);
      return;
    }

    onGenerateOperations(convertSemiLatexToAlgebra(value));
    onGenerateLatex(convertOperationsToLatex(value));
  }

  return (
    <form onSubmit={handleGenerate}>
      <h4 className="text-xs sm:text-sm">
        Silahkan input operasi integral disini. Jangan lupa membaca dokumentasinya:)
      </h4>
      <div className="mt-4 flex justify-between items-center gap-4">
        <input
          ref={inputRef}
          type="text"
          className={`
            ${errorMessage ? 'outline outline-2 outline-rose-500' : ''}
            text-sm sm:text-base text-gray-800 p-4 border w-full rounded`
          }
          placeholder="x * y * z"
        />
        <div className="flex gap-4">
          <button
            type="button"
            className="btn-active text-sm sm:text-base p-4 rounded"
            onClick={handleGenerate}
          >
            Generate
          </button>
          <button
            type="button"
            className="bg-red-500 text-sm sm:text-base p-4 rounded"
            onClick={() => {
              onClear();
              if (inputRef.current) {
                inputRef.current.value = '';
              }
            }}
          >
            Clear
          </button>
        </div>
      </div>
      {errorMessage && (
        <p className="text-xs mt-2">
          {errorMessage}
        </p>
      )}
    </form>
  )
}

export default FormGenerate