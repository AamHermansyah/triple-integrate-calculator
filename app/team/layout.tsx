'use client';
import Head from "next/head";

function TeamLayout({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}

export default TeamLayout