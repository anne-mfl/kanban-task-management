import type { Metadata } from "next"
import "styles/app/_layout.scss"
import Sidebar from "components/Sidebar"
import Topbar from "components/Topbar"
import Providers from "@/redux/Provider"
import Modals from "components/Modals"

export const metadata: Metadata = {
  title: "Kanban",
  description: "Kanban task management web application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.png" sizes="any" />
      </head>
      <body>
        <Providers>
          <div className="layout">
            <Sidebar />
            <div className="topbar_and_main">
              <Topbar />
              {children}
            </div>
            <Modals />
          </div>
        </Providers>
      </body>
    </html>
  )
}
