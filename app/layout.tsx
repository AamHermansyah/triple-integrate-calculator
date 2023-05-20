import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '400', '500', '600'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="This is website for calculate triple integrate." />
        <meta name="keywords" content="Integrate, Math, Calculate" />
        <meta name="author" content="Aam Hermansyah" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css"
          integrity="sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI"
          crossOrigin="anonymous" 
        />
      </head>
      <body className={poppins.className}>
        {children}
        <footer className="p-4 pb-6">
          <div className="text-center text-sm sm:text-base">
            <p>Copyright 2023 | All Reversed</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
