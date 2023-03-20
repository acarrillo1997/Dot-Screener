import React from 'react';
import Head from 'next/head';
import DotForm from '../components/dotform';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DOT Lookup</title>
        <meta name="description" content="A simple DOT lookup tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-5xl flex-1">
        <div className="bg-white shadow-md rounded-md overflow-hidden md:flex md:flex-row md:h-screen">
          <div className="md:w-1/2 md:h-full">
            <img
              className={`h-48 w-full object-cover md:h-full md:w-full mx-auto ${styles.image}`}
              src="/images/truck1.jpg"
              alt="Truck"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className={`text-9xl font-bold text-center md:text-center mb-6 ${styles.title}`}>DOT Lookup</h1>
            <div className="flex justify-center"> {/* Add this div to center the DotForm component */}
              <DotForm />
            </div>
          </div>
        </div>
      </main>

      <footer className={`w-full max-w-5xl text-center py-4 ${styles.footer}`}>
        <p className={`text-gray-500 text-sm ${styles.footerText}`}>&copy; 2023 Arnaldo, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
