'use client'

import { Button } from './ui/button'

const productLinks = [
  { label: 'How It Works', href: '#about' },
  { label: 'For Buyers', href: '#buyers' },
  { label: 'For Sellers', href: '#sellers' },
  { label: 'Trust & Safety', href: '#trust' },
  { label: 'FAQs', href: '#faq' }
]

const sellerLinks = [
  { label: 'Start Selling', href: '#sellers' },
  { label: 'Seller Guidelines', href: '#details' }
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#details' },
  { label: 'Terms & Conditions', href: '#details' },
  { label: 'Return & Refund Policy', href: '#details' },
  { label: 'Token Policy', href: '#details' },
  { label: 'Dispute Resolution', href: '#details' }
]

export function SiteFooter() {
  return (
    <footer className="py-16 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10">
          <div className="xl:col-span-1">
            <h3 className="text-2xl font-bold text-zatch-neon mb-3">Zatch™</h3>
            <p className="text-neutral-200 text-sm leading-relaxed mb-4">
              India&apos;s live bargain marketplace. Live shopping. Video discovery. Strategic negotiation.
            </p>
            <p className="text-neutral-300 text-sm mb-5">Download the app and experience interactive commerce.</p>
            <Button asChild className="bg-zatch-neon text-black hover:bg-zatch-neon/90 font-semibold">
              <a
                href="https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Zatch
              </a>
            </Button>
            <p className="text-xs text-neutral-400 mt-4">App Store | Google Play</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Product</h4>
            <div className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <a key={link.label} href={link.href} className="block text-neutral-300 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Sellers</h4>
            <div className="space-y-2 text-sm">
              {sellerLinks.map((link) => (
                <a key={link.label} href={link.href} className="block text-neutral-300 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <div className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <a key={link.label} href={link.href} className="block text-neutral-300 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <div className="space-y-2 text-sm text-neutral-300">
              <a href="#faq" className="block hover:text-white transition-colors">
                Help Center
              </a>
              <a href="mailto:support@zatch.shop" className="block hover:text-white transition-colors">
                Contact Support
              </a>
              <p>support@zatch.shop</p>
              <p className="text-xs text-neutral-400">Average response time: under 24 hours</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-neutral-300 space-y-1">
          <p>© 2025 Zatch™. All rights reserved.</p>
          <p>A product of Just Emagine Pvt Ltd</p>
        </div>
      </div>
    </footer>
  )
}
