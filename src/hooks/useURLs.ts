import useSWR from 'swr'
import { fetchUrls } from '@/lib/api'
import { URL } from '@/lib/types'

export function useURLs() {
    const { data, error, isLoading, mutate } = useSWR<URL[]>('urls', fetchUrls)

    return {
        urls: data || [],
        loading: isLoading,
        error: error?.message || null,
        mutate,
    }
}
