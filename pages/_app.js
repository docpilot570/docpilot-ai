import Head from "next/head";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DocPilot AI - AI Document Generator</title>
        <meta name="description" content="Generate business documents with AI" />
      </Head>

      <Component {...pageProps} />
      
      <Footer />
    </>
  );
}
