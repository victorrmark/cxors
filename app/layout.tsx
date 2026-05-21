import type { Metadata } from "next";
// import Head from 'next/head';
import { UserProvider } from "./context/userContext";
import { createClient } from "@/lib/supabase/server";
import { Providers } from "./providers";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "cxors",
  description: "URL shortening app",
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      {/* <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <body className={poppins.className}>
        <Providers>
          <UserProvider initialUser={user}>
            {children}
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
