'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { rise } from '@/lib/motion'

const teamMembers = [
  {
    name: 'Rakshit Gade',
    role: 'Founder & CEO',
    bio: 'Rakshit leads the vision and strategy behind Zatch™. With experience across product, business analysis, and enterprise systems, he focuses on building scalable platforms that solve real behavioral problems in digital commerce. He believes the next evolution of shopping in India will be content-led, community-driven, and negotiation-enabled.'
  },
  {
    name: 'Rigved Kaleru',
    role: 'Co-founder & CPTO',
    bio: 'Rigved leads technology and product architecture at Zatch™. He is responsible for building the live-streaming infrastructure, transaction systems, and scalable backend that powers real-time interaction. His focus is on creating a seamless, high-performance platform optimized for India\'s mobile-first users.'
  },
  {
    name: 'Lucky Preetham Rayi',
    role: 'Chief Marketing Officer',
    bio: 'Lucky leads growth, brand strategy, and creator ecosystem development. He focuses on building community, onboarding sellers, and shaping Zatch™ into a movement rather than just an app. His work centers on connecting culture, commerce, and content.'
  }
]

export function FutureAndAbout() {
  const scrollToBeta = () => {
    document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToSellers = () => {
    document.getElementById('sellers')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-14">
        <motion.div
          id="final-cta"
          variants={rise}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-zatch-neon/10 via-white/5 to-transparent p-8 md:p-12 text-center"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-300 mb-4">The Future Is Live. Are You In?</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">This Is Where Commerce Is Going.</h2>
          <p className="text-lg md:text-xl text-neutral-100">Live. Video-first. Negotiable. Be early. Not late.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-10">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">For Buyers</h3>
              <p className="text-neutral-200">Experience shopping that feels alive. Catch better deals. Zatch your price.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">For Sellers</h3>
              <p className="text-neutral-200">Turn your content into income. Go live. Close faster. Keep more margin.</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={scrollToBeta}
              className="bg-zatch-neon text-black hover:bg-zatch-neon/90 focus-ring font-semibold px-8"
            >
              Download Zatch
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToSellers}
              className="border-white/25 bg-transparent text-white hover:bg-white/10 font-semibold px-8"
            >
              Start Selling Today
            </Button>
          </div>
          <p className="mt-5 text-sm text-neutral-300">Available on iOS and Android. Simple onboarding. No website needed.</p>
        </motion.div>

        <motion.div
          id="about-zatch"
          variants={rise}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold">About Zatch™</h2>

          <div>
            <h3 className="text-2xl font-semibold text-zatch-neon mb-3">Our Vision</h3>
            <p className="text-neutral-200">
              To become India&apos;s leading live commerce ecosystem where buying and selling feel human again.
            </p>
            <p className="text-neutral-200 mt-3">
              We envision a marketplace where shopping is interactive, content drives commerce, pricing is dynamic,
              and sellers build communities, not just listings.
            </p>
            <p className="text-neutral-200 mt-3">
              The future of commerce is live, visual, and negotiable. Zatch™ is built to lead that future.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-zatch-neon mb-3">Our Mission</h3>
            <p className="text-neutral-200">
              To empower Indian sellers to monetize video and close sales faster. To give buyers confidence through
              live interaction and transparent negotiation.
            </p>
            <p className="text-neutral-200 mt-3">
              To remove the friction of DMs, manual follow-ups, and static catalogs.
            </p>
            <p className="text-neutral-200 mt-3">
              We are building a system where one live session can replace hundreds of manual conversations, one short
              video can convert instantly, and one negotiation can close in seconds. Commerce should feel alive.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-zatch-neon mb-3">Why We Started Zatch™</h3>
            <p className="text-neutral-200">
              Indian shopping has always been conversational. In physical markets, people talk, ask questions,
              negotiate, and build trust face to face. Digital commerce removed that interaction.
            </p>
            <p className="text-neutral-200 mt-3">
              Zatch™ brings it back in a scalable, structured way by combining live selling, short video discovery,
              and strategic bargaining into one unified platform built for India&apos;s mobile-first generation.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-zatch-neon mb-4">Founding Team</h3>
            <p className="text-neutral-200 mb-5">
              Zatch™ is built by founders who combine product, technology, and growth expertise.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {teamMembers.map((member) => (
                <article key={member.name} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                  <p className="text-zatch-neon text-sm mb-3">{member.role}</p>
                  <p className="text-sm text-neutral-200 leading-relaxed">{member.bio}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-neutral-100 text-lg">Zatch™ is not just building another marketplace.</p>
            <p className="text-neutral-100 text-lg">We are building a live commerce movement designed for India.</p>
            <p className="text-zatch-neon text-xl font-semibold mt-3">Catch it. Match it. Snatch it.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
