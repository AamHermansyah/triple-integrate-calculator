'use client';
import Head from "next/head";

function TeamLayout({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      {children}
    </>
  )
}

export default TeamLayout