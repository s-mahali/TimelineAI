import { Handle, Position } from "@xyflow/react";
import type { TimelineEvent } from "../types/types";
import { Calendar, TrendingUp } from "lucide-react";


const commonImage = "https://imgs.search.brave.com/3sNIqqoOSw67nu3Yb2695VgWero7OR2uk5fApqVrkGI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbmti/b3RkZXNpZ24uY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI1/LzA0L25va2lhLWJy/YW5kaW5nLWluLTIw/MTYtMTAyNHg1NzYu/d2VicA";

export function CardNode({ data }: { data: TimelineEvent }) {
  const isPrediction = data.type === "prediction";

  console.log("isPrediction", data)
  
  return (
    <div className="relative group w-[400px] h-[450px] bg-[#09090b] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl transition-all duration-500 hover:shadow-blue-500/10 hover:border-zinc-600">
      
     
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />

      {/* Card Header / Image */}
      <div className="h-[180px] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10" />
        
        {/* Year Badge (Floating) */}
        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
             <Calendar className="w-3 h-3 text-zinc-400" />
             <span className="text-xs font-mono font-bold text-white">{data.year}</span>
          </div>
        </div>

        <img 
          src={data?.imageUrl?.url || commonImage} 
          alt={data.title} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isPrediction ? 'grayscale opacity-70' : ''}`} 
        />
      </div>

    
      <div className="p-6 pt-2 relative z-20">
        <div className="flex items-center justify-between mb-3">
            <span className={`text-[11px] font-bold tracking-widest uppercase ${isPrediction ? 'text-purple-400' : 'text-blue-500'}`}>
               {data.type === 'prediction' ? 'Future Event' : 'Historical Event'}
            </span>
            {data.sentiment === 'positive' && <TrendingUp className="w-4 h-4 text-green-500" />}
        </div>

        <div className="text-green-500">
          {data?.marketValue}
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
          {data.title}
        </h3>
        
        <p className="text-base text-zinc-400 leading-relaxed font-normal">
          {data.description}
        </p>
      </div>

      
      <div className={`h-[2px] w-0 group-hover:w-full transition-all duration-700 absolute bottom-0 left-0 ${isPrediction ? 'bg-purple-600' : 'bg-blue-600'}`} />
    </div>
  );
}