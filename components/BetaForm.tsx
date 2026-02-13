'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useToast } from './ui/use-toast'
import { isValidEmail, isValidIndianPhone } from '@/lib/utils'
import { rise, scaleOnHover } from '@/lib/motion'

export function BetaForm() {
  const [formData, setFormData] = useState({
    interest: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.interest || !formData.email || !formData.phone) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive"
      })
      return
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      })
      return
    }

    if (!isValidIndianPhone(formData.phone)) {
      toast({
        title: "Invalid phone",
        description: "Please enter a valid Indian mobile number.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message
        })
        setFormData({ interest: '', email: '', phone: '' })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="beta" className="py-32 px-6 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zatch-neon/10 border border-zatch-neon/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-2 h-2 rounded-full bg-zatch-neon animate-pulse"></div>
            <span className="text-zatch-neon font-medium">Exclusive Access</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
            Join the Waitlist
          </h2>
          <p className="text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto leading-relaxed">
            Be part of the very first wave. Look out for our email once you&apos;re in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 items-center">
          <motion.div
            variants={rise}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/20">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Join the Waitlist</h3>
                <p className="text-neutral-200">Tell us how you plan to use Zatch and we’ll reach out with next steps.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-100 mb-2">Are you here to: shop or sell?</label>
                  <Select
                    value={formData.interest}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, interest: value }))}
                  >
                    <SelectTrigger className="focus-ring h-14 bg-black/50 border-white/20 hover:border-white/30 transition-all text-base rounded-xl">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="min-w-[var(--radix-select-trigger-width)] rounded-xl border border-white/20 bg-black/90 backdrop-blur">
                      <SelectItem value="shopping">I’m here to shop</SelectItem>
                      <SelectItem value="selling">I’m here to sell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-100 mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="focus-ring h-14 bg-black/50 border-white/20 hover:border-white/30 transition-all text-base rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-100 mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="focus-ring h-14 bg-black/50 border-white/20 hover:border-white/30 transition-all text-base rounded-xl"
                  />
                </div>

                <motion.div
                  variants={scaleOnHover}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-zatch-neon to-green-400 text-black hover:from-zatch-neon/90 hover:to-green-400/90 focus-ring font-bold h-16 rounded-2xl text-lg shadow-2xl shadow-zatch-neon/30 hover:shadow-zatch-neon/50 transition-all duration-300 border-2 border-white/20"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        Joining...
                      </div>
                    ) : (
                      'Join the Waitlist'
                    )}
                  </Button>
                </motion.div>

                <div className="text-center pt-4">
                  <p className="text-sm text-neutral-300">
                    We’ll keep you posted—look out for our email.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}