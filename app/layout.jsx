import './globals.css';
import localFont from 'next/font/local';

const sequel_sans = localFont({
  src: [
    {
      path: './fonts/SequelSans_BoldDisplay.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SequelSans_BoldHead.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SequelSans_LightDisp.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/SequelSans_MediumHead.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/SequelSans_SemiBoldDisp.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sequel_sans.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
