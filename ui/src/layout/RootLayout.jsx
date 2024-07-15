import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <div>
          <Outlet />
        </div>
      </body>
    </html>
  );
}
