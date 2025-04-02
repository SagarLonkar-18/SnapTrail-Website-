import { Loading } from "../components/Loading";
import TrailCard from "../components/TrailCard";
import { TrailData } from "../context/TrailContext"

const Home = () => {
    const {trails, loading} = TrailData();
    // console.log(trails);
    
    return (
        <div>
            {
                loading ? <Loading/> : 
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="flex flex-wrap m-4">
                            {
                                trails && trails.length>0 ? trails.map((e,i)=>(
                                    <TrailCard key={i} trail={e} />
                                )) : <p>No Trails Yet</p>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home