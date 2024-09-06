import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fOne = localFont({
  src: "./fonts/font.ttf",
  variable: "--font-one",
  weight: "100 900",
});
const fTwo = localFont({
  src: "./fonts/font.woff",
  variable: "--font-two",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dark gaming",
  description: "Dark gaming rust server status",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${fOne.variable} ${fTwo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
