import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaClock,
} from "react-icons/fa";

function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-slate-100"
      data-aos="fade-right"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

            CONTACT US

          </span>

          <h2 className="text-5xl font-bold mt-6 text-slate-800">

            Let's Build Your Career Together

          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">

            Have a question, suggestion, or need help?
            We'd love to hear from you.

          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-14 mt-20">

          {/* LEFT */}

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <h3 className="text-3xl font-bold">

              Contact Information

            </h3>

            <p className="text-gray-600 mt-4 leading-7">

              Reach out to us through any of the following
              channels.

            </p>

            <div className="space-y-8 mt-10">

              <div className="flex gap-5 items-center">

                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">

                  <FaEnvelope size={24} />

                </div>

                <div>

                  <p className="font-semibold">

                    Email

                  </p>

                  <p className="text-gray-600">

                    careerpilot.team@gmail.com

                  </p>

                </div>

              </div>

              <div className="flex gap-5 items-center">

                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">

                  <FaLinkedin size={24} />

                </div>

                <div>

                  <p className="font-semibold">

                    LinkedIn

                  </p>

                  <p className="text-gray-600">

                    Coming Soon

                  </p>

                </div>

              </div>

              <div className="flex gap-5 items-center">

                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">

                  <FaGithub size={24} />

                </div>

                <div>

                  <p className="font-semibold">

                    GitHub

                  </p>

                  <p className="text-gray-600">

                    Coming Soon

                  </p>

                </div>

              </div>

              <div className="flex gap-5 items-center">

                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">

                  <FaClock size={24} />

                </div>

                <div>

                  <p className="font-semibold">

                    Support

                  </p>

                  <p className="text-gray-600">

                    Response within 24 Hours

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <h3 className="text-3xl font-bold">

              Send a Message

            </h3>

            <p className="text-gray-600 mt-4">

              This contact form will be connected to the backend in a future update.

            </p>

            <div className="space-y-5 mt-10">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-xl p-4"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-xl p-4"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full border rounded-xl p-4 resize-none"
              />

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
              >

                Send Message

              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;