export type Role = "influencer" | "business";

export interface Niche {
  parent: string;
  children: string[];
}

export interface SocialAccountDraft {
  platform: "tiktok" | "instagram";
  username: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  is_manual: boolean;
}

export interface InfluencerFormData {
  // Step 1
  username: string;
  email: string;
  password: string;
  // Step 2
  full_name: string;
  bio: string;
  // Step 3
  gender: "male" | "female" | "other" | "";
  age: string;
  // Step 4
  niches: Niche[];
  social_accounts: SocialAccountDraft[];
}

export interface BusinessFormData {
  // Step 1
  company_name: string;
  company_type: "ТОО" | "ИП" | "АО" | "Другое" | "";
  bin: string;
  email: string;
  password: string;
  // Step 2
  bio: string;
  website: string;
  // Step 3
  sphere: string;
}

export const INFLUENCER_DEFAULTS: InfluencerFormData = {
  username: "",
  email: "",
  password: "",
  full_name: "",
  bio: "",
  gender: "",
  age: "",
  niches: [],
  social_accounts: [],
};

export const BUSINESS_DEFAULTS: BusinessFormData = {
  company_name: "",
  company_type: "",
  bin: "",
  email: "",
  password: "",
  bio: "",
  website: "",
  sphere: "",
};
