import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TrailData } from '../context/TrailContext';
import { Loading } from '../components/Loading';

const TrailPage = () => {
    const params = useParams();

    const {loading, fetchTrail, trail} = TrailData();
    // console.log(trail);

    useEffect(() => {
        fetchTrail(params.id);
    }, [params.id]);

    return (
        <div>
            {
                trail && 
                <div className='flex flex-col items-center bg-gray-100 p-4 min-h-screen '>
                    {loading ? <Loading/> : 
                    <div className='bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl' >
                        
                    </div>
                    } 
                </div>
            }
        </div>
    )
}

export default TrailPage