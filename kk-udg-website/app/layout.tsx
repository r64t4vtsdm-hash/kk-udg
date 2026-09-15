import type { Metadata } from "next";
import { Anton, Work_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "KK UDG",
  description: "Košarkaški klub Univerziteta Donja Gorica — o klubu, igrači, raspored utakmica i kontakt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="me">
      <body className={`${anton.variable} ${workSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
