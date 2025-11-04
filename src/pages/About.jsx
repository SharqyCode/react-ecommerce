import React from "react";

const About = () => {  
  return (
    <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">
          About ShopEase
        </h1>
        <p className="text-lg leading-relaxed mb-10 text-gray-600">
          Welcome to <span className="font-semibold text-blue-700">ShopEase</span>, 
          your one-stop destination for high-quality products at unbeatable prices. 
          We’re dedicated to providing a seamless shopping experience with trust and transparency.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              Our Mission
            </h3>
            <p>
              To deliver top-quality products while ensuring a smooth and enjoyable shopping experience for every customer.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              Our Vision
            </h3>
            <p>
              To become the most trusted e-commerce platform worldwide by combining innovation, reliability, and service excellence.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              Our Promise
            </h3>
            <p>
              Secure payments, fast delivery, and 24/7 support — because customer satisfaction is our priority.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">
            Why Choose ShopEase?
          </h2>
          <ul className="space-y-3 text-left max-w-xl mx-auto text-gray-700">
            <li> Wide range of categories</li>
            <li> Fast and reliable shipping</li>
            <li> Secure checkout process</li>
            <li> Easy returns and refunds</li>
            <li> Dedicated customer support</li>
            {/* <li> Dedicated customer support</li> */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
