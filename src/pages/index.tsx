import App from "@/components/App";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Tip-Tap</title>
      </Head>
      <main className="flex justify-center items-center">
        <App />
      </main>
    </>
  );
}
