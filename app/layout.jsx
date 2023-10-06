import "./globals.css";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
<<<<<<< HEAD
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
=======
>>>>>>> parent of 8e29e37 (Added onesignal service worker file)
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
