import { motion } from "framer-motion";
import { ShoppingBag, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="section-padding">

      <div className="container-width">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="
          relative
          bg-gradient-to-br 
          from-[#285C2A]
          via-[#4D9F38]
          to-[#86B83F]
          rounded-[28px]
          text-white
          px-6 py-8
          sm:px-10 sm:py-10
          md:px-12 md:py-12
          text-center
          overflow-hidden
          shadow-2xl
          "
        >

          {/* Glow Effects */}

          <motion.span
            animate={{ y:[0,-15,0], x:[0,10,0] }}
            transition={{duration:6, repeat:Infinity}}
            className="
            absolute -top-16 -left-16
            w-52 h-52
            bg-[#F5B800]/30
            rounded-full
            blur-3xl
            "
          />


          <motion.span
            animate={{ y:[0,15,0] }}
            transition={{duration:7, repeat:Infinity}}
            className="
            absolute -bottom-20 -right-10
            w-64 h-64
            bg-white/10
            rounded-full
            blur-3xl
            "
          />


          {/* Texture */}

          <div
            className="
            absolute inset-0 opacity-[0.06]
            "
            style={{
              backgroundImage:
              "radial-gradient(circle,white 1px,transparent 1px)",
              backgroundSize:"18px 18px"
            }}
          />


          {/* Badge */}

          <motion.span
            initial={{opacity:0,scale:.8}}
            whileInView={{opacity:1,scale:1}}
            className="
            relative
            inline-flex
            bg-[#F5B800]
            text-[#312E2A]
            px-4 py-1
            rounded-full
            text-xs
            font-extrabold
            tracking-widest
            uppercase
            shadow-md
            "
          >
            Limited Time Offer
          </motion.span>



          {/* Heading */}

          <motion.h2
            initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            className="
            relative
            mt-4
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-black
            leading-tight
            "
          >
            Choose Pure.
            <br/>
            Choose Healthy.
          </motion.h2>



          <motion.p
            initial={{opacity:0,y:20}}
            whileInView={{opacity:1,y:0}}
            className="
            relative
            mt-3
            max-w-lg
            mx-auto
            text-sm
            sm:text-base
            text-white/90
            "
          >
            Upgrade your kitchen with 100% Pure Wood Pressed Organic Oil.
          </motion.p>



          {/* Buttons */}

          {/* Buttons */}

<motion.div
  className="
  relative
  flex
  justify-center
  flex-wrap
  gap-3
  mt-6
  "
>

  {/* Shop Now */}

  <Link to="/products">

    <motion.button
      whileHover={{scale:1.05}}
      whileTap={{scale:.96}}
      className="
      flex items-center gap-2
      bg-white
      text-[#285C2A]
      px-6 py-3
      rounded-full
      font-bold
      shadow-lg
      "
    >
      <ShoppingBag size={18}/>
      Shop Now
    </motion.button>

  </Link>



  {/* Call Now */}

  <a href="tel:7620006003">

    <motion.button
      whileHover={{scale:1.05}}
      whileTap={{scale:.96}}
      className="
      flex items-center gap-2
      border-2
      border-white
      px-6 py-3
      rounded-full
      font-bold
      hover:bg-white/10
      "
    >
      <Phone size={18}/>
      Call Now
    </motion.button>

  </a>


</motion.div>
         


        </motion.div>

      </div>

    </section>
  );
};

export default CTA;