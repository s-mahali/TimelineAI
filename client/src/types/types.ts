export type TimelineEvent = {
  id: string;
  year: number;
  title: string;
  url? : string;
  description: string;
  type: "historical" | "prediction";
  sentiment: "positive" | "negative" | "neutral";
};