export interface FeatureBarProps {
  text: string;
  badge?: string;
  delay?: number;
}

export interface TwoLayerTagProps {
  parent: string;
  items: string[];
}

export interface InfluencerCardProps {
  name: string;
  location: string;
  parentNiche: string;
  childNiches: string[];
  score: number;
  matchPercent?: number;
  avatarColor?: string;
}

export interface DealStep {
  label: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
}
