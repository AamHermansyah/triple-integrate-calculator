import { ResolveResult, formatDate } from "@/utils/helper";
import Latex from "react-latex";
import Eye from "./icons/Eye";
import EyeClose from "./icons/EyeClose";
import Delete from "./icons/Delete";
import { FormEventHandler, useState } from "react";
import Cancel from "./icons/Cancel";
import Yes from "./icons/Yes";

type propTypes = {
  data: ResolveResult,
  onClick: (id: string) => void,
  onDeleteById: (id: string) => void,
  showSteps: string
}

function CardHistory({ data, onClick, showSteps, onDeleteById }: propTypes) {
  const regexFilter = /^[a-zA-Z.:\-\s]+$/gi;
  const [deleteByIdDisplay, setDeleteByIdDisplay] = useState(false);

  const handleDeleteById: FormEventHandler<HTMLButtonElement> = (e) => {
    const database = localStorage.getItem('history_data');
    if (database !== null) {
      let newDatabase: ResolveResult[] = JSON.parse(database);
      newDatabase = newDatabase.filter((history) => history.id !== data.id);
      localStorage.setItem('history_data', JSON.stringify(newDatabase));
      onDeleteById(data.id);
    }
    setDeleteByIdDisplay(false);
  }

  return (
    <div className="p-4 rounded border border-sky-500 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex-auto flex flex-col">
          <div>
            <Latex>
              {`$${data.func}$`}
            </Latex>
          </div>
          <div className="text-xs text-blue-300 mt-2">
            <p className="tracking-widest">
              {formatDate(new Date(data.createdAt))}
            </p>
          </div>
        </div>

        {!deleteByIdDisplay && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative w-[25px] aspect-square flex gap-2 items-center text-xs sm:text-sm uppercase"
              onClick={() => onClick(data.id)}
            >
              {showSteps === data.id ? <EyeClose /> : <Eye />}
            </button>

            <button
              type="button"
              className="relative w-[25px] p-0.5 aspect-square flex gap-2 items-center text-xs sm:text-sm uppercase"
              onClick={() => setDeleteByIdDisplay(true)}
            >
              <Delete />
            </button>
          </div>
        )}

        {deleteByIdDisplay && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative w-[25px] p-0.5 aspect-square flex gap-2 items-center text-xs sm:text-sm uppercase"
              onClick={handleDeleteById}
            >
              <Yes />
            </button>

            <button
              type="button"
              className="relative w-[25px] aspect-square flex gap-2 items-center text-xs sm:text-sm uppercase"
              onClick={() => setDeleteByIdDisplay(false)}
            >
              <Cancel />
            </button>
          </div>
        )}
      </div>
      {showSteps === data.id && (
      <div className="overflow-x-auto pb-4">
          {data.steps.map((step, index) => (
            <div
              key={`${data.id}-${index}`}
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
          ))}
        </div>
      )}

      {showSteps === data.id && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => onClick(data.id)}
            className="text-sm underline p-1 tracking-widest uppercase"
          >
            Show less
          </button>
        </div>
      )}
    </div>
  );
}

export default CardHistory;
