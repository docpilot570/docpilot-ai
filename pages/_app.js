import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DocPilot AI</title>
      </Head>

      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.Paddle) {
            window.Paddle.Environment.set("production");
            window.Paddle.Initialize({
              token: "live_78ab03411e9dc1a8e24db5d7949",
            });
          }
        }}
      />

      <Component {...pageProps} />
    </>
  );
}
