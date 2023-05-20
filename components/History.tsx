import { FormEventHandler, useEffect, useState } from "react";
import CardHistory from "./CardHistory";
import { ResolveResult } from "@/utils/helper";
import { Triangle } from "react-loader-spinner";

function History() {
  const [histories, setHistories] = useState<ResolveResult[]>([]);
  const [showSteps, setShowSteps] = useState<string>('');
  const [clearAllDisplay, setClearAllDisplay] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClearAll: FormEventHandler<HTMLButtonElement> = (e) => {
    setLoading(true);
    setTimeout(() => { 
      localStorage.removeItem('history_data');
      setHistories([]);
      setClearAllDisplay(false);  
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    const database = localStorage.getItem('history_data');
    if (database !== null) {
      setHistories(JSON.parse(database));
    }
  }, []);

  return (
    <div>
      {histories.length === 0 && (
        <p>History masih kosong kek dia:)</p>
      )}

      <div>
        {histories.length > 0 && (
          <div className="flex justify-end gap-2 py-2">
            {clearAllDisplay && (
              <button
                type="button"
                className="p-2 text-sm text-red-500 font-semibold"
                onClick={handleClearAll}
                disabled={loading}
              >
                Yes!
              </button>
            )}
            {clearAllDisplay && (
              <button
                type="button"
                className="p-2 text-sm"
                onClick={() => setClearAllDisplay(false)}
                disabled={loading}
              >
                Cancel
              </button>
            )}
            {!clearAllDisplay && (
              <button
                type="button"
                className="p-2 text-sm underline text-red-500"
                onClick={() => setClearAllDisplay(true)}
                disabled={loading}
              >
                Clear All
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center">
            <Triangle
              height="80"
              width="80"
              color="#009fc2"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              visible={true}
            />
            <h2 className="sm:text-lg text-white opacity-80 tracking-wider mt-4 uppercase animate-pulse">
              Ana lagi bersihin bentar!
            </h2>
          </div>
        )}

        {!loading && histories.length > 0 && histories.map((history) => (
          <CardHistory
            key={history.id}
            data={history}
            showSteps={showSteps}
            onClick={(id) => {
              if (id === showSteps) setShowSteps('');
              else setShowSteps(id);
            }}
            onDeleteById={(id) => {
              setHistories((histories) => histories.filter((history) => history.id !== id));
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default History;