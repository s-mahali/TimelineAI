
import {create} from "zustand";

import axios from "axios";

let axiosInstace = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials : false
})

interface ApiCallsStore{
    data : [] | null,
    
    getData  : (event : string) => Promise<void>
}

export const useApiCalls = create<ApiCallsStore>((set) => ({
    data : null,

    getData : async(event : string) =>{
        try {
             let res = await axiosInstace.post("/chat" , {query : event})

             console.log("here we get some response")
        } catch (error) {
             console.log("something went wrong : " , error)
        }
    }
}))