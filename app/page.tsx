'use client';

import Documentation from "@/components/Documentation";
import Dxdydz from "@/components/Dxdydz";
import History from "@/components/History";
import Integral from "@/components/Integral";
import Loading from "@/components/Loading";
import Result from "@/components/Result";
import Title from "@/components/Title";
import Script from "next/script";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import Latex from 'react-latex';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState('$xyz$');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [activeButtonIndex, setActiveButtonIndex] = useState(1);

  const handleGenerate: FormEventHandler<HTMLFormElement | HTMLButtonElement> = (e): void => {
    e.preventDefault();
    if (inputRef.current) {
      setOperations(`$${inputRef.current.value}$`);
    }
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
                <Integral />
                <Integral />
                <Integral />
              </div>
              <Latex>
                {operations}
              </Latex>
              <Dxdydz />
            </div>
            <button type="button" className="hidden sm:block btn-gradient-01 text-sm sm:text-base p-4 text-white rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" strokeWidth="2"/>
                <path d="M9 10L15 10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 14L15 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <button type="button" className="sm:hidden w-full flex justify-center items-center gap-2 btn-gradient-01 text-sm sm:text-base p-4 text-white rounded mt-4">
            Result
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" strokeWidth="2"/>
              <path d="M9 10L15 10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 14L15 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="text-xl px-4 py-6 rounded-md bg-gradient-01 mt-4">
          <form onSubmit={handleGenerate}>
            <h4 className="text-xs sm:text-sm">
              Silahkan input operasi integral disini. Jangan lupa membaca dokumentasinya:)
            </h4>
            <div className="mt-4 flex justify-between items-center gap-4">
              <input
                ref={inputRef}
                type="text"
                className="text-sm sm:text-base text-gray-800 p-4 border outline outline-2 outline-rose-500 w-full rounded"
                placeholder="xyz"
              />
              <button
                type="button"
                className="btn-active text-sm sm:text-base p-4 rounded"
                onClick={handleGenerate}
              >
                Generate
              </button>
            </div>
            <p className="text-xs mt-2">
              Input yang anda masukan harus sesuai dengan operasi didalam dokumentasi.
            </p>
          </form>
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
