export interface URL {
    short_id: string
    original_url: string
    custom_path?: string
    created_at: string
    visits: number
}

export interface URLStats {
    total_visits: number
    visits_by_day: Array<{
        date: string
        visits: number
    }>
    top_referrers: Array<{
        referrer: string
        count: number
    }>
}
