import type { Metadata } from "next";
import Head from 'next/head';
import { Providers } from "./providers";
import { Poppins } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/userContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "cxors",
  description: "URL shortening app",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={poppins.className}>
        <Providers>
          <UserProvider>{children}</UserProvider>
        </Providers>
      </body>
    </html>
  );
}
