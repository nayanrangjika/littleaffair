import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

export function CancellationPolicy() {
  return (
    <div className="pt-24 pb-16 bg-[#fbfbfa] min-h-screen">
      <SEO 
        title="Cancellation & Refund Policy | Little Affair Sariska"
        description="Cancellation and refund policy details for resort bookings and activity reservations at Little Affair Sariska."
        path="/cancellation-policy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 text-center">Cancellation & Refund Policy</h1>
          <div className="w-16 h-1 bg-accent mx-auto mb-12"></div>

          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 prose prose-stone max-w-none text-gray-600 font-light leading-relaxed space-y-6">
            <p className="text-sm text-gray-400">Last updated: July 18, 2026</p>
            
            <p>
              Thank you for choosing <strong>Little Affair Sariska</strong>. We understand that travel plans can change. Below are our standard cancellation and refund guidelines to ensure transparency and fairness.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">1. Cancellation Timeline & Fees</h2>
            <p>
              Cancellation charges depend on the timeframe in which the cancellation request is received prior to your scheduled check-in date:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>More than 15 Days prior to check-in:</strong> Fully refundable (minus a standard 5% administrative transaction processing fee).</li>
              <li><strong>Between 7 to 15 Days prior to check-in:</strong> 50% of the total booking amount will be charged as cancellation/retention charges.</li>
              <li><strong>Less than 7 Days prior to check-in:</strong> 100% of the total booking amount will be charged. No refund or credit will be issued.</li>
              <li><strong>No Show or Early Departure:</strong> 100% of the booking amount will be charged.</li>
            </ul>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">2. Modification Policy</h2>
            <p>
              If you wish to modify your reservation dates, request must be sent via email to <strong>info@littleaffairsariska.com</strong> at least 10 days prior to check-in. Modifications are subject to villa availability and seasonal rate changes. Date transfers are not guaranteed and might incur additional fees.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">3. Refunds Processing</h2>
            <p>
              Eligible refunds are processed directly back to the original source payment method (bank account, credit/debit card, or UPI) used at the time of reservation. 
            </p>
            <p>
              Please allow <strong>7 to 10 working days</strong> for the refunded amount to reflect in your account statement, depending on standard banking cycles.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">4. Force Majeure</h2>
            <p>
              In case of cancellations due to natural disasters, government lockdowns, political unrest, or severe weather conditions in Sariska/Tehla, we reserve the right to offer a full credit voucher redeemable for future stays within 6 months, in lieu of direct bank refunds.
            </p>

            <h2 className="text-2xl font-serif text-gray-900 pt-4">5. Contact Us</h2>
            <p>
              For cancellation requests or queries regarding our policies, please contact our support team at:
              <br />
              <strong>Email:</strong> info@littleaffairsariska.com
              <br />
              <strong>Phone:</strong> +91 78770 83719
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
