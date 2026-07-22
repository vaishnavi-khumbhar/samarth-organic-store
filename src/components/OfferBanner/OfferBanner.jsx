import * as MarqueeModule from "react-fast-marquee";

const Marquee =
  MarqueeModule.default?.default ?? MarqueeModule.default ?? MarqueeModule;

const OfferBanner = () => {
  return (
    <section className="bg-[#4D9F38] py-4 text-white">
      <Marquee speed={60}>
        <div className="flex gap-20 text-sm font-medium">
          <p>100% Chemical Free Organic Oil</p>
          <p>Traditional Lakdi Ghana Process</p>
          <p>Cold Pressed Organic Oil</p>
          <p>Healthy Everyday Cooking</p>
          <p>Premium Quality Products</p>
          <p>Made In Maharashtra</p>
        </div>
      </Marquee>
    </section>
  );
};

export default OfferBanner;