'use client'
import { useState } from 'react'
import URLList from './URLList'
import URLForm from './URLForm'
import StatsPanel from './StatsPanel'
import { URL, URLStats } from '@/lib/types'
import { useURLs } from '@/hooks/useURLs'
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function Dashboard() {
    const { urls, loading, error, mutate } = useURLs()
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-200 opacity-20 blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-200 opacity-20 blur-3xl" />

            <div className="relative max-w-7xl mx-auto p-6 z-10">
                {/* Header Section */}
                <div className="space-y-3 mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-black text-transparent bg-clip-text">
                        URL 단축기
                    </h1>
                    <p className="text-gray-600">
                        긴 URL을 짧고 간단하게.
                    </p>
                </div>

                {/* URL Form Card */}
                <Card className="mb-8 bg-white/70 backdrop-blur-md border border-white/50 shadow-lg shadow-black/5">
                    <CardContent className="pt-6">
                        <URLForm onSuccess={() => mutate()} />
                    </CardContent>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* URLs List Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            내 URL 목록
                        </h2>
                        {loading ? (
                            <Card className="bg-white/70 backdrop-blur-md border border-white/50 shadow-lg shadow-black/5">
                                <CardContent className="h-32 flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                </CardContent>
                            </Card>
                        ) : error ? (
                            <Card className="bg-white/70 backdrop-blur-md border-red-100 shadow-lg shadow-black/5">
                                <CardContent className="p-4">
                                    <p className="text-red-500">
                                        데이터를 불러오는데 실패했습니다.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="bg-white/70 backdrop-blur-md border border-white/50 shadow-lg shadow-black/5">
                                <CardContent className="p-0">
                                    <URLList
                                        urls={urls}
                                        loading={loading}
                                        error={error}
                                        selectedUrl={selectedUrl}
                                        onSelectUrl={setSelectedUrl}
                                    />
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Stats Panel Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            통계 정보
                        </h2>
                        {selectedUrl ? (
                            <Card className="bg-white/70 backdrop-blur-md border border-white/50 shadow-lg shadow-black/5">
                                <CardContent className="p-0">
                                    <StatsPanel shortId={selectedUrl} />
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="bg-white/60 backdrop-blur-md border border-white/50 shadow-lg shadow-black/5">
                                <CardContent className="p-6">
                                    <p className="text-gray-500 text-center">
                                        URL을 선택하여 통계를 확인하세요
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
