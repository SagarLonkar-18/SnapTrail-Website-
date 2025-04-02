import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TrailContext = createContext();

export const TrailProvider = ({children}) => {
    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchTrails(){
        try{
            const {data} = await axios.get("/api/trail/all");
            setTrails(data);
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTrails();
    },[]);

    const [trail, setTrail] = useState([]);


    async function fetchTrail(id){
        setLoading(true);
        try{
            const {data} = await axios.get("/api/trail/" + id);
            setTrail(data);
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    return <TrailContext.Provider value={{trails, loading, fetchTrail, trail}}>
        {children}
    </TrailContext.Provider>
}

export const TrailData = () => useContext(TrailContext);