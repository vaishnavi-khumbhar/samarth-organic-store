import { Outlet } from "react-router-dom";

import Topbar from "../components/Topbar/Topbar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import WhatsappButton from "../components/WhatsappButton/WhatsappButton";
import CallButton from "../components/CallButton/CallButton";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import LoginModal from "../components/LoginModal/LoginModal";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />

      <Topbar />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <WhatsappButton />
      <CallButton />

      {/* FIX: was rendered in main.jsx as a SIBLING of <RouterProvider>,
          which means it sat OUTSIDE the router entirely. Its "Create an
          account" <Link to="/profile"> then crashed the whole app (blank
          white screen) the moment the modal actually rendered, since
          react-router's <Link> requires being inside a Router. Moving it
          here — a real descendant of the router, since MainLayout is what
          every route renders through — fixes that. */}
      <LoginModal />
    </>
  );
};

export default MainLayout;