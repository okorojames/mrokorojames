import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Okoro James Chizaram — Frontend Web Developer with 3+ years of experience building responsive, scalable web applications using React, Next.js, and TypeScript."
        />
        <link rel="canonical" href="https://www.okorojames.com" />
        <link
          rel="shortcut icon"
          href="/apple-touch-icon.png"
          type="image/x-icon"
          sizes="180x180"
        />
        <link
          rel="shortcut icon"
          href="/favicon-32x32.png"
          type="image/x-icon"
          sizes="32x32"
        />
        <link
          rel="shortcut icon"
          href="/favicon-16x16.png"
          type="image/x-icon"
          sizes="16x16"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
