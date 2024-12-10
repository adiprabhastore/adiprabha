import React from "react";

const page = () => {
    return (
      <div className="flex flex-col  justify-between items-center py-4 my-auto h-fit mx-auto md:mt-10 px-5 md:px-20 bg-slate-100 text-base">
        {" "}
        {/* Breadcrumb Navigation */}
        <div className="w-full">
          <div className="text-gray-600 text-sm flex space-x-2 w-full">
            <a href="/" className="hover:text-gray-900">
              HOME
            </a>
            <span>/</span>
            <a href="/books" className="hover:text-gray-900">
              Privacy Policy
            </a>
          </div>
          <h1 className="md:text-2xl font-semibold text-gray-800 mt-3">
            Privacy Policy
          </h1>
        </div>
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md min-h-screen">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Privacy Policy
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              At our company, we are committed to protecting your{" "}
              <span className="font-semibold">privacy</span>. This Privacy
              Policy outlines how we collect, use, and protect the personal
              information you provide when visiting our website or using our
              services.
            </p>

            <p>
              <span className="font-semibold">Information Collection</span> - We
              collect personal information such as your name, email address,
              contact details, and payment information when you place an order,
              sign up for our newsletter, or interact with our website.
            </p>

            <p>
              <span className="font-semibold">Use of Information</span> - The
              information we collect is used to process your orders, provide
              customer support, send updates about your orders or services, and
              improve our website and services. We do not sell or share your
              personal information with third parties for marketing purposes.
            </p>

            <p>
              <span className="font-semibold">Cookies</span> - Our website uses
              cookies to enhance user experience and track website usage. You
              can adjust your browser settings to refuse cookies, but this may
              affect the functionality of the website.
            </p>

            <p>
              <span className="font-semibold">Data Security</span> - We
              implement security measures to protect your personal information
              from unauthorized access, alteration, or disclosure. However, no
              method of transmission over the internet is 100% secure, and we
              cannot guarantee absolute security.
            </p>

            <p>
              <span className="font-semibold">Your Rights</span> - You have the
              right to access, update, or delete your personal information. If
              you would like to exercise these rights, please contact us at the
              email provided below.
            </p>

            <p className="font-semibold">Contact Us</p>
            <p>
              If you have any questions about this Privacy Policy or how your
              personal information is handled, please reach out to us at
              privacy@ourcompany.com.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800 border-b pb-2">
            Changes to This Policy
          </h2>

          <div className="space-y-4 text-gray-700">
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and we encourage you to review our
              policy periodically to stay informed about how we are protecting
              your information.
            </p>
          </div>
        </div>
      </div>
    );
};

export default page;
