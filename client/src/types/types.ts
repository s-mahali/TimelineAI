 
export type TimelineEvent = {
  id: string
  year: number
  title: string
  description: string
  type: "historical" | "prediction"
  sentiment: "positive" | "negative" | "neutral"

  marketValue?: string

 
  imageUrl?: {
    url: string
  }
  impactScore?: number
  tags?: string[]
}
