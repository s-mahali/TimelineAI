import { ArrowRight } from "lucide-react"
import type { TimelineEvent } from "../types/types"


export const Footer = ({activeData} : {activeData : TimelineEvent[]}) =>{

    return (
              <div className="fixed top-8 left-8 z-50 pointer-events-none">
        <div className="bg-black/80 backdrop-blur border border-zinc-800 rounded-lg p-4 max-w-sm pointer-events-auto shadow-2xl">
          <h4 className="text-sm font-bold text-zinc-300 mb-2 flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-blue-500"/> Quick Stats
          </h4>
          <div className="flex gap-4 text-xs text-zinc-500">
            <div>
              <span className="block text-white font-mono text-lg">{activeData[0]?.year}</span>
              Start Year
            </div>
            <div className="w-[1px] bg-zinc-800" />
            <div>
              <span className="block text-white font-mono text-lg">{activeData[activeData.length - 1]?.year}</span>
              End Year
            </div>
            <div className="w-[1px] bg-zinc-800" />
            <div>
              <span className="block text-white font-mono text-lg">{activeData.length}</span>
              Events
            </div>
          </div>
        </div>
      </div>
    )
}