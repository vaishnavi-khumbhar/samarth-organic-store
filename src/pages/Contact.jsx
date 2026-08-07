import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import CTA from "../components/CTA/CTA";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", phone: "", message: "" });
      }, 2500);
    }, 1400);
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Call Us",
      lines: ["+91 7620006003", "Mon - Sat, 9am - 7pm"],
      href: "tel:+917620006003",
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: ["info@samarthorganic.com", "We reply within 24 hrs"],
      href: "mailto:info@samarthorganic.com",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      lines: ["Samarth Organic Oil", "Maharashtra, India"],
      href: "#map",
    },
    {
      icon: Clock,
      title: "Working Hours",
      lines: ["Mon - Sat: 9:00am - 6:00pm", "Sunday: Closed"],
      href: null,
    },
  ];

  const hours = [
    { day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
    { day: "Saturday", time: "9:00 AM - 5:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(63,163,77,0.35); }
          70% { box-shadow: 0 0 0 14px rgba(63,163,77,0); }
          100% { box-shadow: 0 0 0 0 rgba(63,163,77,0); }
        }
        .fade-up { animation: fadeUp 0.7s ease both; }
      `}</style>

      {/* Contact Banner */}
      <section className="relative overflow-hidden bg-[#FBF3E7] pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="relative max-w-3xl mx-auto text-center px-5 fade-up">
          <span className="inline-block bg-[#F4E3C1] text-[#8A4B12] text-xs font-semibold tracking-wide px-4 py-1.5 rounded-full mb-4">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#5C1A1A] mb-4">
            Let's Talk <span className="text-[#3FA34D]">Pure &amp; Natural</span>
          </h1>
          <p className="text-[#6b6459] text-base md:text-lg">
            Questions about our wood pressed oils, bulk orders, or the Lakdi Ghana process?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
     <section className="max-w-7xl mx-auto px-5 -mt-14 md:-mt-16 relative z-10">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {contactCards.map(({ icon: Icon, title, lines, href }, i) => {
      const Wrapper = href ? "a" : "div";

      return (
        <Wrapper
          key={title}
          href={href || undefined}
          className="
            fade-up
            group
            relative
            overflow-hidden
            rounded-3xl
            bg-white
            border border-[#E9E0CF]
            p-7
            text-center
            shadow-[0_10px_35px_rgba(0,0,0,0.08)]
            transition-all
            duration-500
            hover:-translate-y-2
            hover:shadow-[0_20px_45px_rgba(63,163,77,0.18)]
          "
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          {/* Top Gradient */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3FA34D] via-[#6AC16F] to-[#D4AF37]" />

          {/* Icon */}
          <div
            className="
              w-16 h-16
              mx-auto
              mb-5
              rounded-full
              bg-[#EAF7E7]
              flex
              items-center
              justify-center
              transition-all
              duration-500
              group-hover:bg-[#3FA34D]
              group-hover:scale-110
            "
          >
            <Icon
              size={28}
              className="text-[#3FA34D] group-hover:text-white transition-colors duration-500"
            />
          </div>

          {/* Title */}
         <h3
  className="text-2xl font-extrabold text-[#5C1A1A] mb-3 tracking-wide"
  style={{ fontFamily: "'Cormorant Garamond', serif" }}
>
  {title}
</h3>
          {/* Content */}
          <div className="space-y-1">
            {lines.map((l, index) => (
              <p
                key={index}
                className="text-[15px] leading-7 text-[#5A544C] font-medium"
              >
                {l}
              </p>
            ))}
          </div>

          {/* Bottom Hover Line */}
          <div
            className="
              absolute
              bottom-0
              left-1/2
              h-1
              w-0
              bg-[#3FA34D]
              transition-all
              duration-500
              group-hover:w-full
              group-hover:left-0
            "
          />
        </Wrapper>
      );
    })}
  </div>
</section>



      {/* Contact Form + Side Info */}
      <section className="max-w-7xl mx-auto px-5 py-20 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <div className="lg:col-span-3 fade-up">
          <div className="bg-white rounded-3xl border border-[#f2e8d8] shadow-sm p-6 md:p-10">
            <span className="text-xs font-semibold tracking-wide text-[#D98A1E]">SEND A MESSAGE</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#5C1A1A] mt-1 mb-7">
              We reply within 24 hours
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatField
                  icon={User}
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <FloatField
                  icon={Phone}
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <FloatField
                icon={Mail}
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <div className="relative">
                <MessageSquare size={17} className="absolute left-4 top-4 text-[#b0a696]" />
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  className="w-full pl-11 pr-4 pt-3.5 pb-3 rounded-xl bg-[#FDF8EF] border border-[#ecdfc9] focus:border-[#3FA34D] focus:bg-white focus:ring-4 focus:ring-[#3FA34D]/10 outline-none transition-all duration-300 resize-none text-sm text-[#2B2B28]"
                />
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3FA34D] hover:bg-[#358c42] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 disabled:opacity-90 overflow-hidden"
                style={status === "idle" ? { animation: "pulseRing 2.5s infinite" } : {}}
              >
                {status === "idle" && (
                  <>
                    Send Message 
                  </>
                )}
                {status === "sending" && (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                )}
                {status === "sent" && (
                  <>
                    Message Sent <CheckCircle2 size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Side info card */}
        <div className="lg:col-span-2 fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="bg-gradient-to-br from-[#7A2B2B] to-[#5C1A1A] text-white rounded-3xl p-8 md:p-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-3xl font-bold mb-3">Traditional Lakdi Ghana Process</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                From our wood press to your kitchen — pure, chemical-free oil, made the way
                nature intended. Reach out for bulk orders, distributorship, or just to say hello.
              </p>
            </div>

            <div className="space-y-4">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between items-center text-sm border-b border-white/15 pb-3">
                  <span className="text-white/75">{h.day}</span>
                  <span className="font-semibold">{h.time}</span>
                </div>
              ))}
            </div>
<div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-5">

  {/* Facebook */}
  <a
    href="https://www.facebook.com/share/17oNXGNVHk/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 hover:scale-110"
  >
    <FaFacebookF className="text-[16px] sm:text-[18px]" />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/samarth_organic_oil?igsh=bGRseHg1ZzVmeXl3"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] flex items-center justify-center transition-all duration-300 hover:scale-110"
  >
    <FaInstagram className="text-[16px] sm:text-[18px]" />
  </a>

  {/* YouTube */}
  <a
    href="https://youtube.com/@samarthorganicoil?si=tlO482fehMHZfqA3"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#FF0000] flex items-center justify-center transition-all duration-300 hover:scale-110"
  >
    <FaYoutube className="text-[16px] sm:text-[18px]" />
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/917620006003"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-all duration-300 hover:scale-110"
  >
    <FaWhatsapp className="text-[16px] sm:text-[18px]" />
  </a>

</div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section id="map" className="max-w-7xl mx-auto px-5 pb-20 fade-up">
        <div className="rounded-3xl overflow-hidden border border-[#f2e8d8] shadow-sm h-[380px]">
          <iframe
            title="Samarth Organic Oil Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.502671476077!2d74.269352!3d17.0480476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc17544b9d0a7d3%3A0x6c109c4074c7068a!2sSamarth%20Organic%20Oil!5e0!3m2!1sen!2sin!4v1785828364645!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <CTA />
    </>
  );
};

/* Floating label input */
const FloatField = ({ icon: Icon, label, name, value, onChange, type = "text", required }) => (
  <div className="relative">
    <Icon size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0a696]" />
    <input
      type={type}
      name={name}
      id={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full pl-11 pr-4 pt-3.5 pb-3 rounded-xl bg-[#FDF8EF] border border-[#ecdfc9] focus:border-[#3FA34D] focus:bg-white focus:ring-4 focus:ring-[#3FA34D]/10 outline-none transition-all duration-300 text-sm text-[#2B2B28]"
    />
    <label
      htmlFor={name}
      className="absolute left-11 top-3.5 text-sm text-[#b0a696] transition-all duration-200
        peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1.5 peer-focus:text-[#3FA34D]
        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
    >
      {label}
    </label>
  </div>
);

export default Contact;