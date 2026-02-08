export interface Ad {
  message?: string;
  name?: string;
  description?: string;
  link?: string;
  call_to_action?: {
    type?: string;
    value?: {
      link?: string;
    };
  };
}

export interface CampaignForm {
  name?: string;
  platform?: 'meta' | 'google' | 'tiktok';
  objective?: string;
  goal?: string;
  event?: string;
  budget_type?: "daily" | "lifetime";
  daily_budget?: number;
  lifetime_budget?: number;
  start_time?: string;
  end_time?: string;
  bid_amount?: number;
  creative?: {
    name?: string;
    object_story_spec?: {
      link?: string;
      call_to_action?: {
        type?: string;
        value?: {
          link?: string;
        };
      };
      link_data1?: Ad;
      link_data2?: Ad;
    };
  };
}
