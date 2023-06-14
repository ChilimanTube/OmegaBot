// import { useState, useEffect, use } from 'react';

import Head from 'next/head';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function Home() {
  // useEffect(() => {
    
  // }, []);

  return (

    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <Head>
                <title>OMEGA - Discord Bot</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="relative flex-grow">
              <div className='motion-safe:animate-fadeIn'>
                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url(/OmegaSplash.png)" }}></div>
              </div>
              <section className="text-center py-20 z-10 relative mt-72">
                    <h1 className="text-5xl text-gray-800 dark:text-white">
                      <span className='font-bold'>Welcome to </span>
                      <span className='font-blanka'>OMEGA</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-300">Your accessibility Discord bot.</p>
                  <div className=''>
                    <button className="mx-5 py-3 px-5 text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 mt-5">                      
                      <a href="https://discord.com/api/oauth2/authorize?client_id=1101441641593700432&permissions=8&scope=bot" className="inline-flex justify-center items-center px-2">
                        Invite
                        <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </a> 
                    </button>
                    <button className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'>
                      <Link href="/about">
                        Learn More
                      </Link>
                    </button>
                  </div>
              </section>
            </main>

            <Footer />
      </div>
  );
};
