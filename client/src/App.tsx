import React, { useState, useCallback, useEffect } from "react";
import { useApiCalls } from "./Store/api.calls";
import {
 type NodeTypes,
 
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Search,  Loader2, Heart } from "lucide-react";
import type { TimelineEvent } from "./types/types";
import { KOHLI_DATA, NOKIA_DATA } from "./sample/dummydata";
import { TimelineCanvas } from "./Component/Timeline";
import { CardNode } from "./Component/CardNode";
import { Footer } from "./Component/Footer";
 export const nodeTypes: NodeTypes = { card: CardNode };

 


 
export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeData, setActiveData] = useState<TimelineEvent[]>(KOHLI_DATA);
  const [topic, setTopic] = useState("Virat Kohli");

  const {getData} = useApiCalls();

  const handleSearch = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);

    await getData(query);
   
    setTimeout(() => {
      if (query.toLowerCase().includes("nokia")) {
        setActiveData(NOKIA_DATA);
        setTopic("The Rise & Fall of Nokia");
      } else {
        setActiveData(KOHLI_DATA);
        setTopic(query);
      }
      setLoading(false);
    }, 1000);
  };

  return (
   
    <div className="w-screen h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      
 
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-6 pointer-events-none">
        
 
  <div className="pointer-events-auto w-full max-w-2xl px-4">
    <form 
      onSubmit={handleSearch} 
      className="relative"
    >
 
      <div className="relative flex items-center bg-[#09090b]/90 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden">
        
 
        <div className="pl-4 pr-3 text-zinc-500">
          {loading 
            ? <Loader2 className="w-5 h-5 animate-spin text-indigo-400"/> 
            : <Search className="w-5 h-5" />
          }
        </div>

        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any topic..."
          className="w-full bg-transparent py-3 text-base text-white placeholder:text-zinc-600 focus:outline-none"
        />
 
        <button 
          type="submit"
          className="mx-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-medium rounded-md text-white transition-colors border border-white/5 flex items-center gap-2"
        >
          Generate
          <Heart className="w-3 h-3 text-yellow-400" />
        </button>
      </div>
    </form>
  </div>

 
  <div className="mt-4 flex items-center gap-3 text-zinc-500 text-sm">
    <div className="h-[1px] w-8 bg-zinc-700" />
    <span>Timeline: <span className="text-white font-medium">{topic}</span></span>
    <div className="h-[1px] w-8 bg-zinc-700" />
  </div>

</div>

 
      <div className="flex-1 w-full h-full">
        <ReactFlowProvider>
          <TimelineCanvas events={activeData} searchQuery={query} />
        </ReactFlowProvider>
      </div>

    
     <Footer activeData={activeData} />

    </div>
  );
}