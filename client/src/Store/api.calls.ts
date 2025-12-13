
import {create} from "zustand";

import axios from "axios";

let axiosInstace = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials : false
})

interface ApiCallsStore{
    data : [] | null,
    loading : boolean,
    getData  : (event : string) => Promise<void>
}

export const useApiCalls = create<ApiCallsStore>((set) => ({
    data : null,
    loading : false,

    getData : async(event : string) =>{
        try {
             
            set({loading : true})
             let res = await axiosInstace.post("/chat" , {query : event});
             let data = res?.data?.payload?.data?.events
             set({data : data , loading : false})
 
        } catch (error) {
             console.log("something went wrong : " , error)
             set({loading : false})
        }
    }
}))