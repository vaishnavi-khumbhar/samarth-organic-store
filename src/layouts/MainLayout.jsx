import { Outlet } from "react-router-dom";

import Topbar from "../components/Topbar/Topbar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import WhatsappButton from "../components/WhatsappButton/WhatsappButton";
import CallButton from "../components/CallButton/CallButton";

const MainLayout = () => {
  return (
    <>
      <Topbar />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <WhatsappButton />
      <CallButton />
    </>
  );
};

export default MainLayout;