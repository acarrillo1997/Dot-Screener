import Head from 'next/head';
import DotForm from '../components/DotForm';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>DOT Lookup</title>
        <meta name="description" content="A simple DOT lookup tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>DOT Lookup</h1>
        <DotForm />
      </main>
    </div>
  );
};

export default Home;