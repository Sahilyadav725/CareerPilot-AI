import { FaStar, FaUserGraduate } from "react-icons/fa";

function EarlyAccessFeedback() {

  const reviews = [

    {
      title: "Early Access User",
      review:
        "The resume builder is clean, simple and very easy to use. The live preview feature makes resume creation much faster."
    },

    {
      title: "Computer Science Student",
      review:
        "CareerPilot has a modern interface and feels much better than manually creating resumes in Word."
    },

    {
      title: "Cybersecurity Learner",
      review:
        "I'm excited about the AI features and job recommendations. This platform has huge potential."
    }

  ];

  return (

    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold text-sm">

            EARLY ACCESS FEEDBACK

          </span>

          <h2 className="text-5xl font-bold mt-6 text-slate-800">

            What Our Early Users Say

          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">

            CareerPilot is continuously improving with valuable feedback from
            our early users.

          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {reviews.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow hover:shadow-2xl transition duration-300 p-8"
            >

              <div className="flex text-yellow-500 gap-1">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

              </div>

              <p className="mt-6 text-gray-600 leading-7">

                "{item.review}"

              </p>

              <div className="flex items-center gap-4 mt-8">

                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                  <FaUserGraduate size={22} />

                </div>

                <div>

                  <h3 className="font-bold">

                    {item.title}

                  </h3>

                  <p className="text-sm text-gray-500">

                    CareerPilot Community

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default EarlyAccessFeedback;