const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function fetchUrls() {
    const res = await fetch(`${API_BASE}/api/admin/urls`)
    if (!res.ok) throw new Error('Failed to fetch URLs')
    return res.json()
}

export async function fetchStats(shortId: string) {
    const res = await fetch(`${API_BASE}/api/stats/${shortId}`)
    if (!res.ok) throw new Error('Failed to fetch stats')
    return res.json()
}

export async function createShortUrl(data: {
    url: string
    custom_path?: string
}) {
    const res = await fetch(`${API_BASE}/api/urls`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create short URL')
    return res.json()
}
