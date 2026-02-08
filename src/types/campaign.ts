export interface Campaign {
    id: number | string;
    name: string;
    objective: string;
    status: string;
    platform?: 'Meta' | 'Google' | 'TikTok';
    budget?: number;
    spent?: number;
    impressions?: number;
    clicks?: number;
    ctr?: number;
    cpc?: number;
    cpa?: number;
    updated_at: number;
}
