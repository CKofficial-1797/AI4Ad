import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: July 7, 2025</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to Adious AI ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services,
            including creating, managing, and optimizing digital advertisements on platforms such as Google Ads, Meta Ads, and TikTok Ads.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, company name.</li>
            <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely through third-party providers).</li>
            <li><strong>Account Data:</strong> Login credentials, preferences, settings, and user behavior within the app.</li>
            <li><strong>Ad Campaign Data:</strong> Ad copy, creative assets, targeting parameters, budgets, performance metrics.</li>
            <li><strong>Device & Usage Data:</strong> IP address, browser type, pages visited, cookies, device identifiers.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            We use your data to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide and maintain our services including AI ad generation, campaign automation, and analytics.</li>
            <li>Process payments and subscriptions.</li>
            <li>Analyze and improve ad performance via statistical visuals, A/B testing, and optimization tools.</li>
            <li>Communicate with you about updates, features, and support.</li>
            <li>Ensure the security and integrity of our systems.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Sharing Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            We may share your data with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Third-Party Platforms:</strong> Google Ads, Meta Ads, TikTok Ads for campaign execution.</li>
            <li><strong>Service Providers:</strong> Payment processors, analytics tools, cloud hosting providers.</li>
            <li><strong>Legal Compliance:</strong> To comply with legal obligations, court orders, or government requests.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Retention of Data</h2>
          <p className="text-gray-700 leading-relaxed">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Access, correct, or delete your personal information.</li>
            <li>Object to or restrict processing of your data.</li>
            <li>Request data portability.</li>
            <li>Withdraw consent at any time where applicable.</li>
          </ul>
          <p className="mt-2 text-gray-700">
            Please contact us at <a href="mailto:support@adios.ai" className="text-blue-600 underline">support@adios.ai</a> to exercise these rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Children’s Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our service does not address anyone under the age of 16. We do not knowingly collect personal identifiable information from children under 16. In the case we discover that a child under 16 has provided us with personal information, we immediately delete this from our servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the “Last Updated” date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <address className="not-italic mt-2 text-gray-700">
            Adious AI<br />
            Email: <a href="mailto:support@adios.ai" className="text-blue-600 underline">support@adios.ai</a>
          </address>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;