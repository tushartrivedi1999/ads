export type EntityId = string;

export type CampaignStatus = 'active' | 'paused';

export type CreativeType = 'image' | 'video' | 'text';

export interface BudgetValue {
  amount: number;
  currency?: string;
}

export interface DateRange {
  start_date: string;
  end_date: string;
}

export interface BaseEntity {
  id: EntityId;
}

export interface Campaign extends BaseEntity, DateRange {
  name: string;
  budget: BudgetValue;
  status: CampaignStatus;
}

export interface AdSet extends BaseEntity {
  campaign_id: Campaign['id'];
  location: string;
  audience: string;
  budget: BudgetValue;
}

export interface Ad extends BaseEntity {
  adset_id: AdSet['id'];
  creative_type: CreativeType;
  headline: string;
  description: string;
  media_url: string;
}

export interface CampaignSystemEntities {
  campaigns: Campaign[];
  adsets: AdSet[];
  ads: Ad[];
}

export interface EntityRecordMap {
  campaigns: Record<Campaign['id'], Campaign>;
  adsets: Record<AdSet['id'], AdSet>;
  ads: Record<Ad['id'], Ad>;
}
