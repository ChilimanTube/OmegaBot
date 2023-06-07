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
              <h1 className="text-4xl font-bold">About OMEGA</h1>
              <p className="mt-4 text-lg">Learn more about OMEGA, your all-in-one Discord bot solution.</p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 space-y-8 text-center motion-safe:animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Mission</h2>
          <p className="text-lg text-gray-500 dark:text-gray-300"> Omega is a powerful and versatile bot designed to revolutionize the user experience for individuals with vision impairments on Discord servers. With its comprehensive suite of accessibility features, Omega aims to create an inclusive and welcoming environment for all users.</p>
          
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Team</h2>
          <p className="text-lg text-gray-500 dark:text-gray-300">I'm a high-school student and this project was made as a final project of my 3rd year.</p>
          
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Get in Touch</h2>
          <p className="text-lg text-gray-500 dark:text-gray-300">If you have any questions about OMEGA, don't hesitate to reach out to us. We're always here to help!</p>
        </section>

        <section className="py-20 px-4 space-y-8 text-center js-show-on-scroll">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Technical Side</h2>
          <p className="text-lg text-gray-500 dark:text-gray-300">OMEGA is a Discord bot written in JavaScript using the Discord.js library. It uses ChatGPT API for some of its functions. This page was written in TypeScript using Next.js, Tailwind.css</p>
          <div className='flex justify-between mr-40 ml-40'>
            <img src="/JSLogo.png" alt="JavaScriptLogo" className='h-20 mr-3'/>
            <img src="/NodeJS.png" alt="JavaScriptLogo" className='h-20 mr-3'/>
            <img src="/OpenAI.png" alt="JavaScriptLogo" className='h-20 mr-3'/>
            <img src="/Discord.png" alt="JavaScriptLogo" className='h-20 mr-3'/>
            <img src="/NextJS.png" alt="JavaScriptLogo" className='h-20 mr-3'/>
            <img src="/Tailwind.png" alt="JavaScriptLogo" className='h-20 mr-3'/>            
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};