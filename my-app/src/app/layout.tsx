import type {Metadata} from "next";
import "./globals.css";
import Providers from "@/redux/Providers";


export const metadata: Metadata = {
    title: "Employee",
    description: "The Employee application",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
