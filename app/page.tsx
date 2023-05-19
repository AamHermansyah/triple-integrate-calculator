'use client';

import ButtonResult from "@/components/ButtonResult";
import Documentation from "@/components/Documentation";
import Dxdydz from "@/components/Dxdydz";
import FormGenerate from "@/components/FormGenerate";
import History from "@/components/History";
import Integral from "@/components/Integral";
import Loading from "@/components/Loading";
import Result from "@/components/Result";
import Title from "@/components/Title";
import { calculateTripleIntegral } from "@/utils/helper";
import Script from "next/script";
import { useEffect, useState } from "react";
import Latex from 'react-latex';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState('$xyz$');
  const [activeButtonIndex, setActiveButtonIndex] = useState(1);
  const [func, setFunc] = useState('xyz');
  const [xLower, setXLower] = useState(0);
  const [xUpper, setXUpper] = useState(0);
  const [yLower, setYLower] = useState(0);
  const [yUpper, setYUpper] = useState(0);
  const [zLower, setZLower] = useState(0);
  const [zUpper, setZUpper] = useState(0);

  const handleResultButton = () => {
    const configs = {
      xLower, xUpper,
      yLower, yUpper,
      zLower, zUpper,
    }

    calculateTripleIntegral(func, configs, 100)
      // .then((result) => {
      //   console.log(`hasil`, result);
      // });
  }

  useEffect(() => {
    setTimeout(() => { 
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loading />

  return (
    <>
      <div className="px-4 sm:px-10 py-10 sm:py-14 max-w-[800px] mx-auto">
        <Title title='Triple Integral Calculator' />
        <div>
          <div className="mt-10 bg-white text-gray-800 flex justify-between items-center gap-4 text-xl pl-8 pr-4 py-8 rounded-md outline outline-sky-700 border border-sky-800 cursor-text overflow-x-auto hidden-scrollbar">
            <div className="flex items-center gap-1">
              <div className="flex">
                <Integral
                  onChangeMinIntegral={(value) => setXLower(value)}
                  onChangeMaxIntegral={(value) => setXUpper(value)}
                />
                <Integral
                  onChangeMinIntegral={(value) => setYLower(value)}
                  onChangeMaxIntegral={(value) => setYUpper(value)}
                />
                <Integral
                  onChangeMinIntegral={(value) => setZLower(value)}
                  onChangeMaxIntegral={(value) => setZUpper(value)}
                />
              </div>
              <Latex>
                {operations}
              </Latex>
              <Dxdydz />
            </div>
            <ButtonResult
              onClick={handleResultButton}
              className="hidden sm:block"
            />
          </div>
          <ButtonResult
            onClick={handleResultButton}
            className="sm:hidden w-full flex justify-center items-center gap-2 mt-3"
            title="Result"
          />
        </div>

        <div className="text-xl px-4 py-6 rounded-md bg-gradient-01 mt-4">
          <FormGenerate
            onGenerateLatex={(latexExpression) => setOperations(latexExpression)}
            onGenerateOperations={(value) => setFunc(value)}
          />
        </div>

        <div className="min-h-[200px] emerald-400 p-4 sm:p-6 mt-10 border rounded">
          <div className="flex gap-2 sm:gap-4 items-center text-sm sm:text-base mb-6 overflow-x-auto hidden-scrollbar">
            {['Result', 'History', 'Documentation']
              .map((title, index) => (
                <button
                  key={index}
                  onClick={() => setActiveButtonIndex(index)}
                  className={`py-3 px-5 ${activeButtonIndex === index ? 'btn-active rounded' : 'border-b border-b-sky-500'}`}
                >
                  {title}
                </button>
              ))}
          </div>
          <div>
            { activeButtonIndex === 0 && <Result /> }
            { activeButtonIndex === 1 && <History /> }
            { activeButtonIndex === 2 && <Documentation /> }
          </div>
        </div>
      </div>
      <Script id="title">
        {`document.title = 'Triple Integrate | Aam & Zidan'`}
      </Script>
    </>
  )
}
