import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/917620006003"
      target="_blank"
      className="fixed bottom-24 right-6 z-50"
    >

      <div
        className="bg-green-500
        text-white
        p-4
        rounded-full
        shadow-xl"
      >

        <FaWhatsapp size={28} />

      </div>

    </a>
  );
};

export default WhatsappButton;