import { Star } from "lucide-react";

const ReviewSection = () => {
  return (

    <section className="py-20 bg-[#FAF6EE]">

      <div className="max-w-7xl mx-auto px-5">

        <h2 className="text-4xl font-bold mb-10">
          Customer Reviews
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">

          {[1,2,3].map((item)=>(
            <div
              key={item}
              className="bg-white p-8 rounded-3xl shadow-lg"
            >

              <div className="flex gap-1 text-yellow-500">

                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />
                <Star fill="currentColor" />

              </div>

              <p className="mt-5 text-gray-600">
                Very pure and premium quality organic oil.
              </p>

              <h4 className="font-semibold mt-4">
                Happy Customer
              </h4>

            </div>
          ))}

        </div>

      </div>

    </section>

  );
};

export default ReviewSection;