'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { STARTZATCHING_REFERRAL_THRESHOLD, STARTZATCHING_TARGET_DATE } from '@/lib/startzatching/logic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'startzatching-participant'

const SHARE_PLATFORMS = [
    { id: 'x', label: 'Share on X' },
    { id: 'instagram', label: 'Share on Instagram' },
    { id: 'facebook', label: 'Share on Facebook' },
    { id: 'linkedin', label: 'Share on LinkedIn' },
    { id: 'whatsapp', label: 'Share on WhatsApp' },
] as const

type ParticipantState = {
    participantId: string
    discount: number
    initialDiscount: number
    ordersAllowed: number
    initialOrders: number
    couponCode: string
    referralLink: string
    referralCount: number
    referralTarget: number
    sharesUsed: string[]
}

type ParticipantPayload = Partial<ParticipantState> & {
    participantId: string
}

type ViewState = 'countdown' | 'form' | 'result'

type Countdown = {
    days: string
    hours: string
    minutes: string
    seconds: string
    complete: boolean
}

const initialCountdown: Countdown = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    complete: false,
}

function pad(value: number) {
    return value.toString().padStart(2, '0')
}

const MAX_IMAGE_DIMENSION = 1600
const COMPRESSION_THRESHOLD = 1.5 * 1024 * 1024 // 1.5 MB

function formatBytes(bytes: number) {
    if (!Number.isFinite(bytes)) return `${bytes} B`
    if (bytes < 1024) return `${bytes} B`
    const units = ['KB', 'MB', 'GB']
    let value = bytes / 1024
    let unitIndex = 0
    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024
        unitIndex++
    }
    return `${value.toFixed(1)} ${units[unitIndex]}`
}

async function optimiseScreenshot(file: File) {
    if (typeof window === 'undefined') {
        return { file, originalSize: file.size }
    }

    if (!file.type.startsWith('image/')) {
        return { file, originalSize: file.size }
    }

    if (file.size <= COMPRESSION_THRESHOLD) {
        return { file, originalSize: file.size }
    }

    const imageUrl = URL.createObjectURL(file)

    try {
        const image = await new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = imageUrl
        })

        const longestEdge = Math.max(image.width, image.height)
        const scale = longestEdge > MAX_IMAGE_DIMENSION ? MAX_IMAGE_DIMENSION / longestEdge : 1

        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)

        const context = canvas.getContext('2d')
        if (!context) {
            return { file, originalSize: file.size }
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height)

        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, 'image/jpeg', 0.82)
        )

        if (!blob) {
            return { file, originalSize: file.size }
        }

        const optimisedFile = new File(
            [blob],
            (file.name.replace(/\.[^.]+$/, '') || 'countdown') + '.jpg',
            { type: 'image/jpeg' }
        )

        return { file: optimisedFile, originalSize: file.size }
    } finally {
        URL.revokeObjectURL(imageUrl)
    }
}

async function convertHeicIfNeeded(file: File) {
    const name = file.name?.toLowerCase() ?? ''
    const isHeic = file.type?.toLowerCase().includes('heic') || name.endsWith('.heic')

    if (!isHeic) {
        return file
    }

    try {
        const heic2any = (await import('heic2any')).default
        const converted = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.82,
        })

        if (!converted) {
            return file
        }

        const blobArray = Array.isArray(converted) ? converted : [converted]
        return new File(blobArray, (file.name.replace(/\.[^.]+$/, '') || 'countdown') + '.jpg', {
            type: 'image/jpeg',
        })
    } catch (error) {
        console.error('[startzatching] HEIC conversion failed', error)
        return file
    }
}

function calculateCountdown(target: Date): Countdown {
    const now = Date.now()
    const diff = target.getTime() - now

    if (diff <= 0) {
        return { ...initialCountdown, complete: true }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    return {
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
        complete: false,
    }
}

export function StartZatching() {
    const searchParams = useSearchParams()
    const [view, setView] = useState<ViewState>('countdown')
    const [countdown, setCountdown] = useState<Countdown>(initialCountdown)
    const [referralCode, setReferralCode] = useState<string | null>(null)
    const [screenshot, setScreenshot] = useState<File | null>(null)
    const [screenshotInfo, setScreenshotInfo] = useState<{ name: string; size: number; originalSize?: number } | null>(null)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [optimizingScreenshot, setOptimizingScreenshot] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [participant, setParticipant] = useState<ParticipantState | null>(null)
    const [shareLoading, setShareLoading] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const tick = () => setCountdown(calculateCountdown(STARTZATCHING_TARGET_DATE))

        tick()
        const interval = setInterval(tick, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const ref = searchParams.get('ref')
        if (ref) {
            setReferralCode(ref)
        }
    }, [searchParams])

    const applyParticipant = useCallback((data: ParticipantPayload, nextView: ViewState = 'result') => {
        const nextState: ParticipantState = {
            participantId: data.participantId,
            discount: data.discount ?? 0,
            initialDiscount: data.initialDiscount ?? data.discount ?? 0,
            ordersAllowed: data.ordersAllowed ?? 1,
            initialOrders: data.initialOrders ?? data.ordersAllowed ?? 1,
            couponCode: data.couponCode ?? '',
            referralLink: data.referralLink ?? '',
            referralCount: data.referralCount ?? 0,
            referralTarget: data.referralTarget ?? STARTZATCHING_REFERRAL_THRESHOLD,
            sharesUsed: data.sharesUsed ?? [],
        }

        if (typeof window !== 'undefined') {
            window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ participantId: nextState.participantId })
            )
        }

        setParticipant(nextState)
        setView(nextView)
    }, [])

    const fetchExistingParticipant = useCallback(async (id: string) => {
        try {
            const response = await fetch(`/api/startzatching/${id}`)

            if (!response.ok) {
                throw new Error('Not found')
            }

            const payload = await response.json()
            applyParticipant(payload)
        } catch (error) {
            console.warn('[startzatching] Unable to restore participant', error)
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(STORAGE_KEY)
            }
        }
    }, [applyParticipant])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        const stored = window.localStorage.getItem(STORAGE_KEY)

        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (parsed?.participantId) {
                    fetchExistingParticipant(parsed.participantId)
                }
            } catch (error) {
                console.warn('[startzatching] Failed to parse stored participant', error)
            }
        }
    }, [fetchExistingParticipant])

    const handleStart = () => {
        setView(participant ? 'result' : 'form')
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!screenshot) {
            setError('Please upload a screenshot of the countdown timer.')
            return
        }

        setSubmitting(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('screenshot', screenshot)

            if (referralCode) {
                formData.append('referralCode', referralCode)
            }

            const response = await fetch('/api/startzatching', {
                method: 'POST',
                body: formData,
            })

            const payload = await response.json()

            if (!response.ok) {
                throw new Error(payload?.message ?? 'Unable to join the challenge right now.')
            }

            applyParticipant(payload)
            setEmail('')
            setPhone('')
            setScreenshot(null)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Unexpected error. Please try again.')
            }
        } finally {
            setSubmitting(false)
        }
    }

    const handleShare = async (platform: string) => {
        if (!participant) {
            return
        }

        setShareLoading(platform)
        setError(null)

        try {
            const response = await fetch('/api/startzatching/share', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ participantId: participant.participantId, platform }),
            })

            const payload = await response.json()

            if (!response.ok) {
                throw new Error(payload?.message ?? 'Unable to record social share.')
            }

            applyParticipant({ ...participant, ...payload }, 'result')
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Unexpected error while applying share.')
            }
        } finally {
            setShareLoading(null)
        }
    }

    const handleRefresh = async () => {
        if (!participant) {
            return
        }

        await fetchExistingParticipant(participant.participantId)
    }

    const handleReset = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(STORAGE_KEY)
        }

        setParticipant(null)
        setReferralCode(null)
        setView('countdown')
        setError(null)
    }

    const handleCopy = async () => {
        if (!participant) {
            return
        }

        try {
            await navigator.clipboard.writeText(participant.referralLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch (error) {
            console.error('[startzatching] Failed to copy referral link', error)
        }
    }

    const referralProgress = useMemo(() => {
        if (!participant) {
            return 0
        }
        return Math.min(100, Math.round((participant.referralCount / participant.referralTarget) * 100))
    }, [participant])

    const showResult = view === 'result' && participant

    return (
        <section id="startzatching" className="py-24 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-200">
                        Start Zatching Challenge · Launches 14 Feb 2026
                    </span>
                    <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold">Countdown to the Start Zatching Challenge</h2>
                    <p className="mt-4 text-neutral-200 max-w-2xl mx-auto">
                        Capture the countdown, claim your launch discount, and unlock more rewards by inviting friends.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-8">
                        {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => {
                            const values: [string, string, string, string] = [
                                countdown.days,
                                countdown.hours,
                                countdown.minutes,
                                countdown.seconds,
                            ]

                            return (
                                <div key={label} className="rounded-2xl bg-black/40 border border-white/10 py-6">
                                    <div className="text-3xl sm:text-4xl font-bold text-white">{values[index]}</div>
                                    <div className="text-sm uppercase tracking-[0.3em] text-neutral-400 mt-2">{label}</div>
                                </div>
                            )
                        })}
                    </div>

                    {view === 'countdown' && (
                        <div className="text-center space-y-4">
                            <p className="text-neutral-300">Upload the countdown screenshot, and we’ll calculate your launch offer instantly.</p>
                            <Button
                                size="lg"
                                className="px-10 py-6 rounded-full text-lg bg-zatch-neon text-black hover:bg-zatch-neon/90 focus-ring font-semibold shadow-2xl shadow-zatch-neon/30"
                                onClick={handleStart}
                            >
                                Start Zatching Now
                            </Button>
                        </div>
                    )}

                    {view === 'form' && !participant && (
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto text-left">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm text-neutral-300">
                                        Email address
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className="h-12 bg-black/60 border-white/20 text-white placeholder:text-neutral-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm text-neutral-300">
                                        Mobile number
                                    </label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        required
                                        placeholder="+91 90000 00000"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                        className="h-12 bg-black/60 border-white/20 text-white placeholder:text-neutral-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-neutral-300">Countdown screenshot</label>
                                <div className="border border-dashed border-white/20 rounded-2xl p-6 bg-black/30">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={async (event) => {
                                            const incoming = event.target.files?.[0] ?? null

                                            if (!incoming) {
                                                setScreenshot(null)
                                                setScreenshotInfo(null)
                                                return
                                            }

                                            try {
                                                setOptimizingScreenshot(true)
                                                const convertible = await convertHeicIfNeeded(incoming)
                                                const { file: processed, originalSize } = await optimiseScreenshot(convertible)
                                                setScreenshot(processed)
                                                setScreenshotInfo({
                                                    name: processed.name || convertible.name || incoming.name || 'screenshot.jpg',
                                                    size: processed.size,
                                                    originalSize: processed === convertible ? (convertible === incoming ? undefined : incoming.size) : originalSize ?? convertible.size,
                                                })
                                                setError(null)
                                            } catch (compressionError) {
                                                console.error('[startzatching] screenshot optimisation failed', compressionError)
                                                setScreenshot(incoming)
                                                setScreenshotInfo({
                                                    name: incoming.name || 'screenshot',
                                                    size: incoming.size,
                                                })
                                                setError('We could not optimise the screenshot, so we will upload the original file.')
                                            } finally {
                                                setOptimizingScreenshot(false)
                                            }
                                        }}
                                    />
                                    <p className="mt-3 text-sm text-neutral-400">
                                        Upload a clear screenshot of the Start Zatching countdown timer. Large images are
                                        compressed automatically so mobile uploads work even on slower connections.
                                    </p>
                                    {optimizingScreenshot && (
                                        <p className="mt-2 text-sm text-zatch-neon">Optimising screenshot…</p>
                                    )}
                                    {screenshotInfo && (
                                        <p className="mt-2 text-sm text-neutral-200">
                                            Selected: {screenshotInfo.name} ({formatBytes(screenshotInfo.size)}
                                            {screenshotInfo.originalSize && ` → compressed from ${formatBytes(screenshotInfo.originalSize)}`})
                                        </p>
                                    )}
                                </div>
                            </div>

                            {referralCode && (
                                <div className="rounded-2xl border border-zatch-neon/40 bg-zatch-neon/10 p-4">
                                    <p className="text-sm text-neutral-900 font-semibold">
                                        You’re joining via referral code: <span className="font-mono">{referralCode}</span>
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="px-10 py-6 rounded-full text-lg"
                                    disabled={submitting || optimizingScreenshot}
                                >
                                    {submitting ? 'Processing…' : 'Submit & Reveal My Offer'}
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setView('countdown')}
                                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                                >
                                    ← Back to countdown
                                </button>
                            </div>
                        </form>
                    )}

                    {showResult && participant && (
                        <div className="space-y-8">
                            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
                                <h3 className="text-2xl font-semibold mb-6">Your Launch Rewards</h3>
                                <div className="grid md:grid-cols-4 gap-6 text-center">
                                    <div className="rounded-2xl bg-white/5 border border-white/10 py-6">
                                        <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">Discount</div>
                                        <div className="text-4xl font-bold text-white mt-2">{participant.discount}%</div>
                                        <div className="text-xs text-neutral-400 mt-1">Started at {participant.initialDiscount}%</div>
                                    </div>
                                    <div className="rounded-2xl bg-white/5 border border-white/10 py-6">
                                        <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">Orders</div>
                                        <div className="text-4xl font-bold text-white mt-2">{participant.ordersAllowed}</div>
                                        <div className="text-xs text-neutral-400 mt-1">Initial allowance {participant.initialOrders}</div>
                                    </div>
                                    <div className="rounded-2xl bg-white/5 border border-white/10 py-6">
                                        <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">Coupon</div>
                                        <div className="text-lg font-bold text-white mt-2 break-all">{participant.couponCode}</div>
                                    </div>
                                    <div className="rounded-2xl bg-white/5 border border-white/10 py-6">
                                        <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">Referrals</div>
                                        <div className="text-4xl font-bold text-white mt-2">{participant.referralCount}</div>
                                        <div className="text-xs text-neutral-400 mt-1">Goal {participant.referralTarget}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h4 className="text-xl font-semibold">Your referral link</h4>
                                        <p className="text-neutral-400 text-sm mt-1">
                                            Invite friends. Every verified referral boosts your discount and can unlock more orders.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <div className="flex-1 sm:flex-none bg-black/60 border border-white/10 rounded-full px-5 py-3 text-sm break-all">
                                            {participant.referralLink}
                                        </div>
                                        <Button onClick={handleCopy} className="rounded-full" variant="secondary">
                                            {copied ? 'Copied!' : 'Copy'}
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="flex items-center justify-between text-sm text-neutral-400">
                                        <span>Progress to next order boost</span>
                                        <span>
                                            {participant.referralCount}/{participant.referralTarget} referrals
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/10 mt-3 overflow-hidden">
                                        <div
                                            className="h-full bg-zatch-neon transition-all duration-500"
                                            style={{ width: `${referralProgress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-2">
                                        Orders increase by +1 once you cross 10 verified referrals (max 5 orders total).
                                    </p>
                                </div>

                                <div className="mt-8 grid gap-4 md:grid-cols-2">
                                    {SHARE_PLATFORMS.map((share) => {
                                        const alreadyShared = participant.sharesUsed.includes(share.id)
                                        const loading = shareLoading === share.id

                                        return (
                                            <button
                                                key={share.id}
                                                type="button"
                                                disabled={alreadyShared || loading}
                                                onClick={() => handleShare(share.id)}
                                                className={cn(
                                                    'rounded-2xl border border-white/10 px-6 py-4 text-left transition-all duration-200 bg-white/5 hover:border-zatch-neon/50 hover:bg-white/10',
                                                    (alreadyShared || loading) && 'opacity-50 cursor-not-allowed hover:border-white/10 hover:bg-white/5'
                                                )}
                                            >
                                                <div className="font-semibold text-white">{share.label}</div>
                                                <div className="text-sm text-neutral-400 mt-1">
                                                    {alreadyShared
                                                        ? 'Boost already applied for this platform'
                                                        : 'Share once to earn a 1–5% bonus. 30% chance of +1 order.'}
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                                    <div className="flex gap-2">
                                        <Button variant="secondary" onClick={handleRefresh} className="rounded-full">
                                            Refresh progress
                                        </Button>
                                        <Button variant="ghost" onClick={handleReset} className="rounded-full text-sm text-neutral-300 hover:text-white">
                                            Forget this entry
                                        </Button>
                                    </div>
                                    <p className="text-sm text-neutral-400 text-center sm:text-right">
                                        Referrals update automatically when your friends join with unique email & phone numbers.
                                    </p>
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}