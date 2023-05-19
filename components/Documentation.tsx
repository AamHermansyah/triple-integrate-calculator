import { documentation, tabs } from "@/constant/data";
import type { Documentation } from "@/constant/data";
import { useState } from "react";
import Latex from "react-latex";

import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({ subsets: ['latin'] });

function Documentation() {
  const [activeKey, setActiveKey] = useState<keyof Documentation>('squareRoot');

  return (
    <div className={quicksand.className}>
      <h1 className="text-2xl font-bold text-sky-500">
        Panduan Umum
      </h1>
      <div className="my-2 text-gray-300">
        <h4 className="text-xl font-bold text-sky-500">
          Cara menggunakan kalkulator
        </h4>
        <p>
          Berikut langkah langkah menggunakan kalkulator integral lipat tiga.
        </p>
        <ul className="list-decimal px-4 py-2">
          <li>
            Masukan operasi integral lipat tiga pada bagian kolom input yang telah disediakan dengan operasi yang sesuai dengan dokumentasi yang akan dijelaskan setelah ini
          </li>
          <li>
            Klik tombol <span className="text-sky-400 font-bold">&quot;Generate&quot;</span> untuk menghasilkan hasil operasi yang lebih mudah dipahami dan akan ditampilkan pada bagian atas kolom input.
          </li>
          <li>
            Jika operasi telah sesuai, tekan tombol sama dengan <span className="text-sky-400 font-bold">&quot;(=)&quot;</span> untuk menghitung hasil dari operasi integral lipat tiga yang telah dimasukan sebelumnya.
          </li>
          <li>
            Terakhir, output hasil akan keluar pada bagian result yang berada di bawah kolom input.
          </li>
          <li>
            Selamat menggunakan^^
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-bold text-sky-500">
          Operasi operasi
        </h4>
        <ul className="list-decimal pl-4">
          {tabs.map((tab, index) => (
            <li key={tab.key}>
              <button
                type="button"
                className="font-bold text-slate-400 tracking-wider underline hover:text-sky-500 active:scale-[1]"
                onClick={() => setActiveKey(tab.key)}
              >
                {tab.title}
              </button>
              {activeKey === tab.key && (
                <div className="relative overflow-x-auto shadow-md mt-2 mb-4 border border-sky-400 rounded sm:rounded-lg hidden-scrollbar">
                  <table className="w-full text-sm text-left text-blue-100">
                    <thead className="text-xs text-white uppercase bg-sky-500 border-b border-blue-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Contoh Operasi
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Hasil
                        </th>
                        <th scope="col" className="min-w-[300px] px-6 py-3">
                          Keterangan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentation[tab.key].map((content, index) => (
                        <tr key={index} className="border-b border-blue-400">
                          <th
                            scope="row"
                            className="px-4 py-2 font-medium text-blue-50 whitespace-nowrap"
                          >
                            {content.operation}
                          </th>
                          <td className="px-4 py-2 whitespace-nowrap border-x border-x-sky-400">
                            <Latex>
                              {content.result}
                            </Latex>
                          </td>
                          <td className="px-4 py-2 text-justify">
                            {content.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Documentation;