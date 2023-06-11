import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import Head from 'next/head';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>About OMEGA - Discord Bot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        <section className="h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: "url(/bot-bg.jpg)" }}>
          <div className="bg-black bg-opacity-50 h-full flex items-center justify-center text-center">
            <div className="text-white px-4 motion-safe:animate-fadeIn">
              <h1 className="text-5xl">
                <span className="font-bold">About </span>
                <span className='font-blanka'>OMEGA</span>
                </h1>
              <p className="mt-4 text-lg">Learn more about OMEGA, your easy-to-use Discord tool.</p>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 text-center motion-safe:animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Mission</h2>
          <p className="text-lg text-gray-500 dark:text-gray-300 mb-16"> Omega is a simple yet versatile bot designed to make the user experience for individuals with vision impairments as easy as possbile. With its comprehensive suite of accessibility features, Omega aims to create an inclusive and welcoming environment for all users.</p>
          
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5">Our Team</h2>
          <h3 className='text-2xl mb-2'>Vojtěch Král</h3>
          <p className='mb-4'><i>Developer</i></p>
          <p className="text-lg text-gray-500 dark:text-gray-300 mb-16">Hi! I&apos;m a high-school student and this project was made as a final project of my 3rd year.</p>
          
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-5">Get in Touch</h2>
          <p className="text-lg text-gray-500 dark:text-gray-300">If you have any questions about OMEGA, don&apos;t hesitate to reach out to us. We&apos;re always here to help!</p>
        </section>

        <section className="py-20 px-4 space-y-8 text-center h-screen bg-fixed bg-center bg-cover bg-opacity" style={{ backgroundImage: "url(/JavaScriptBG.jpg)" }} >
         <div className='bg-gray-900 items-center text-center pb-6 pt-6 rounded-lg shadow mt-56'>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Technical Side</h2>
            <p className="text-lg text-gray-500 dark:text-gray-300 mr-5 ml-5">OMEGA is a Discord bot written in JavaScript using the Discord.js library. It uses ChatGPT API for some of its functions.</p>
            <p className="text-lg text-gray-500 dark:text-gray-300 mr-5 ml-5">This page was written in TypeScript using Next.js, Tailwind.css</p>
            <div className='flex justify-between mr-10 ml-10 bg-white rounded-lg shadow m-4 dark:bg-gray-400 pt-5 pb-5'>
              <img src="/JSLogo.png" alt="JavaScriptLogo" className='h-20 mr-3 ml-3'/>
              <img src="/NodeJS.png" alt="JavaScriptLogo" className='h-20 mr-3 ml-3'/>
              <img src="/OpenAI.png" alt="JavaScriptLogo" className='h-20 mr-3 ml-3'/>
              <img src="/Discord.png" alt="JavaScriptLogo" className='h-20 mr-3 ml-3'/>
              <img src="/NextJS.png" alt="JavaScriptLogo" className='h-20 mr-3 ml-3'/>
              <img src="/Tailwind.png" alt="JavaScriptLogo" className='h-20 mr-3 ml-3'/>            
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};