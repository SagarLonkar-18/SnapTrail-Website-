import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

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

    async function updateTrail(id, title, trail, setEdit){
        try {
            const {data} = await axios.put("/api/trail/"+id,{
                title,
                trail
            })
            toast.success(data.message);
            fetchTrail(id);
            setEdit(false);
        } 
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    async function addComment(id, comment, setComment){
        try {
            const {data} = await axios.post("/api/trail/comment/"+id,{
                comment
            });
            toast.success(data.message);
            fetchTrail(id);
            setComment("");
        } 
        catch (error) {
            toast.error(error.response.data.message);
        } 
    }

    useEffect(() => {
        fetchTrails();
    },[]);

    return <TrailContext.Provider value={{trails, loading, fetchTrail, trail, updateTrail, addComment}}>
        {children}
    </TrailContext.Provider>
}

export const TrailData = () => useContext(TrailContext);