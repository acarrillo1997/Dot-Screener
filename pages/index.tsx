import Head from 'next/head';
import DotForm from '../components/dotform';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>DOT Lookup</title>
        <meta name="description" content="A simple DOT lookup tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-4xl mx-auto p-8">
        <div className="w-full bg-white dark:bg-gray-800 shadow-md overflow-hidden md:rounded-xl">
          <div className="flex items-center justify-center md:flex-row h-screen">
            <div className="md:w-1/2">
              <img
                className="h-48 w-full object-cover md:h-full md:w-full mx-auto"
                src="/images/truck1.jpg"
                alt="Truck"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-center md:text-left mb-6">DOT Lookup</h1>
              <DotForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
