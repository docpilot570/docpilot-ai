import Head from "next/head";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  возвращаться (
    <>
      <Голова>
        <мета
          name="verify-paysera"
          содержание = " 58db8407c727c94c67bf7a0b636b16 5a"
        />
      </Head>

      <Component {...pageProps} />
      
      <Нижний колонтитул />
    </>
  );
}
