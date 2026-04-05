// ─── Types ───────────────────────────────────────────────────────────────────

export interface Influencer {
  id: string;
  name: string;
  username: string;
  platform: "tiktok" | "instagram" | "youtube";
  city: string;
  niches: string[];
  verified: boolean;
  avatarColor: string;
  followers: number;
  avgViews: number;
  avgLikes: number;
  erPercent: number;
  jeliScore: number;
  demandIndex: number;
  loyaltyIndex: number;
  realFollowersPercent: number;
  matchPercent?: number;
  priceList: { format: string; price: number; reachForecast: number; cpm: number }[];
  audience: {
    gender: { male: number; female: number };
    age: Record<string, number>;
    topCities: { city: string; percent: number }[];
  };
  subscriberGrowth: { month: string; subscribers: number }[];
  recentViews: number[];
  topRubrics: { name: string; avgReach: number }[];
  trendingTopics: string[];
  publishFrequency: number;
  reviews: {
    avgRating: number;
    responseTime: number;
    briefCompliance: number;
    punctuality: number;
    comments: string[];
    collaborations: { brand: string; niche: string; date: string }[];
  };
}

export interface Campaign {
  id: string;
  title: string;
  status: "draft" | "active" | "review" | "completed";
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  influencersCount: number;
  reach: number;
  clicks: number;
  er: number;
  niche: string;
  platform: string;
  influencers: CampaignInfluencer[];
}

export interface CampaignInfluencer {
  id: string;
  name: string;
  username: string;
  avatarColor: string;
  status: "invited" | "accepted" | "review" | "published";
  price: number;
  reach: number;
  contentUrl?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: "deposit" | "payment" | "commission" | "freeze";
  amount: number;
  status: "completed" | "pending" | "failed";
  campaign?: string;
  description: string;
}

export interface ActivityItem {
  id: string;
  type: "publish" | "approve" | "payment" | "offer" | "campaign";
  text: string;
  time: string;
  avatar?: string;
  avatarColor?: string;
}

// ─── Influencers ─────────────────────────────────────────────────────────────

export const MOCK_INFLUENCERS: Influencer[] = [
  {
    id: "1",
    name: "Айгерим Сатпаева",
    username: "aigerim_fit",
    platform: "tiktok",
    city: "Алматы",
    niches: ["Фитнес", "Питание", "Лайфстайл"],
    verified: true,
    avatarColor: "#0064FF",
    followers: 248000,
    avgViews: 185000,
    avgLikes: 14200,
    erPercent: 6.2,
    jeliScore: 89,
    demandIndex: 82,
    loyaltyIndex: 91,
    realFollowersPercent: 94,
    matchPercent: 94,
    priceList: [
      { format: "Stories (1 шт)", price: 35000, reachForecast: 18000, cpm: 1944 },
      { format: "TikTok видео", price: 85000, reachForecast: 185000, cpm: 459 },
      { format: "TikTok Shorts", price: 45000, reachForecast: 95000, cpm: 473 },
      { format: "Коллаборация", price: 150000, reachForecast: 320000, cpm: 469 },
    ],
    audience: {
      gender: { male: 28, female: 72 },
      age: { "13-17": 8, "18-24": 34, "25-34": 42, "35-44": 12, "45+": 4 },
      topCities: [
        { city: "Алматы", percent: 38 },
        { city: "Астана", percent: 22 },
        { city: "Шымкент", percent: 12 },
        { city: "Актобе", percent: 7 },
        { city: "Другие", percent: 21 },
      ],
    },
    subscriberGrowth: [
      { month: "Май", subscribers: 185000 },
      { month: "Июн", subscribers: 194000 },
      { month: "Июл", subscribers: 202000 },
      { month: "Авг", subscribers: 208000 },
      { month: "Сен", subscribers: 215000 },
      { month: "Окт", subscribers: 221000 },
      { month: "Ноя", subscribers: 226000 },
      { month: "Дек", subscribers: 230000 },
      { month: "Янв", subscribers: 235000 },
      { month: "Фев", subscribers: 239000 },
      { month: "Мар", subscribers: 244000 },
      { month: "Апр", subscribers: 248000 },
    ],
    recentViews: [
      210000, 165000, 290000, 180000, 145000, 320000, 195000, 255000,
      170000, 300000, 185000, 240000, 160000, 275000, 190000, 215000,
      350000, 175000, 230000, 195000,
    ],
    topRubrics: [
      { name: "Тренировки после родов", avgReach: 320000 },
      { name: "ПП-рецепты", avgReach: 248000 },
      { name: "Утренние рутины", avgReach: 195000 },
      { name: "Мотивация", avgReach: 178000 },
      { name: "Обзор спорт-питания", avgReach: 145000 },
    ],
    trendingTopics: [
      "Питание при грудном вскармливании",
      "Тренировки на балконе",
      "30-дневный челлендж",
    ],
    publishFrequency: 2,
    reviews: {
      avgRating: 4.8,
      responseTime: 4.7,
      briefCompliance: 4.9,
      punctuality: 4.8,
      comments: [
        "Айгерим очень профессиональная — всё сдала вовремя, контент точно по брифу. Результат превзошёл ожидания.",
        "Отличная работа! Аудитория очень живая и вовлечённая. Заказ точно повторим.",
        "Качество контента на высоте. Единственное — чуть задержала согласование, но в целом всё хорошо.",
      ],
      collaborations: [
        { brand: "Reebok Kazakhstan", niche: "Спортивная одежда", date: "Мар 2025" },
        { brand: "MyProtein KZ", niche: "Спортивное питание", date: "Янв 2025" },
        { brand: "Fitfood", niche: "Здоровое питание", date: "Дек 2024" },
        { brand: "GymShark", niche: "Спортивная одежда", date: "Окт 2024" },
      ],
    },
  },
  {
    id: "2",
    name: "Данияр Ахметов",
    username: "daniyar_tech",
    platform: "instagram",
    city: "Астана",
    niches: ["Технологии", "Гаджеты", "Обзоры"],
    verified: true,
    avatarColor: "#7C3AED",
    followers: 156000,
    avgViews: 42000,
    avgLikes: 5800,
    erPercent: 4.8,
    jeliScore: 82,
    demandIndex: 74,
    loyaltyIndex: 85,
    realFollowersPercent: 91,
    matchPercent: 87,
    priceList: [
      { format: "Stories (1 шт)", price: 25000, reachForecast: 14000, cpm: 1786 },
      { format: "Reels", price: 60000, reachForecast: 42000, cpm: 1429 },
      { format: "Пост + Stories", price: 80000, reachForecast: 55000, cpm: 1455 },
    ],
    audience: {
      gender: { male: 68, female: 32 },
      age: { "13-17": 5, "18-24": 28, "25-34": 45, "35-44": 18, "45+": 4 },
      topCities: [
        { city: "Астана", percent: 42 },
        { city: "Алматы", percent: 28 },
        { city: "Шымкент", percent: 10 },
        { city: "Актобе", percent: 8 },
        { city: "Другие", percent: 12 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 3,
    reviews: {
      avgRating: 4.5, responseTime: 4.4, briefCompliance: 4.6, punctuality: 4.5,
      comments: ["Хорошая работа, рекомендую."],
      collaborations: [{ brand: "Samsung KZ", niche: "Электроника", date: "Фев 2025" }],
    },
  },
  {
    id: "3",
    name: "Алина Ким",
    username: "alina_beauty_kz",
    platform: "youtube",
    city: "Алматы",
    niches: ["Бьюти", "Уходовая косметика", "Макияж"],
    verified: true,
    avatarColor: "#EC4899",
    followers: 385000,
    avgViews: 95000,
    avgLikes: 8900,
    erPercent: 5.4,
    jeliScore: 91,
    demandIndex: 88,
    loyaltyIndex: 90,
    realFollowersPercent: 96,
    matchPercent: 79,
    priceList: [
      { format: "YouTube интеграция", price: 180000, reachForecast: 95000, cpm: 1895 },
      { format: "YouTube Shorts", price: 55000, reachForecast: 40000, cpm: 1375 },
      { format: "Dedicated видео", price: 280000, reachForecast: 140000, cpm: 2000 },
    ],
    audience: {
      gender: { male: 22, female: 78 },
      age: { "13-17": 12, "18-24": 45, "25-34": 32, "35-44": 8, "45+": 3 },
      topCities: [
        { city: "Алматы", percent: 35 },
        { city: "Астана", percent: 25 },
        { city: "Шымкент", percent: 14 },
        { city: "Другие", percent: 26 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 7,
    reviews: {
      avgRating: 4.9, responseTime: 4.8, briefCompliance: 5.0, punctuality: 4.9,
      comments: ["Лучший результат за все наши кампании!", "Профессионал высочайшего уровня."],
      collaborations: [
        { brand: "L'Oréal Kazakhstan", niche: "Косметика", date: "Апр 2025" },
        { brand: "MAC Cosmetics", niche: "Декоративная косметика", date: "Янв 2025" },
      ],
    },
  },
  {
    id: "4",
    name: "Бекзат Нурланов",
    username: "bekzat_eats",
    platform: "tiktok",
    city: "Алматы",
    niches: ["Еда", "Рестораны", "Рецепты"],
    verified: false,
    avatarColor: "#F97316",
    followers: 124000,
    avgViews: 210000,
    avgLikes: 18500,
    erPercent: 7.1,
    jeliScore: 85,
    demandIndex: 71,
    loyaltyIndex: 88,
    realFollowersPercent: 92,
    matchPercent: 82,
    priceList: [
      { format: "TikTok видео", price: 70000, reachForecast: 210000, cpm: 333 },
      { format: "Stories", price: 25000, reachForecast: 22000, cpm: 1136 },
    ],
    audience: {
      gender: { male: 45, female: 55 },
      age: { "13-17": 14, "18-24": 38, "25-34": 35, "35-44": 10, "45+": 3 },
      topCities: [
        { city: "Алматы", percent: 55 },
        { city: "Астана", percent: 18 },
        { city: "Другие", percent: 27 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 1,
    reviews: {
      avgRating: 4.6, responseTime: 4.5, briefCompliance: 4.7, punctuality: 4.6,
      comments: ["Отличный охват!"],
      collaborations: [{ brand: "Burger King KZ", niche: "Фастфуд", date: "Мар 2025" }],
    },
  },
  {
    id: "5",
    name: "Гульнара Жаксыбекова",
    username: "gulnara_style",
    platform: "instagram",
    city: "Астана",
    niches: ["Мода", "Стиль", "Шопинг"],
    verified: false,
    avatarColor: "#10B981",
    followers: 97000,
    avgViews: 31000,
    avgLikes: 4200,
    erPercent: 3.9,
    jeliScore: 74,
    demandIndex: 65,
    loyaltyIndex: 76,
    realFollowersPercent: 88,
    priceList: [
      { format: "Reels", price: 45000, reachForecast: 31000, cpm: 1452 },
      { format: "Stories (3 шт)", price: 30000, reachForecast: 20000, cpm: 1500 },
    ],
    audience: {
      gender: { male: 18, female: 82 },
      age: { "13-17": 10, "18-24": 42, "25-34": 38, "35-44": 8, "45+": 2 },
      topCities: [
        { city: "Астана", percent: 48 },
        { city: "Алматы", percent: 24 },
        { city: "Другие", percent: 28 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 2,
    reviews: {
      avgRating: 4.3, responseTime: 4.2, briefCompliance: 4.4, punctuality: 4.3,
      comments: [],
      collaborations: [],
    },
  },
  {
    id: "6",
    name: "Рустам Темиров",
    username: "rustam_finance",
    platform: "youtube",
    city: "Алматы",
    niches: ["Финансы", "Инвестиции", "Бизнес"],
    verified: true,
    avatarColor: "#0EA5E9",
    followers: 203000,
    avgViews: 68000,
    avgLikes: 4100,
    erPercent: 4.2,
    jeliScore: 78,
    demandIndex: 79,
    loyaltyIndex: 82,
    realFollowersPercent: 93,
    priceList: [
      { format: "YouTube интеграция", price: 150000, reachForecast: 68000, cpm: 2206 },
      { format: "YouTube Shorts", price: 40000, reachForecast: 30000, cpm: 1333 },
    ],
    audience: {
      gender: { male: 72, female: 28 },
      age: { "13-17": 3, "18-24": 22, "25-34": 48, "35-44": 22, "45+": 5 },
      topCities: [
        { city: "Алматы", percent: 40 },
        { city: "Астана", percent: 30 },
        { city: "Другие", percent: 30 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 5,
    reviews: {
      avgRating: 4.7, responseTime: 4.6, briefCompliance: 4.8, punctuality: 4.7,
      comments: ["Высококвалифицированный блогер."],
      collaborations: [{ brand: "Kaspi Bank", niche: "Финансы", date: "Апр 2025" }],
    },
  },
  {
    id: "7",
    name: "Самал Байжанова",
    username: "samal_life",
    platform: "tiktok",
    city: "Шымкент",
    niches: ["Лайфстайл", "Семья", "Путешествия"],
    verified: true,
    avatarColor: "#F59E0B",
    followers: 312000,
    avgViews: 420000,
    avgLikes: 28000,
    erPercent: 8.3,
    jeliScore: 93,
    demandIndex: 91,
    loyaltyIndex: 95,
    realFollowersPercent: 97,
    priceList: [
      { format: "TikTok видео", price: 120000, reachForecast: 420000, cpm: 286 },
      { format: "Коллаборация", price: 220000, reachForecast: 700000, cpm: 314 },
    ],
    audience: {
      gender: { male: 35, female: 65 },
      age: { "13-17": 16, "18-24": 40, "25-34": 34, "35-44": 8, "45+": 2 },
      topCities: [
        { city: "Шымкент", percent: 35 },
        { city: "Алматы", percent: 28 },
        { city: "Астана", percent: 20 },
        { city: "Другие", percent: 17 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 1,
    reviews: {
      avgRating: 4.9, responseTime: 4.9, briefCompliance: 4.8, punctuality: 4.9,
      comments: ["Невероятно высокий охват! Лучший результат среди всех блогеров."],
      collaborations: [{ brand: "AirAstana", niche: "Авиация", date: "Фев 2025" }],
    },
  },
  {
    id: "8",
    name: "Аблай Касымов",
    username: "ablay_travel",
    platform: "instagram",
    city: "Алматы",
    niches: ["Путешествия", "Фото", "Лайфстайл"],
    verified: false,
    avatarColor: "#06B6D4",
    followers: 178000,
    avgViews: 55000,
    avgLikes: 7200,
    erPercent: 5.7,
    jeliScore: 86,
    demandIndex: 80,
    loyaltyIndex: 87,
    realFollowersPercent: 90,
    priceList: [
      { format: "Reels", price: 75000, reachForecast: 55000, cpm: 1364 },
      { format: "Пост", price: 50000, reachForecast: 35000, cpm: 1429 },
      { format: "Stories", price: 30000, reachForecast: 22000, cpm: 1364 },
    ],
    audience: {
      gender: { male: 52, female: 48 },
      age: { "13-17": 6, "18-24": 35, "25-34": 44, "35-44": 12, "45+": 3 },
      topCities: [
        { city: "Алматы", percent: 45 },
        { city: "Астана", percent: 25 },
        { city: "Другие", percent: 30 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 3,
    reviews: {
      avgRating: 4.6, responseTime: 4.5, briefCompliance: 4.7, punctuality: 4.6,
      comments: [],
      collaborations: [],
    },
  },
  {
    id: "9",
    name: "Динара Мусина",
    username: "dinara_edu",
    platform: "tiktok",
    city: "Астана",
    niches: ["Образование", "Психология", "Саморазвитие"],
    verified: false,
    avatarColor: "#8B5CF6",
    followers: 87000,
    avgViews: 145000,
    avgLikes: 12800,
    erPercent: 9.1,
    jeliScore: 88,
    demandIndex: 72,
    loyaltyIndex: 94,
    realFollowersPercent: 96,
    priceList: [
      { format: "TikTok видео", price: 55000, reachForecast: 145000, cpm: 379 },
    ],
    audience: {
      gender: { male: 30, female: 70 },
      age: { "13-17": 18, "18-24": 45, "25-34": 30, "35-44": 5, "45+": 2 },
      topCities: [
        { city: "Астана", percent: 40 },
        { city: "Алматы", percent: 30 },
        { city: "Другие", percent: 30 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 2,
    reviews: {
      avgRating: 4.8, responseTime: 4.7, briefCompliance: 4.9, punctuality: 4.8,
      comments: [],
      collaborations: [],
    },
  },
  {
    id: "10",
    name: "Тимур Жексебеков",
    username: "timur_auto",
    platform: "youtube",
    city: "Алматы",
    niches: ["Авто", "Тест-драйвы", "Технологии"],
    verified: true,
    avatarColor: "#EF4444",
    followers: 447000,
    avgViews: 125000,
    avgLikes: 6800,
    erPercent: 3.6,
    jeliScore: 77,
    demandIndex: 85,
    loyaltyIndex: 79,
    realFollowersPercent: 89,
    priceList: [
      { format: "YouTube интеграция", price: 250000, reachForecast: 125000, cpm: 2000 },
      { format: "Dedicated видео", price: 450000, reachForecast: 200000, cpm: 2250 },
    ],
    audience: {
      gender: { male: 88, female: 12 },
      age: { "13-17": 5, "18-24": 25, "25-34": 42, "35-44": 22, "45+": 6 },
      topCities: [
        { city: "Алматы", percent: 38 },
        { city: "Астана", percent: 28 },
        { city: "Другие", percent: 34 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 7,
    reviews: {
      avgRating: 4.4, responseTime: 4.3, briefCompliance: 4.5, punctuality: 4.4,
      comments: ["Огромная аудитория мужчин-автомобилистов."],
      collaborations: [{ brand: "Auto.kz", niche: "Авто", date: "Мар 2025" }],
    },
  },
  {
    id: "11",
    name: "Малика Ержанова",
    username: "malika_workout",
    platform: "instagram",
    city: "Алматы",
    niches: ["Фитнес", "Здоровый образ жизни"],
    verified: false,
    avatarColor: "#22C55E",
    followers: 134000,
    avgViews: 38000,
    avgLikes: 7100,
    erPercent: 6.8,
    jeliScore: 84,
    demandIndex: 78,
    loyaltyIndex: 86,
    realFollowersPercent: 92,
    priceList: [
      { format: "Reels", price: 55000, reachForecast: 38000, cpm: 1447 },
      { format: "Stories (2 шт)", price: 25000, reachForecast: 16000, cpm: 1563 },
    ],
    audience: {
      gender: { male: 25, female: 75 },
      age: { "13-17": 8, "18-24": 38, "25-34": 42, "35-44": 10, "45+": 2 },
      topCities: [
        { city: "Алматы", percent: 50 },
        { city: "Астана", percent: 20 },
        { city: "Другие", percent: 30 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 2,
    reviews: {
      avgRating: 4.6, responseTime: 4.5, briefCompliance: 4.7, punctuality: 4.6,
      comments: [],
      collaborations: [],
    },
  },
  {
    id: "12",
    name: "Нуркен Сейткали",
    username: "nurken_invest",
    platform: "tiktok",
    city: "Астана",
    niches: ["Финансы", "Инвестиции", "Криптовалюта"],
    verified: true,
    avatarColor: "#F59E0B",
    followers: 221000,
    avgViews: 310000,
    avgLikes: 21000,
    erPercent: 5.9,
    jeliScore: 81,
    demandIndex: 76,
    loyaltyIndex: 83,
    realFollowersPercent: 90,
    priceList: [
      { format: "TikTok видео", price: 90000, reachForecast: 310000, cpm: 290 },
      { format: "Коллаборация", price: 170000, reachForecast: 550000, cpm: 309 },
    ],
    audience: {
      gender: { male: 65, female: 35 },
      age: { "13-17": 8, "18-24": 35, "25-34": 42, "35-44": 12, "45+": 3 },
      topCities: [
        { city: "Астана", percent: 38 },
        { city: "Алматы", percent: 32 },
        { city: "Другие", percent: 30 },
      ],
    },
    subscriberGrowth: [],
    recentViews: [],
    topRubrics: [],
    trendingTopics: [],
    publishFrequency: 2,
    reviews: {
      avgRating: 4.5, responseTime: 4.4, briefCompliance: 4.6, punctuality: 4.5,
      comments: [],
      collaborations: [],
    },
  },
];

// ─── Campaigns ────────────────────────────────────────────────────────────────

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    title: "Летняя коллекция 2025",
    status: "active",
    budget: 500000,
    spent: 285000,
    startDate: "01.04.2025",
    endDate: "30.04.2025",
    influencersCount: 4,
    reach: 680000,
    clicks: 12400,
    er: 5.8,
    niche: "Мода",
    platform: "instagram",
    influencers: [
      { id: "5", name: "Гульнара Жаксыбекова", username: "gulnara_style", avatarColor: "#10B981", status: "published", price: 75000, reach: 180000, contentUrl: "#" },
      { id: "8", name: "Аблай Касымов", username: "ablay_travel", avatarColor: "#06B6D4", status: "published", price: 75000, reach: 210000, contentUrl: "#" },
      { id: "3", name: "Алина Ким", username: "alina_beauty_kz", avatarColor: "#EC4899", status: "review", price: 80000, reach: 0 },
      { id: "1", name: "Айгерим Сатпаева", username: "aigerim_fit", avatarColor: "#0064FF", status: "accepted", price: 55000, reach: 0 },
    ],
  },
  {
    id: "c2",
    title: "Запуск нового продукта",
    status: "review",
    budget: 750000,
    spent: 180000,
    startDate: "15.04.2025",
    endDate: "15.05.2025",
    influencersCount: 3,
    reach: 420000,
    clicks: 8200,
    er: 4.9,
    niche: "Технологии",
    platform: "youtube",
    influencers: [
      { id: "2", name: "Данияр Ахметов", username: "daniyar_tech", avatarColor: "#7C3AED", status: "review", price: 60000, reach: 0 },
      { id: "6", name: "Рустам Темиров", username: "rustam_finance", avatarColor: "#0EA5E9", status: "accepted", price: 60000, reach: 0 },
      { id: "10", name: "Тимур Жексебеков", username: "timur_auto", avatarColor: "#EF4444", status: "invited", price: 60000, reach: 0 },
    ],
  },
  {
    id: "c3",
    title: "Фитнес-марафон апрель",
    status: "active",
    budget: 300000,
    spent: 240000,
    startDate: "01.03.2025",
    endDate: "31.03.2025",
    influencersCount: 3,
    reach: 1100000,
    clicks: 22000,
    er: 7.2,
    niche: "Фитнес",
    platform: "tiktok",
    influencers: [
      { id: "1", name: "Айгерим Сатпаева", username: "aigerim_fit", avatarColor: "#0064FF", status: "published", price: 85000, reach: 450000, contentUrl: "#" },
      { id: "7", name: "Самал Байжанова", username: "samal_life", avatarColor: "#F59E0B", status: "published", price: 120000, reach: 520000, contentUrl: "#" },
      { id: "11", name: "Малика Ержанова", username: "malika_workout", avatarColor: "#22C55E", status: "published", price: 35000, reach: 130000, contentUrl: "#" },
    ],
  },
  {
    id: "c4",
    title: "Рамазан 2025",
    status: "completed",
    budget: 400000,
    spent: 400000,
    startDate: "01.03.2025",
    endDate: "30.03.2025",
    influencersCount: 5,
    reach: 2100000,
    clicks: 38000,
    er: 6.4,
    niche: "Еда",
    platform: "tiktok",
    influencers: [],
  },
  {
    id: "c5",
    title: "Бренд-кампания Q2",
    status: "draft",
    budget: 1000000,
    spent: 0,
    startDate: "01.05.2025",
    endDate: "30.06.2025",
    influencersCount: 0,
    reach: 0,
    clicks: 0,
    er: 0,
    niche: "Лайфстайл",
    platform: "instagram",
    influencers: [],
  },
];

// ─── Transactions ─────────────────────────────────────────────────────────────

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "t1", date: "05.04.2025", type: "payment", amount: -85000, status: "completed", campaign: "Фитнес-марафон", description: "Выплата @aigerim_fit" },
  { id: "t2", date: "05.04.2025", type: "payment", amount: -120000, status: "completed", campaign: "Фитнес-марафон", description: "Выплата @samal_life" },
  { id: "t3", date: "04.04.2025", type: "commission", amount: -15250, status: "completed", campaign: "Фитнес-марафон", description: "Комиссия платформы 7.5%" },
  { id: "t4", date: "02.04.2025", type: "freeze", amount: -285000, status: "completed", campaign: "Летняя коллекция 2025", description: "Заморозка бюджета кампании" },
  { id: "t5", date: "01.04.2025", type: "deposit", amount: 500000, status: "completed", description: "Пополнение через Kaspi" },
  { id: "t6", date: "28.03.2025", type: "payment", amount: -35000, status: "completed", campaign: "Рамазан 2025", description: "Выплата @malika_workout" },
  { id: "t7", date: "25.03.2025", type: "deposit", amount: 750000, status: "completed", description: "Пополнение через карту" },
  { id: "t8", date: "20.03.2025", type: "commission", amount: -30000, status: "completed", campaign: "Рамазан 2025", description: "Комиссия платформы 7.5%" },
  { id: "t9", date: "15.03.2025", type: "freeze", amount: -400000, status: "completed", campaign: "Рамазан 2025", description: "Заморозка бюджета кампании" },
  { id: "t10", date: "10.03.2025", type: "deposit", amount: 1000000, status: "completed", description: "Пополнение через Freedom Pay" },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────

export const MOCK_DASHBOARD = {
  kpi: {
    activeCampaigns: 2,
    totalReach: 1780000,
    budgetSpent: 525000,
    avgROI: 3.4,
  },
  reachData: {
    "7d": [
      { date: "Пн", reach: 48000 },
      { date: "Вт", reach: 72000 },
      { date: "Ср", reach: 65000 },
      { date: "Чт", reach: 89000 },
      { date: "Пт", reach: 110000 },
      { date: "Сб", reach: 142000 },
      { date: "Вс", reach: 95000 },
    ],
    "30d": Array.from({ length: 30 }, (_, i) => ({
      date: `${i + 1}`,
      reach: Math.floor(40000 + Math.random() * 80000 + i * 2000),
    })),
    "90d": Array.from({ length: 13 }, (_, i) => ({
      date: `Н${i + 1}`,
      reach: Math.floor(250000 + Math.random() * 200000 + i * 15000),
    })),
  },
  topInfluencers: [
    { id: "7", name: "Самал Байжанова", username: "samal_life", er: 8.3, roi: 4.8, avatarColor: "#F59E0B" },
    { id: "1", name: "Айгерим Сатпаева", username: "aigerim_fit", er: 6.2, roi: 4.1, avatarColor: "#0064FF" },
    { id: "4", name: "Бекзат Нурланов", username: "bekzat_eats", er: 7.1, roi: 3.9, avatarColor: "#F97316" },
  ],
  activity: [
    { id: "a1", type: "publish" as const, text: "@samal_life опубликовала контент по кампании «Фитнес-марафон»", time: "2 ч назад", avatarColor: "#F59E0B" },
    { id: "a2", type: "approve" as const, text: "@alina_beauty_kz отправила черновик на согласование", time: "4 ч назад", avatarColor: "#EC4899" },
    { id: "a3", type: "payment" as const, text: "Выплата 85 000 ₸ → @aigerim_fit прошла успешно", time: "5 ч назад", avatarColor: "#0064FF" },
    { id: "a4", type: "offer" as const, text: "@daniyar_tech принял оффер по кампании «Запуск продукта»", time: "Вчера, 18:30", avatarColor: "#7C3AED" },
    { id: "a5", type: "campaign" as const, text: "Кампания «Рамазан 2025» успешно завершена", time: "2 дня назад" },
  ],
  aiUsage: { used: 18, limit: 30 },
  walletBalance: 1215000,
  frozenBalance: 285000,
};

// ─── AI Sessions ─────────────────────────────────────────────────────────────

export const MOCK_AI_SESSIONS = [
  { id: "s1", title: "Подбор блогеров для фитнес-продукта", date: "Сегодня", preview: "Нашёл 5 подходящих блогеров..." },
  { id: "s2", title: "Сравнение @aigerim_fit и @malika_workout", date: "Вчера", preview: "Оба блогера хорошо подходят..." },
  { id: "s3", title: "Оффер для Самал Байжановой", date: "3 апр", preview: "Уважаемая Самал, ТОО «Jeli»..." },
  { id: "s4", title: "Анализ кампании Рамазан", date: "1 апр", preview: "По итогам кампании ROI составил..." },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS = [
  { id: "n1", type: "publish", title: "@samal_life опубликовала контент", body: "Кампания «Фитнес-марафон апрель» — контент вышел", time: "2 ч назад", read: false, avatarColor: "#F59E0B" },
  { id: "n2", type: "review", title: "Черновик на согласовании", body: "@alina_beauty_kz загрузила черновик для кампании «Летняя коллекция»", time: "4 ч назад", read: false, avatarColor: "#EC4899" },
  { id: "n3", type: "payment", title: "Выплата прошла", body: "85 000 ₸ переведено @aigerim_fit", time: "5 ч назад", read: true, avatarColor: "#22C55E" },
  { id: "n4", type: "accept", title: "@daniyar_tech принял оффер", body: "Кампания «Запуск нового продукта»", time: "Вчера", read: true, avatarColor: "#7C3AED" },
  { id: "n5", type: "system", title: "Подписка истекает через 7 дней", body: "Тариф «Стандарт» — продлите до 12 апреля", time: "2 дня назад", read: true },
  { id: "n6", type: "campaign", title: "Кампания завершена", body: "«Рамазан 2025» — итоговый отчёт готов", time: "3 дня назад", read: true },
];
