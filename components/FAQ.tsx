'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What exactly is Zatch?',
    answer: 'Zatch is a live and video shopping platform where sellers showcase products through live streams and short videos, and buyers can interact, negotiate, and purchase instantly inside the app.'
  },
  {
    question: 'What is “Zatching”?',
    answer: 'Zatching is our structured bargaining system. Buyers can send an offer on a product. Sellers can accept, reject, or counter once. When both agree, the deal is locked.'
  },
  {
    question: 'Is it safe to buy on Zatch?',
    answer: 'Yes. Payments are secured through trusted gateways. Sellers are verified. Orders are tracked. Support is available if needed. Interactive does not mean unsafe. It means transparent.'
  },
  {
    question: 'How do payments work?',
    answer: 'Buyers can pay using UPI and supported payment methods inside the app. For certain negotiated or high-value deals, a small token amount may be required to reserve the order. The remaining balance is paid before delivery or at delivery based on seller settings.'
  },
  {
    question: 'Do I need a website to sell on Zatch?',
    answer: 'No. Zatch gives you your own digital storefront, live selling tools, video uploads, payment collection, and order management inside one app.'
  },
  {
    question: 'How much commission does Zatch charge?',
    answer: 'Zatch operates on a low commission model designed to help sellers keep more of their margins. Exact rates are transparent inside the seller dashboard before you go live.'
  },
  {
    question: 'Do I need to run ads to get sales?',
    answer: 'No. Zatch focuses on organic discovery through live sessions and video content. Visibility is driven by engagement, not ad spend.'
  },
  {
    question: 'Can I sell in my own language?',
    answer: 'Yes. Sellers can go live and create content in Hindi, Telugu, English, and other supported regional languages.'
  },
  {
    question: 'How is Zatch different from Instagram or traditional marketplaces?',
    answer: 'Instagram requires manual DMs, separate payment collection, and manual order tracking. Traditional marketplaces rely on static listings and fixed pricing. Zatch combines live selling, short video shopping, built-in negotiation, and instant checkout in one system.'
  },
  {
    question: 'Who is Zatch for?',
    answer: 'Buyers who want interactive shopping. Sellers who want to monetize content and close deals faster.'
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-zatch-neon" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-4 text-neutral-200">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
