import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
