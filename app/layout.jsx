import "./globals.css";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <title>OneSignal + Next.js</title>
        <meta
          name="description"
          content="Integrating OneSignal with a Next.js app."
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          async=""
        ></script>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
