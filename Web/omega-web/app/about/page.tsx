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
                <section className="text-center py-20">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">About OMEGA</h1>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Learn more about OMEGA, your all-in-one Discord bot solution.</p>
                </section>

                <section className="py-20 px-4 space-y-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Mission</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-300"> Omega is a powerful and versatile bot designed to revolutionize the user experience for individuals with vision impairments on Discord servers. With its comprehensive suite of accessibility features, Omega aims to create an inclusive and welcoming environment for all users.</p>
                    
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Team</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-300">I'm a high-school student and this project was made as a final project of my 3rd year.</p>
                    
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Get in Touch</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-300">If you have any questions about OMEGA, don't hesitate to reach out to us. We're always here to help!</p>
                </section>
            </main>

            <Footer />
        </div>
  );
};