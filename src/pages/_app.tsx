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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Okoro James Chizaram",
    jobTitle: "Frontend Software Engineer",
    url: "https://www.okorojames.com",
    sameAs: [
      "https://github.com/okorojames",
      "https://twitter.com/okorojames_",
      "https://www.linkedin.com/in/okorojames",
    ],
    description:
      "Frontend Software Engineer with 3+ years of experience specializing in building responsive, scalable, and user-focused web applications using React, Next.js, and TypeScript.",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Frontend Development",
      "Responsive Web Design",
      "Scalable Web Applications",
    ],
  };

  return (
    <Fragment>
      <Head>
        {generateDefaultSeo({
          title: "Okoro James Chizaram | Frontend Software Engineer",
          description:
            "Frontend Software Engineer with 3+ years of experience building responsive, scalable web applications. Specializing in React, Next.js, and TypeScript. Open to new opportunities and collaborations.",
          canonical: "https://www.okorojames.com",
          openGraph: {
            type: "website",
            locale: "en_IE",
            url: "https://www.okorojames.com",
            site_name: "Okoro James Chizaram",
            siteName: "Okoro James Chizaram",
            title: "Okoro James Chizaram | Frontend Software Engineer",
            description:
              "Frontend Software Engineer specializing in building responsive and scalable web applications. 3+ years of professional experience delivering efficient, user-focused solutions with React, Next.js, and TypeScript.",
            profile: {
              firstName: "Okoro",
              lastName: "James",
              gender: "male",
              username: "okorojames_",
            },
            images: [
              {
                url: "https://www.okorojames.com/site-preview.png",
                width: 1200,
                height: 630,
                alt: "Okoro James Chizaram - Frontend Software Engineer Portfolio",
                type: "image/png",
              },
            ],
          },
          twitter: {
            handle: "@okorojames_",
            site: "@okorojames_",
            cardType: "summary_large_image",
          },
          additionalMetaTags: [
            {
              name: "keywords",
              content:
                "Okoro James, Okoro James Chizaram, Frontend Software Engineer, Web Developer, React Developer, Next.js Developer, TypeScript, JavaScript, Tailwind CSS, Portfolio, Responsive Web Design, Scalable Web Applications",
            },
            {
              name: "author",
              content: "Okoro James Chizaram",
            },
            {
              name: "robots",
              content: "index, follow",
            },
            {
              name: "theme-color",
              content: "#0a192f",
            },
          ],
        })}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
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
