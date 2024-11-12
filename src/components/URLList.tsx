import { URL } from '@/lib/types'
import { Clipboard } from 'lucide-react'

interface URLListProps {
    urls: URL[]
    loading: boolean
    error: string | null
    selectedUrl: string | null
    onSelectUrl: (shortId: string) => void
}

export default function URLList({
                                    urls,
                                    loading,
                                    error,
                                    selectedUrl,
                                    onSelectUrl,
                                }: URLListProps) {
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {urls.map((url) => (
                    <li
                        key={url.short_id}
                        className={`hover:bg-gray-50 cursor-pointer ${
                            selectedUrl === url.short_id ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => onSelectUrl(url.short_id)}
                    >
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-indigo-600 truncate">
                                    {url.custom_path || url.short_id}
                                </p>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">{url.visits} visits</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigator.clipboard.writeText(
                                                `${process.env.NEXT_PUBLIC_API_URL}/${url.custom_path || url.short_id}`
                                            )
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <Clipboard size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 truncate">{url.original_url}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Created: {new Date(url.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
