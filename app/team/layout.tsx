'use client';
import Footer from "@/components/Footer";
import Head from "next/head";

function TeamLayout({
  children
} : {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default TeamLayout