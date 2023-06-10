import Image from 'next/image'
import Head from 'next/head';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function Home() {
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
              
                  <button className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 mt-5">                      
                    <Link href="/about">
                      Learn More
                    </Link>
                  </button>
              </section>
            </main>

            <Footer />
      </div>
  );
};
