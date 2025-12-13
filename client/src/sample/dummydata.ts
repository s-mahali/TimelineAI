import type { TimelineEvent } from "../types/types";

const NOKIA_DATA: TimelineEvent[] = [

  {
    "id": "1",
    "year": 1865,
    "title": "Founding of Nokia Company",
    "description": "Fredrik Idestam establishes a pulp mill near the Tammerkoski rapids in Finland, marking the very beginning of the Nokia story as an industrial conglomerate.",
    "type": "historical",
    "sentiment": "neutral",
    "impactScore": 30,
    "tags": ["founding", "industrial", "Finland"],
    "imageUrl": {
      "url": "https://image2.slideserve.com/4828065/the-nokia-story-l.jpg"
    }
  },
  {
    "id": "2",
    "year": 1982,
    "title": "Launch of Mobira Talkman",
    "description": "Nokia introduces the Mobira Talkman, one of the world's first portable phones, weighing nearly 5kg. This marked Nokia's serious entry into mobile telecommunications.",
    "type": "historical",
    "sentiment": "positive",
    "impactScore": 70,
    "tags": ["mobile phone", "telecommunications", "innovation", "Mobira"],
    "imageUrl": {
      "url": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Mobira_Talkman.jpg"
    }
  },
  {
    "id": "3",
    "year": 1998,
    "title": "World's Largest Mobile Phone Manufacturer",
    "description": "Nokia overtakes Motorola to become the world's largest mobile phone manufacturer, a position it would hold for over a decade, driven by iconic models and global expansion.",
    "type": "historical",
    "sentiment": "positive",
    "impactScore": 90,
    "tags": ["market leadership", "mobile phones", "global expansion", "GSM"],
    "imageUrl": {
      "url": "https://theshillongtimes.com/wp-content/uploads/2017/06/Nokia-3310.jpg"
    }
  },
  {
    "id": "4",
    "year": 2007,
    "title": "Failure to Adapt to Smartphone Revolution",
    "description": "With the launch of the Apple iPhone, Nokia, relying heavily on its Symbian OS, failed to anticipate and adapt to the rapid shift towards touchscreen smartphones, beginning its market share decline.",
    "type": "historical",
    "sentiment": "negative",
    "impactScore": 85,
    "tags": ["smartphone revolution", "Symbian", "missed opportunity", "competition"],
    "imageUrl": {
      "url": "https://cdn.vox-cdn.com/thumbor/0vK0U2k2c2nYJx6k6t7Bf9oJ3U8=/0x0:3000x2000/1200x800/filters:focal(1260x760:1740x1240)/cdn.vox-cdn.com/uploads/chorus_image/image/71490202/iphone_2007.0.jpg"
    }
  },
  {
    "id": "5",
    "year": 2013,
    "title": "Sale of Devices & Services Division to Microsoft",
    "description": "Nokia sells its mobile phone and devices division to Microsoft for approximately $7.2 billion, marking the end of its era as a direct mobile phone manufacturer.",
    "type": "historical",
    "sentiment": "negative",
    "impactScore": 95,
    "marketValue": "$7.2 billion",
    "tags": ["acquisition", "Microsoft", "restructuring", "mobile devices"],
    "imageUrl": {
      "url": "https://imgv2-2-f.scribdassets.com/img/document/273449028/original/229e236afe/1?v=1"
    }
  },
  {
    "id": "6",
    "year": 2016,
    "title": "Nokia Brand Re-enters Smartphone Market (via HMD Global)",
    "description": "Nokia licenses its brand name to HMD Global, allowing the production and sale of new Nokia-branded smartphones and feature phones running Android.",
    "type": "historical",
    "sentiment": "neutral",
    "impactScore": 60,
    "tags": ["brand licensing", "Android", "HMD Global", "comeback"],
    "imageUrl": {
      "url": "https://www.hmdglobal.com/static/media/phones.4e9d2f2a.jpg"
    }
  },
  {
    "id": "7",
    "year": 2025,
    "title": "Leading Global 5G & 6G Infrastructure Provider",
    "description": "Nokia is expected to solidify its position as one of the top global providers of 5G and future 6G network infrastructure.",
    "type": "prediction",
    "sentiment": "positive",
    "impactScore": 80,
    "marketValue": "Growing",
    "tags": ["5G", "6G", "network infrastructure", "telecoms", "future connectivity"],
    "imageUrl": {
      "url": "https://www.nokia.com/sites/default/files/2023-02/5g_network.jpg"
    }
  },
  {
    "id": "8",
    "year": 2028,
    "title": "Expansion in Industrial Private Wireless Networks",
    "description": "Nokia will expand its footprint in private wireless networks for industrial and enterprise customers, enabling automation and digital transformation.",
    "type": "prediction",
    "sentiment": "positive",
    "impactScore": 75,
    "marketValue": "Growing segment",
    "tags": ["private networks", "industry 4.0", "enterprise solutions", "automation"],
    "imageUrl": {
      "url": "https://www.nokia.com/sites/default/files/2022-06/private-wireless.jpg"
    }
  },
  {
    "id": "9",
    "year": 2030,
    "title": "Key Player in AI-Driven Network Optimization",
    "description": "Nokia will leverage AI and machine learning to deliver advanced network optimization and automation integrated with IoT and cloud platforms.",
    "type": "prediction",
    "sentiment": "positive",
    "impactScore": 70,
    "marketValue": "High potential",
    "tags": ["AI", "IoT", "network automation", "cloud solutions", "machine learning"],
    "imageUrl": {
      "url": "https://www.nokia.com/sites/default/files/2025-03/new-banner-1920x1080_v3.jpg?height=774&width=1376"
    }
  }

];

export { NOKIA_DATA };