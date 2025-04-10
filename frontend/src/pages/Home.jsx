import { Loading } from "../components/Loading";
import TrailCard from "../components/TrailCard";
import { TrailData } from "../context/TrailContext";

const Home = () => {
    const { trails, loading } = TrailData();

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {trails && trails.length > 0 ? (
                            trails.map((trail, i) => (
                                <TrailCard key={i} trail={trail} />
                            ))
                        ) : (
                            <p>No Trails Yet</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
