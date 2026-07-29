import Head from "next/head";
import { FifthSection } from "@/components/hero-components/fifth-section";
import { FirstSection } from "@/components/hero-components/first-section";
import { FourthSection } from "@/components/hero-components/fourth-section";
import { SecondSection } from "@/components/hero-components/second-section";
import { SocialHandles } from "@/components/hero-components/social-handles";
import { ThirdSection } from "@/components/hero-components/third-section";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.okorojames.com" />
        <meta property="og:url" content="https://www.okorojames.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Okoro James Chizaram",
              url: "https://www.okorojames.com",
              description:
                "Frontend Software Engineer Portfolio — React, Next.js, TypeScript",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://www.okorojames.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>
      <main className="relative max-w-360 mx-auto px-8 md:px-12 mb-12.5">
        {/* first section */}
        <FirstSection />
        {/* second section */}
        <SecondSection />
        {/* third section */}
        <ThirdSection />
        {/*  */}
        <FourthSection />
        {/*  */}
        <FifthSection />
        {/*  */}
        <SocialHandles />
      </main>
    </>
  );
}
