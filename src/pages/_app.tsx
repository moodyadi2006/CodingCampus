import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./context/UserContext";
import ConductTest from "./CompanyFunctions/ConductTest/ConductTest";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <RecoilRoot>

        <Head>
          <title>CodingCampus</title>
          <meta name="description" content="Web Application That helps you to practice for 
        Online Coding problems and also You don't need to come offline to give online coding rounds" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer />
        <div className="h-screen overflow-auto">
          <Component {...pageProps} />
        </div>
        {/* <ConductTest/>
        </ConductTest> */}
      </RecoilRoot>
    </UserProvider>
  );
}
