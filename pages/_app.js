import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="verify-paysera" content="58db8407c727c94c67bf7a0b636b165a" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
