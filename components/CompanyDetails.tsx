'use client'

import { motion } from 'framer-motion'
import { rise } from '@/lib/motion'

const aboutParagraphs = [
  'Zatch is a live and short-video shopping app built for how people actually buy.',
  'Watch sellers explain products on video, interact in real time, bargain instantly, and shop with confidence.',
  'Most online shopping relies on static images and text that hide the real value of a product. Zatch fixes this by letting sellers demonstrate, explain, and sell through live video and short pitches, just like offline.',
  'Discover products through short videos, join live shopping sessions, ask questions, and negotiate prices using Zatch\'s three-step bargaining flow called "Zatch it." Complete purchases with proper checkout and tracking.',
  'Zatch supports shopping in regional languages so buyers can truly understand what they are buying. Currently supported languages include Hindi, Telugu, and English.',
  'Zatch brings video discovery and real commerce together in one place. This is how online shopping should work.'
]

const privacySections = [
  {
    title: '1. Scope of Service',
    paragraphs: [
      'Zatch serves exclusively as a digital marketplace and live-streaming technology provider. We provide the infrastructure that allows independent sellers and creators to showcase products and interact with you in real time.',
      'We do not own, sell, or ship any products featured on the platform. When you make a purchase, the contract for sale is strictly between you and the seller.',
      'Our collection of your data is primarily to facilitate this introduction and ensure the technical stability of the live-streaming environment.'
    ]
  },
  {
    title: '2. Seller-Led Fulfillment and Data Sharing',
    paragraphs: [
      'Since sellers ship products themselves, we must share your delivery information (such as name, shipping address, and contact number) directly with the respective seller once a purchase is confirmed.',
      'From the moment the seller receives this information, they become an independent data fiduciary for the purpose of fulfillment.',
      'While we require sellers to respect your privacy, Zatch does not control how sellers manage their independent logistics or internal data storage. Review the specific return and privacy terms provided by each seller on their profile page before completing a transaction.'
    ]
  },
  {
    title: '3. Limitation of Liability and Disclaimer',
    paragraphs: [
      'We provide the platform on an "as-is" and "as-available" basis.',
      'Because we do not handle physical inventory or shipping, Zatch is not liable for discrepancies in shipping, lost packages, or damages occurring during transit.',
      'Our liability is limited strictly to processing of your data on our digital interface.',
      'We are not responsible for sellers\' privacy practices once your data has been shared with them for shipping your order. Any disputes regarding product quality or delivery timelines must be resolved directly with the seller through the contact information provided in your order summary.'
    ]
  },
  {
    title: '4. Collection of Interaction and Transactional Data',
    paragraphs: [
      'To provide a seamless live-shopping experience, we collect data related to your interactions during a broadcast, including live chat messages, questions asked to the host, and click-through actions on featured product pins.',
      'We use this data to improve streaming quality and provide sellers with anonymized analytics about product popularity.',
      'By participating in a live session, you acknowledge that your public comments and username are visible to the seller and other viewers, and we are not liable for how other users may interpret or react to your public interactions.'
    ]
  },
  {
    title: '5. Third-Party Links and External Logistics',
    paragraphs: [
      'Our platform may contain links to a seller\'s own websites or third-party tracking portals provided by their chosen courier services.',
      'If you leave our app to track a package or view a seller\'s external catalog, you are no longer governed by this Privacy Policy.',
      'We do not endorse or assume responsibility for the security or content of external sites. Exercise caution and review the privacy notices of any external logistics provider or seller-owned platform you interact with.'
    ]
  },
  {
    title: '6. Data Retention and Order History',
    paragraphs: [
      'While we do not ship products, we retain a record of your transactions and the data shared with sellers for the period required by Indian law (including tax and audit requirements).',
      'This allows you to access order history and supports dispute resolution mechanisms if you need to report a seller.',
      'Once the statutory retention period expires, or when data is no longer necessary to facilitate your relationship with the seller, we anonymize or delete information in accordance with our internal data lifecycle policies.'
    ]
  },
  {
    title: '7. Communications',
    paragraphs: [
      'When you use the platform or send emails or other data, information, or communication to us, you agree and understand that you are communicating with us through electronic records.',
      'You consent to receive communications via electronic records from us periodically and as required. We may communicate with you by email or by other modes of communication, electronic or otherwise.'
    ]
  },
  {
    title: '8. Account and Registration Obligations',
    paragraphs: [
      'If you use the platform, you are responsible for maintaining the confidentiality of your display name and password and for all activities that occur under them.',
      'If you provide information that is untrue, inaccurate, not current, incomplete, or not in accordance with these Terms of Use, we may indefinitely suspend, terminate, or block access to your membership and refuse access to the platform.',
      'Your mobile phone number and/or email address is treated as your primary identifier on the platform. It is your responsibility to keep these details up to date at all times.',
      'You agree to notify us promptly if your mobile phone number or email address changes by updating the same on the platform through one-time password verification.',
      'You agree that Zatch is not liable for activities or consequences of use or misuse of information under your account where you have failed to update your revised mobile phone number and/or email address on the platform.',
      'If you share or allow others access to your account on the platform (including by creating separate profiles under your account), they will be able to view and access your account information. You are solely liable for all activities undertaken under your account and any consequences arising from them.'
    ]
  },
  {
    title: '9. Data Storage and Usage Disclaimer',
    paragraphs: [
      'The company does not store, process, or retain sensitive financial information, including credit or debit card numbers, CVV codes, banking passwords, UPI PINs, or account login credentials.',
      'All such information is collected and processed directly by secure third-party payment gateway providers in accordance with their own privacy and security standards.',
      'The company may store limited personal and usage information such as name, contact details, device data, transaction references, and interaction history for platform operations, analytics, service improvement, fraud prevention, and user experience optimization.',
      'This information is used only in aggregated or anonymized form for insights and internal analysis and is not sold, rented, or traded to third parties for advertising or commercial purposes.',
      'The company is committed to protecting personal data and processes it in accordance with applicable data protection laws, including where applicable the General Data Protection Regulation (GDPR), the Central Consumer Privacy Act (CCPA), and all relevant Indian data protection laws.'
    ]
  }
]

const commercePolicies = [
  {
    title: 'Shipping Charges',
    paragraphs: [
      'Currently, sellers on Zatch have full control over their shipping process, including setting their own shipping charges based on preferred courier, location, packaging, and delivery speed.',
      'This allows sellers to manage logistics in a way that best suits their business and customers.',
      'We are actively developing our own integrated Zatch shipping service to make the process easier, faster, and more reliable.',
      'Once launched, it will offer seamless order fulfillment, simplified logistics management, and competitive shipping rates. This upcoming feature is designed to help sellers save time, improve delivery efficiency, and provide a smoother experience for both sellers and buyers.'
    ]
  },
  {
    title: 'Return Policy',
    paragraphs: [
      'Currently, returns are not available on our platform, and all purchases are considered final.',
      'We are actively working to introduce a returns feature sooner than expected because a return option is important for a safe and confident shopping experience.',
      'As the platform operates on a direct-from-seller shipping model and does not store or manage inventory, any returns introduced will be handled in coordination with the respective sellers to ensure a smooth and fair process.',
      'If you face issues with your order, including receiving the wrong item, contact our support team at support@zatch.shop. Our team will review your case carefully and do everything possible to support you.'
    ]
  },
  {
    title: 'Refund Policy',
    paragraphs: [
      'Our refund policy is under development and will be introduced soon to provide a more structured and transparent experience.',
      'If a buyer reports that a product is unsatisfactory and the issue is reviewed and approved, the refund process will be initiated accordingly.',
      'In such cases, the amount will be settled with the seller as part of the resolution process, and complete refund handling may take up to 2 to 3 weeks.',
      'We are working to make this process faster, clearer, and more convenient for both buyers and sellers in upcoming updates.'
    ]
  }
]

const slogans = [
  'Catch the product.',
  'Match the price.',
  'Snatch the deal.',
  'Just Zatch it.'
]

export function CompanyDetails() {
  return (
    <section id="details" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold">About, Privacy, and Policies</h2>
          <p className="text-neutral-200 text-lg">
            All official platform details, including privacy, shipping, returns, and refunds.
          </p>
        </motion.div>

        <motion.div
          variants={rise}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 md:p-10 space-y-5"
        >
          <h3 className="text-2xl font-semibold text-zatch-neon">About Us</h3>
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-neutral-100 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="pt-2">
            {slogans.map((line) => (
              <p key={line} className="text-lg font-semibold text-white">
                {line}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={rise}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 md:p-10"
        >
          <h3 className="text-2xl font-semibold text-zatch-neon mb-8">Privacy Policy: Zatch</h3>
          <div className="space-y-8">
            {privacySections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h4 className="text-lg font-semibold text-white">{section.title}</h4>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-neutral-200 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {commercePolicies.map((policy) => (
            <motion.article
              key={policy.title}
              variants={rise}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-3"
            >
              <h3 className="text-xl font-semibold text-zatch-neon">{policy.title}</h3>
              {policy.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm text-neutral-200 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
