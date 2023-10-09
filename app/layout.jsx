import OneSignal from "react-onesignal";
// import Head from "next/head";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
      <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
<script>
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(function(OneSignal) {
    OneSignal.init({
      appId: "da56e34c-816e-4938-a025-90af555d5f4c",
      safari_web_id: "web.onesignal.auto.1997779e-e1de-41f4-ac74-4543cfbf0412",
      notifyButton: {
        enable: true,
      },
      allowLocalhostAsSecureOrigin: true,
    })
  });
</script>
        </head>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </>
  );
}
