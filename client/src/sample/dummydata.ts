import type { TimelineEvent } from "../types/types";

const KOHLI_DATA: TimelineEvent[] = [
  { id: "vk_1", year: 2008, title: "U19 World Cup Win", description: "Captained India to victory, marking the arrival of a future legend.", type: "historical", sentiment: "positive" },
  { id: "vk_2", year: 2011, title: "World Cup Glory", description: "Played a crucial role in the 2011 WC Final victory in Mumbai.", type: "historical", sentiment: "positive" },
  { id: "vk_3", year: 2016, title: "The 973 Season", description: "Shattered records with 973 runs in a single IPL season.", type: "historical", sentiment: "positive" },
  { id: "vk_4", year: 2020, title: "The Lean Patch", description: "A difficult phase with a century drought across all formats.", type: "historical", sentiment: "negative" },
  { id: "vk_5", year: 2022, title: "71st Century", description: "The wait ended with a maiden T20I century vs Afghanistan.", type: "historical", sentiment: "positive" },
  { id: "vk_6", year: 2027, title: "The Farewell", description: "Predicted retirement from international formats.", type: "prediction", sentiment: "neutral" },
];

const NOKIA_DATA: TimelineEvent[] = [
  { id: "nk_1", year: 1865, title: "Paper Mill Origins", description: "Founded as a humble pulp mill in Finland.", type: "historical", sentiment: "neutral" },
  { id: "nk_2", year: 1998, title: "Global Dominance", description: "Became the best-selling mobile phone brand in the world.", type: "historical", sentiment: "positive" },
  { id: "nk_3", year: 2007, title: "The Smartphone Shift", description: "Nokia dismissed the threat of the newly released iPhone.", type: "historical", sentiment: "negative" },
  { id: "nk_4", year: 2013, title: "Microsoft Acquisition", description: "Mobile division sold for $7.2B marking the end of an era.", type: "historical", sentiment: "negative" },
  { id: "nk_5", year: 2025, title: "Network Infrastructure", description: "Reinvented as a leader in 5G and 6G B2B technology.", type: "prediction", sentiment: "positive" },
];

export { KOHLI_DATA, NOKIA_DATA };