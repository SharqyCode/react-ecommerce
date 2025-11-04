import React from "react";

const ShippingReturns = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-600 text-center">
          Shipping & Returns
        </h1>

        <p className="text-lg mb-10 text-gray-600 text-center">
          We want you to have the best experience shopping with{" "}
          <span className="font-semibold text-blue-700">ShopEase</span>.
          Below you’ll find all the details regarding our shipping and returns policies.
        </p>

        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Shipping Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We offer fast and reliable shipping to most regions worldwide.
              Orders are processed within <strong>1–2 business days</strong> and 
              typically arrive within <strong>3–7 business days</strong>, depending on your location.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
              <li>Free standard shipping on orders over $50.</li>
              <li>Expedited shipping available for an additional cost.</li>
              <li>International shipping times may vary.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Returns & Exchanges
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We accept returns within <strong>14 days</strong> of delivery for most items
              in new and unused condition. Items must be returned in their original packaging.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
              <li>Contact our support team before sending any return.</li>
              <li>Refunds will be issued to the original payment method.</li>
              <li>Some items (like perishable goods or personal care products) may be non-returnable.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Need Help?
            </h2>
            <p className="text-gray-700">
              If you have any questions about your order, shipping, or returns, 
              feel free to reach out to our support team at{" "}
              <a
                href="mailto:support@shopease.com"
                className="text-blue-600 hover:underline"
              >
                support@shopease.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingReturns;
