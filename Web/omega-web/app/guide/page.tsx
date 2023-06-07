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
              <h1 className="text-4xl font-bold">Guide</h1>
              <p className="mt-4 text-lg">Learn how to unleash OMEGAs full potential.</p>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 space-y-8 text-center motion-safe:animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Basic Commands</h2>
          <h3>Utility</h3>
          <ul className=''>
            <li><b>Help</b> - <i>help</i> - displays a guide as a Discord message</li>
            <li><b>Ping</b> - <i>ping</i> - checks latency between Discord and Omega</li>
            <li><b>Timeout</b> - <i>timeout [user] [duration] [reason]</i> - timeout a user for a said duration with the specified reason</li>
            <li><b>Kick</b>- <i>kick [user] [reason] </i> - kick a user with the specified reason</li>
            <li><b>Ban</b> - <i>ban [user] [reason]</i> - bans a user with the specified reason</li>            
          </ul>
          
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Advanced Commands</h2>
          <p className="text-lg text-gray-500 dark:text-gray-300">TBD</p>
          
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">ChatGPT Integration</h2>
          <p className="text-lg text-gray-500 dark:text-gray-300">TBD</p>
        </section>       
      </main>

      <Footer />
    </div>
  );
};