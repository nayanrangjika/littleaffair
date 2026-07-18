import { motion } from 'motion/react';

export function TermsAndConditions() {
  return (
    <div className="pt-24 pb-16 bg-[#fbfbfa] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 text-center">Terms & Conditions</h1>
          <div className="w-16 h-1 bg-accent mx-auto mb-12"></div>

          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 prose prose-stone max-w-none text-gray-600 font-light leading-relaxed space-y-6">
            <p className="text-sm text-gray-400">Last updated: July 18, 2026</p>
            
            <p>
              Welcome to <strong>Little Affair Sariska</strong>!
            </p>
            <p>
              These terms and conditions outline the rules and regulations for the use of Little Affair Sariska's Website and resort services, located at Village Ghewar, Tehla, Rajgarh, Rajasthan 301410.
            </p>
            <p>
              By accessing this website we assume you accept these terms and conditions. Do not continue to use Little Affair Sariska if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">1. Cookies</h2>
            <p>
              We employ the use of cookies. By accessing Little Affair Sariska, you agreed to use cookies in agreement with the Little Affair Sariska's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">2. License & Intellectual Property</h2>
            <p>
              Unless otherwise stated, Little Affair Sariska and/or its licensors own the intellectual property rights for all material on Little Affair Sariska. All intellectual property rights are reserved. You may access this from Little Affair Sariska for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Republish material from Little Affair Sariska</li>
              <li>Sell, rent or sub-license material from Little Affair Sariska</li>
              <li>Reproduce, duplicate or copy material from Little Affair Sariska</li>
              <li>Redistribute content from Little Affair Sariska</li>
            </ul>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">3. User Reservations & Enquiries</h2>
            <p>
              By submitting an enquiry or placing a booking on this website, you warrant that all information supplied is true, accurate, and current. We reserve the right to decline, modify, or cancel any booking reservation made via our website or reservation channels due to occupancy levels, dynamic pricing errors, or general unforeseen constraints.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">4. Hyperlinking to our Content</h2>
            <p>
              The following organizations may link to our Website without prior written approval: Government agencies, Search engines, News organizations, and online directory distributors. No use of Little Affair Sariska's logo or other artwork will be allowed for linking absent a trademark license agreement.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">5. Disclaimer of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. We will not be liable for any loss or damage of any nature resulting from your use of this platform, services booked, or visits to our resort location, except as governed by applicable local Indian laws.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">6. Contact Information</h2>
            <p>
              If you have any queries regarding any of our terms, please contact us at <strong>info@littleaffairsariska.com</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
