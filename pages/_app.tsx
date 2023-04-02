import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import ClientOnly from '<arnaldo_personal>/components/clientOnly';
const BrowserRouter = dynamic(() => import('react-router-dom').then((mod) => mod.BrowserRouter), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientOnly>
      <BrowserRouter>
        <Component {...pageProps} />
      </BrowserRouter>
    </ClientOnly>
  );
}

export default MyApp;
