import React from 'react';
import Head from 'next/head';
import DotForm from '../components/dotform';
import styles from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './search';
import Link from 'next/link';



const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DOT Lookup</title>
        <meta name="description" content="A simple DOT lookup tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/">
            <span className="navbar-brand" style={{ cursor: 'pointer' }}>DOT Screener</span>
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <span className="nav-link" style={{ cursor: 'pointer' }}>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/search">
                  <span className="nav-link" style={{ cursor: 'pointer' }}>Search</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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