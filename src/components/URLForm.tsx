'use client'

import { useState } from 'react'
import { createShortUrl } from '@/lib/api'

export default function URLForm({ onSuccess }: { onSuccess: () => void }) {
    const [url, setUrl] = useState('')
    const [customPath, setCustomPath] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await createShortUrl({
                url,
                custom_path: customPath || undefined,
            })
            setUrl('')
            setCustomPath('')
            onSuccess()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label htmlFor="url" className="block font-medium text-gray-700 pb-2 text-base ml-2">
                        단축할 URL
                    </label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black h-12 bg-gray-100 px-4"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="customPath" className="block font-medium text-gray-700 pb-2 text-base ml-2">
                        커스텀 경로
                    </label>
                    <input
                        type="text"
                        id="customPath"
                        value={customPath}
                        onChange={(e) => setCustomPath(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black h-12 bg-gray-100 px-4"
                    />
                </div>

                {error && (
                    <div className="text-red-600 text-sm">{error}</div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? '만드는중이다....' : '만들다.'}
                </button>
            </div>
        </form>
    )
}
