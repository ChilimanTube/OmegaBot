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

            <main className="flex-grow">
                <section className="text-center py-20">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome to OMEGA</h1>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Your accessibility Discord bot.</p>
                </section>

                <section className="flex flex-col items-center py-20 space-y-4">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Why Choose OMEGA?</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-300">OMEGA is designed to help manage and enhance your Discord servers with ease.</p>
                    <button className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400">                      
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
