'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function DeleteAccountSection() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('https://zatch-i8ln.onrender.com/api/v1/user/delete-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    countryCode: '+91',
                    phone: phone.replace(/\D/g, ''), // Remove non-digits
                    password,
                    confirmDelete: 'DELETE MY ACCOUNT',
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete account')
            }

            setSuccess(true)
            setPhone('')
            setPassword('')

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section
            id="delete-account"
            className="relative py-24 px-6 overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black" />

            <div className="relative max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-neutral-900/80 to-black/80 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-3">Delete Account</h2>
                        <p className="text-neutral-400">
                            This action cannot be undone. All your data will be permanently deleted.
                        </p>
                    </div>

                    {success ? (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
                            <p className="text-green-400 font-semibold text-lg">✓ Account deleted successfully</p>
                            <p className="text-neutral-400 text-sm mt-2">Your account and all associated data have been removed.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-2">
                                    Phone Number
                                </label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="9019058876"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="h-14 bg-black/60 border-white/20 text-white placeholder:text-neutral-500 text-lg"
                                />
                                <p className="text-xs text-neutral-500 mt-2">Country code +91 will be added automatically</p>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-14 bg-black/60 border-white/20 text-white placeholder:text-neutral-500 text-lg"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-sm text-red-400">
                                    {error}
                                </div>
                            )}

                            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                                <p className="text-sm text-red-300 font-semibold mb-2">⚠️ Warning</p>
                                <p className="text-sm text-neutral-300">
                                    By clicking "Delete My Account", you confirm that you want to permanently delete your account and all associated data. This action cannot be reversed.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-lg"
                                disabled={loading}
                            >
                                {loading ? 'Deleting Account...' : 'Delete My Account'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}
