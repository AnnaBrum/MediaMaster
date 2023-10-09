import OneSignal from "react-onesignal";
// import Head from "next/head";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <title>Media Watch</title>
          <meta
            name="description"
            content="Integrating OneSignal with a Next.js app."
          />
          <link rel="icon" href="/favicon.ico" />
          <script
            src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
            async=""
          ></script>
        </head>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </>
  );
}
