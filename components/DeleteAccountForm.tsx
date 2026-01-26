'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

export function DeleteAccountForm() {
    const [isOpen, setIsOpen] = useState(false)
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
            setTimeout(() => {
                setIsOpen(false)
                setPhone('')
                setPassword('')
                setSuccess(false)
            }, 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const scrollToForm = () => {
        setIsOpen(true)
        setTimeout(() => {
            document.getElementById('delete-account-form')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 100)
    }

    return (
        <>
            {/* Delete Account Button */}
            <Button
                onClick={scrollToForm}
                variant="ghost"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
                Delete Account
            </Button>

            {/* Delete Account Form Modal */}
            {isOpen && (
                <div
                    id="delete-account-form"
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsOpen(false)
                    }}
                >
                    <div className="bg-gradient-to-br from-neutral-900 to-black border border-red-500/20 rounded-3xl p-8 max-w-md w-full relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-red-400 mb-2">Delete Account</h2>
                            <p className="text-sm text-neutral-400">
                                This action cannot be undone. All your data will be permanently deleted.
                            </p>
                        </div>

                        {success ? (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                                <p className="text-green-400 font-semibold">Account deleted successfully</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="phone" className="block text-sm text-neutral-300 mb-2">
                                        Phone Number
                                    </label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="9019058876"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="h-12 bg-black/60 border-white/20 text-white placeholder:text-neutral-500"
                                    />
                                    <p className="text-xs text-neutral-500 mt-1">Country code +91 will be added automatically</p>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm text-neutral-300 mb-2">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-12 bg-black/60 border-white/20 text-white placeholder:text-neutral-500"
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3 text-sm text-red-400">
                                        {error}
                                    </div>
                                )}

                                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                                    <p className="text-xs text-red-300 font-semibold mb-2">⚠️ Warning</p>
                                    <p className="text-xs text-neutral-300">
                                        By clicking "Delete My Account", you confirm that you want to permanently delete your account and all associated data.
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        variant="outline"
                                        className="flex-1 rounded-full"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 rounded-full bg-red-600 hover:bg-red-700 text-white"
                                        disabled={loading}
                                    >
                                        {loading ? 'Deleting...' : 'Delete My Account'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
