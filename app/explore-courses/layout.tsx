import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Persevex",
  description: "Empowering careers",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
