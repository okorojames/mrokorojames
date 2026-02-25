import LenisProvider from "@/components/LenisProvider";
import { Navbar } from "@/components/navbar/navbar";
import { QueryProvider } from "@/providers/query-provider";
import "@/styles/globals.css";
import { generateDefaultSeo } from "next-seo/pages";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Desktop-only: load MagneticCursor lazily, skip SSR
const MagneticCursor = dynamic(() => import("@/components/MagneticCursor"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        {generateDefaultSeo({
          title: "Okoro James",
          description: "Okoro James's portfolio site",
          canonical: "https://okorojames.vercel.app",
          openGraph: {
            type: "website",
            locale: "en_IE",
            url: "https://okorojames.vercel.app",
            site_name: "Okoro James",
            siteName: "Okoro James",
            title: "Okoro James",
            description: "Okoro James's portfolio site",
            profile: {
              firstName: "Okoro",
              lastName: "James",
              gender: "male",
              username: "okorojames_",
            },
            images: [
              {
                url: "https://okorojames.vercel.app/site-preview.png",
                width: 800,
                height: 600,
                alt: "Og Image Alt",
                type: "image/jpeg",
              },
              {
                url: "https://okorojames.netlify.app/site-preview.png",
                width: 900,
                height: 800,
                alt: "Og Image Alt Second",
                type: "image/jpeg",
              },
              { url: "https://okorojames.vercel.app/site-preview.png" },
              { url: "https://okorojames.netlify.app/site-preview.png" },
            ],
          },
          twitter: {
            handle: "@okorojames_",
            site: "@okorojames_",
            cardType: "summary_large_image",
          },
        })}
      </Head>
      <MagneticCursor />
      <LenisProvider>
        <Navbar />
        <QueryProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </QueryProvider>
      </LenisProvider>
    </Fragment>
  );
}
