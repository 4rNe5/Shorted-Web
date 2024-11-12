'use client'

import { useEffect, useState } from 'react'
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts'
import { fetchStats } from '@/lib/api'
import { URLStats } from '@/lib/types'

export default function StatsPanel({ shortId }: { shortId: string }) {
    const [stats, setStats] = useState<URLStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadStats() {
            try {
                setLoading(true)
                const data = await fetchStats(shortId)
                setStats(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load stats')
            } finally {
                setLoading(false)
            }
        }

        loadStats()
    }, [shortId])

    if (loading) return <div>Loading stats...</div>
    if (error) return <div>Error: {error}</div>
    if (!stats) return null

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">URL Statistics</h2>

            <div className="mb-6">
                <p className="text-sm text-gray-500">Total Visits</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total_visits}</p>
            </div>

            <div className="h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.visits_by_day}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="visits" stroke="#4f46e5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Top Referrers</h3>
                <ul className="space-y-2">
                    {stats.top_referrers.map((referrer, index) => (
                        <li key={index} className="flex justify-between text-sm">
              <span className="text-gray-500 truncate">
                {referrer.referrer || 'Direct'}
              </span>
                            <span className="text-gray-900">{referrer.count}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
