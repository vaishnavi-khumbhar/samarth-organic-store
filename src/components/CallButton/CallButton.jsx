import { Phone } from "lucide-react";

const CallButton = () => {
  return (
    <a
      href="tel:+917620006003"
      className="fixed bottom-6 right-6 z-50"
    >

      <div
        className="bg-[#F4B400]
        text-white
        p-4
        rounded-full
        shadow-xl"
      >

        <Phone size={25} />

      </div>

    </a>
  );
};

export default CallButton;