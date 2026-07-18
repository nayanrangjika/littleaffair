import { motion } from 'motion/react';

export function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16 bg-[#fbfbfa] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 text-center">Privacy Policy</h1>
          <div className="w-16 h-1 bg-accent mx-auto mb-12"></div>

          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 prose prose-stone max-w-none text-gray-600 font-light leading-relaxed space-y-6">
            <p className="text-sm text-gray-400">Last updated: July 18, 2026</p>
            
            <p>
              At <strong>Little Affair Sariska</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Little Affair Sariska and how we use it.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">1. Information We Collect</h2>
            <p>
              If you contact us directly or use our booking and enquiry forms, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            </p>
            <p>
              When you register for an account or make a booking, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">2. How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our website and hospitality services</li>
              <li>Improve, personalize, and expand our website experience</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
              <li>Send you emails or contact you regarding your reservation/enquiry</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">3. Log Files</h2>
            <p>
              Little Affair Sariska follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">4. Cookies and Web Beacons</h2>
            <p>
              Like any other website, Little Affair Sariska uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">5. Advertising Partners Privacy Policies</h2>
            <p>
              Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Little Affair Sariska, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p>
              Note that Little Affair Sariska has no access to or control over these cookies that are used by third-party advertisers.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">6. Third Party Privacy Policies</h2>
            <p>
              Little Affair Sariska's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">7. GDPR & CCPA Data Protection Rights</h2>
            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">8. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you have any questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>info@littleaffairsariska.com</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
