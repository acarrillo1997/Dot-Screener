import Head from 'next/head';
import DotForm from '../components/dotform';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>DOT Lookup</title>
        <meta name="description" content="A simple DOT lookup tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src="/images/truck.jpg"
              alt="Truck"
            />
          </div>
          <div className="p-8">
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">DOT Lookup</h1>
            <DotForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
