import ClientProviders from "./ClientProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
