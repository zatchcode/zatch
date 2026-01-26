'use client'

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

type TableState<T = Record<string, any>> = {
    rows: T[]
    count: number
    error?: string | null
}

type AdminData = {
    waitlist: TableState
    participants: TableState
    referrals: TableState
    shares: TableState
}

const EMPTY_TABLE: TableState = { rows: [], count: 0, error: null }
const EMPTY_DATA: AdminData = {
    waitlist: EMPTY_TABLE,
    participants: EMPTY_TABLE,
    referrals: EMPTY_TABLE,
    shares: EMPTY_TABLE,
}

type ColumnConfig<Row = Record<string, any>> = {
    label: string
    render: (row: Row) => ReactNode
}

type FieldOption = {
    label: string
    value: string
}

type FieldConfig = {
    name: string
    label: string
    type: 'text' | 'number' | 'select' | 'checkbox'
    placeholder?: string
    required?: boolean
    options?: FieldOption[]
    allowNull?: boolean
    helperText?: string
}

type ResourceManagerProps = {
    title: string
    description: string
    endpoint: string
    rows: Record<string, any>[]
    columns: ColumnConfig[]
    fields: FieldConfig[]
    onRefresh: () => Promise<void>
    error?: string | null
    idField?: string
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
})

const formatDate = (value?: string | null) => {
    if (!value) return '—'
    return dateFormatter.format(new Date(value))
}

export function AdminDashboard() {
    const [data, setData] = useState<AdminData>(EMPTY_DATA)
    const [loading, setLoading] = useState(true)
    const [globalError, setGlobalError] = useState<string | null>(null)
    const { toast } = useToast()

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            setGlobalError(null)

            const response = await fetch('/api/admin/overview', { cache: 'no-store' })
            if (!response.ok) {
                throw new Error('Unable to load admin data')
            }

            const payload = await response.json()
            setData(payload)
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to load data'
            setGlobalError(message)
            toast({
                title: 'Admin data unavailable',
                description: message,
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }, [toast])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const stats = useMemo(
        () => [
            {
                label: 'Waitlist signups',
                value: data.waitlist.count,
                detail: `Showing ${data.waitlist.rows.length} recent`,
            },
            {
                label: 'Challenge participants',
                value: data.participants.count,
                detail: `Showing ${data.participants.rows.length} recent`,
            },
            {
                label: 'Recorded referrals',
                value: data.referrals.count,
                detail: 'Unique referred links',
            },
            {
                label: 'Social shares',
                value: data.shares.count,
                detail: 'Across all platforms',
            },
        ],
        [data]
    )

    return (
        <main className="min-h-screen bg-black text-white py-16 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="space-y-4">
                    <p className="text-sm tracking-[0.3em] uppercase text-zatch-neon">Internal</p>
                    <h1 className="text-4xl md:text-5xl font-bold">Zatchy Admin Panel</h1>
                    <p className="text-neutral-300 max-w-3xl">
                        Manage the waitlist and Start Zatching data directly. Authentication is handled via Basic Auth (username{' '}
                        <span className="font-semibold">admin</span>, password <span className="font-semibold">OGZatch@2025</span>). Set up an
                        IP allowlist or VPN before exposing this route publicly.
                    </p>
                    {globalError && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
                            {globalError}
                        </div>
                    )}
                </header>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 space-y-2"
                        >
                            <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">{stat.label}</p>
                            <p className="mt-1 text-4xl font-semibold">{stat.value.toLocaleString('en-IN')}</p>
                            <p className="text-sm text-neutral-400">{stat.detail}</p>
                        </div>
                    ))}
                </section>

                {loading && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-neutral-300">
                        Loading latest records...
                    </div>
                )}

                <ResourceManager
                    title="Waitlist Signups"
                    description="Latest entries captured via the landing page waitlist form."
                    endpoint="/api/admin/waitlist"
                    rows={data.waitlist.rows}
                    columns={[
                        { label: 'Email', render: (row) => row.email },
                        { label: 'Phone', render: (row) => row.phone },
                        { label: 'Interest', render: (row) => row.interest },
                        { label: 'Created', render: (row) => formatDate(row.created_at) },
                    ]}
                    fields={[
                        { name: 'email', label: 'Email', type: 'text', required: true, placeholder: 'user@example.com' },
                        { name: 'phone', label: 'Phone', type: 'text', required: true, placeholder: '+91 90000 00000' },
                        {
                            name: 'interest',
                            label: 'Interest',
                            type: 'select',
                            required: true,
                            options: [
                                { label: 'Shopping', value: 'shopping' },
                                { label: 'Selling', value: 'selling' },
                            ],
                        },
                    ]}
                    onRefresh={fetchData}
                    error={data.waitlist.error}
                />

                <ResourceManager
                    title="Start Zatching Participants"
                    description="Create, edit, or remove participant records."
                    endpoint="/api/admin/participants"
                    rows={data.participants.rows}
                    columns={[
                        { label: 'Email', render: (row) => row.email },
                        { label: 'Phone', render: (row) => row.phone },
                        {
                            label: 'Discount',
                            render: (row) => `${row.current_discount}% (start ${row.initial_discount}%)`,
                        },
                        {
                            label: 'Orders',
                            render: (row) => `${row.current_orders} (start ${row.initial_orders})`,
                        },
                        { label: 'Coupon', render: (row) => row.coupon_code },
                        { label: 'Referral Code', render: (row) => row.referral_code },
                        { label: 'Referrals', render: (row) => row.total_referrals },
                        { label: 'Shares', render: (row) => row.social_share_count },
                        { label: 'Updated', render: (row) => formatDate(row.last_updated ?? row.created_at) },
                    ]}
                    fields={[
                        { name: 'email', label: 'Email', type: 'text', required: true },
                        { name: 'phone', label: 'Phone', type: 'text', required: true },
                        { name: 'screenshot_url', label: 'Screenshot URL', type: 'text', allowNull: true },
                        { name: 'initial_discount', label: 'Initial Discount (%)', type: 'number', required: true },
                        { name: 'current_discount', label: 'Current Discount (%)', type: 'number', required: true },
                        { name: 'initial_orders', label: 'Initial Orders', type: 'number', required: true },
                        { name: 'current_orders', label: 'Current Orders', type: 'number', required: true },
                        { name: 'coupon_code', label: 'Coupon Code', type: 'text', required: true },
                        { name: 'referral_code', label: 'Referral Code', type: 'text', required: true },
                        { name: 'referrer_id', label: 'Referrer ID (optional)', type: 'text', allowNull: true },
                        { name: 'total_referrals', label: 'Total Referrals', type: 'number' },
                        { name: 'social_share_count', label: 'Social Share Count', type: 'number' },
                    ]}
                    onRefresh={fetchData}
                    error={data.participants.error}
                />

                <ResourceManager
                    title="Referrals"
                    description="Manage referral relations (referrer → referred)."
                    endpoint="/api/admin/referrals"
                    rows={data.referrals.rows}
                    columns={[
                        { label: 'Referrer ID', render: (row) => row.referrer_id },
                        { label: 'Referred ID', render: (row) => row.referred_id },
                        { label: 'Created', render: (row) => formatDate(row.created_at) },
                    ]}
                    fields={[
                        { name: 'referrer_id', label: 'Referrer ID', type: 'text', required: true },
                        { name: 'referred_id', label: 'Referred ID', type: 'text', required: true },
                    ]}
                    onRefresh={fetchData}
                    error={data.referrals.error}
                />

                <ResourceManager
                    title="Social Shares"
                    description="Boosts earned from verified social shares per participant."
                    endpoint="/api/admin/shares"
                    rows={data.shares.rows}
                    columns={[
                        { label: 'Participant ID', render: (row) => row.participant_id },
                        { label: 'Platform', render: (row) => row.platform },
                        { label: 'Discount Boost', render: (row) => `${row.discount_boost}%` },
                        {
                            label: 'Order Boost',
                            render: (row) => (row.orders_increment ? '+1 order' : '—'),
                        },
                        { label: 'Created', render: (row) => formatDate(row.created_at) },
                    ]}
                    fields={[
                        { name: 'participant_id', label: 'Participant ID', type: 'text', required: true },
                        { name: 'platform', label: 'Platform', type: 'text', required: true },
                        { name: 'discount_boost', label: 'Discount Boost (%)', type: 'number', required: true },
                        { name: 'orders_increment', label: 'Orders Increment?', type: 'checkbox' },
                    ]}
                    onRefresh={fetchData}
                    error={data.shares.error}
                />
            </div>
        </main>
    )
}

function ResourceManager({
    title,
    description,
    endpoint,
    rows,
    columns,
    fields,
    onRefresh,
    error,
    idField = 'id',
}: ResourceManagerProps) {
    const { toast } = useToast()

    const defaultValues = useMemo(() => {
        const initial: Record<string, any> = {}
        fields.forEach((field) => {
            if (field.type === 'checkbox') {
                initial[field.name] = false
            } else {
                initial[field.name] = ''
            }
        })
        return initial
    }, [fields])

    const [formValues, setFormValues] = useState<Record<string, any>>(defaultValues)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        setFormValues(defaultValues)
        setEditingId(null)
    }, [defaultValues])

    const handleChange = (name: string, value: any) => {
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormValues(defaultValues)
        setEditingId(null)
    }

    const validateForm = () => {
        for (const field of fields) {
            if (!field.required) continue
            const value = formValues[field.name]
            if (field.type === 'checkbox') continue
            if (value === '' || value === null || value === undefined) {
                return field.label
            }
        }
        return null
    }

    const buildPayload = () => {
        const payload: Record<string, any> = {}
        fields.forEach((field) => {
            let value = formValues[field.name]
            if (field.type === 'number') {
                payload[field.name] = value === '' || value === null ? null : Number(value)
            } else if (field.type === 'checkbox') {
                payload[field.name] = Boolean(value)
            } else if (field.allowNull && value === '') {
                payload[field.name] = null
            } else {
                payload[field.name] = value
            }
        })
        return payload
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const missingLabel = validateForm()
        if (missingLabel) {
            toast({
                title: 'Missing field',
                description: `Please supply ${missingLabel}.`,
                variant: 'destructive',
            })
            return
        }

        try {
            setSubmitting(true)
            const payload = buildPayload()
            const url = editingId ? `${endpoint}/${editingId}` : endpoint
            const method = editingId ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                const result = await response.json().catch(() => ({}))
                throw new Error(result?.message ?? `Unable to ${editingId ? 'update' : 'create'} record.`)
            }

            toast({
                title: editingId ? 'Updated' : 'Created',
                description: `${title} record ${editingId ? 'updated' : 'created'} successfully.`,
            })
            resetForm()
            await onRefresh()
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Request failed'
            toast({
                title: 'Operation failed',
                description: message,
                variant: 'destructive',
            })
        } finally {
            setSubmitting(false)
        }
    }

    const handleEdit = (row: Record<string, any>) => {
        const nextValues: Record<string, any> = {}
        fields.forEach((field) => {
            let value = row[field.name]
            if (value === null || value === undefined) {
                value = field.type === 'checkbox' ? false : ''
            } else if (field.type === 'checkbox') {
                value = Boolean(value)
            } else if (field.type === 'number') {
                value = value.toString()
            }
            nextValues[field.name] = value
        })
        setFormValues(nextValues)
        setEditingId(row[idField])
    }

    const handleDelete = async (rowId: string) => {
        const recordLabel = rows.find((row) => row[idField] === rowId)?.[idField] ?? 'record'
        if (!window.confirm(`Delete ${recordLabel}? This cannot be undone.`)) {
            return
        }
        try {
            setDeletingId(rowId)
            const response = await fetch(`${endpoint}/${rowId}`, { method: 'DELETE' })
            if (!response.ok) {
                const result = await response.json().catch(() => ({}))
                throw new Error(result?.message ?? 'Unable to delete record.')
            }
            toast({
                title: 'Deleted',
                description: `${title} record removed.`,
            })
            if (editingId === rowId) {
                resetForm()
            }
            await onRefresh()
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Delete failed'
            toast({
                title: 'Delete failed',
                description: message,
                variant: 'destructive',
            })
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="text-neutral-400">{description}</p>
            </div>

            <div className="overflow-auto rounded-2xl border border-white/10 bg-white/[0.02]">
                <table className="min-w-full text-left text-sm border-collapse">
                    <thead className="bg-white/[0.04] text-neutral-300">
                        <tr>
                            {columns.map((column) => (
                                <th key={column.label} className="px-4 py-3 font-medium whitespace-nowrap">
                                    {column.label}
                                </th>
                            ))}
                            <th className="px-4 py-3 font-medium whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td className="px-4 py-6 text-neutral-400" colSpan={columns.length + 1}>
                                    No records yet.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <tr key={row[idField]} className="border-t border-white/5 last:border-b-0 text-white">
                                    {columns.map((column) => (
                                        <td key={column.label} className="px-4 py-3 align-top whitespace-nowrap">
                                            {column.render(row)}
                                        </td>
                                    ))}
                                    <td className="px-4 py-3 align-top whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Button variant="secondary" size="sm" onClick={() => handleEdit(row)}>
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                disabled={deletingId === row[idField]}
                                                onClick={() => handleDelete(row[idField])}
                                            >
                                                {deletingId === row[idField] ? 'Deleting…' : 'Delete'}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {error && <p className="text-sm text-red-300">Failed to load: {error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{editingId ? 'Update record' : 'Create record'}</h3>
                    {editingId ? (
                        <p className="text-sm text-neutral-400">
                            Editing ID <span className="font-mono text-white">{editingId}</span>
                        </p>
                    ) : (
                        <p className="text-sm text-neutral-400">Fill in the fields below and submit to add a new entry.</p>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                            <label className="block text-sm text-neutral-300" htmlFor={`${title}-${field.name}`}>
                                {field.label}
                            </label>
                            {field.type === 'select' ? (
                                <select
                                    id={`${title}-${field.name}`}
                                    value={formValues[field.name]}
                                    onChange={(event) => handleChange(field.name, event.target.value)}
                                    className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zatch-neon/60"
                                    required={field.required}
                                >
                                    <option value="">Select an option</option>
                                    {field.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === 'checkbox' ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        id={`${title}-${field.name}`}
                                        type="checkbox"
                                        checked={Boolean(formValues[field.name])}
                                        onChange={(event) => handleChange(field.name, event.target.checked)}
                                    />
                                    <span className="text-sm text-neutral-300">{field.label}</span>
                                </div>
                            ) : (
                                <Input
                                    id={`${title}-${field.name}`}
                                    type={field.type === 'number' ? 'number' : 'text'}
                                    value={formValues[field.name]}
                                    onChange={(event) => handleChange(field.name, event.target.value)}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    className="bg-black/60 border-white/20 text-white"
                                />
                            )}
                            {field.helperText && <p className="text-xs text-neutral-500">{field.helperText}</p>}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" disabled={submitting} className="rounded-full px-8">
                        {submitting ? 'Saving…' : editingId ? 'Update record' : 'Create record'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetForm} disabled={submitting}>
                        Reset
                    </Button>
                </div>
            </form>
        </section>
    )
}