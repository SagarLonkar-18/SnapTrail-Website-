import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TrailData } from '../context/TrailContext';
import TrailCard2 from '../components/TrailCard2';
import { UserData } from '../context/UserContext';

const UserProfile = ({user:loggedInUser}) => {

    const params = useParams();
    const[user,setUser] = useState([]);

    async function fetchUser(){
        try {
            const {data} = await axios.get(`/api/user/${params.id}`);
            setUser(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const[isFollow, setIsFollow] = useState(false);

    const { followUser } = UserData();

    const followHandler = () => {
        setIsFollow(!isFollow);
        followUser(user._id, fetchUser);
    }

    const followers = user.followers;
    
    useEffect(()=>{
        if(followers && followers.includes(loggedInUser._id)) setIsFollow(true)
    },[user])

    const {trails} = TrailData();
    let userTrails;
    if(trails){
        userTrails = trails.filter((trail)=> trail.owner === user._id); 
    }

    useEffect(()=>{
        fetchUser();
    },[params.id])

    return (
        <div>
            {
                user && 
                <div className='flex flex-col items-center justify-center'>
                    <div className='p-6 w-full'>
                        <div className='flex items-center justify-center'>
                            <div className='w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center'>
                                <span className='text-3xl text-gray-700'>
                                    {user.name ? user.name.slice(0, 1) : ''}
                                </span>
                            </div>
                        </div>
                        <h1 className='text-center text-2xl font-bold mt-4'>{user.name}</h1>
                        <p className='text-center text-gray-600 mt-2'>{user.email}</p>
                        <div className='flex items-center justify-center text-center text-gray-600 mt-2 gap-3'>
                            <p>{user.followers ? user.followers.length : 0} followers</p>
                            <p>{user.following ? user.following.length : 0} following</p>
                        </div>
                        <div className='flex items-center justify-center mt-4 space-x-2'>
                            {   
                                user._id != loggedInUser._id ? 
                                <button onClick={followHandler} className='bg-blue-500 hover:bg-blue-600 px-8 py-4 text-white font-bold rounded-full'>
                                { isFollow ? "Unfollow" : "Follow"}
                                </button> : "Your Profile"
                            }
                        </div>
                        {/* Masonry layout */}
                        <div className="max-w-6xl mx-auto px-4 py-10">
                            <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
                                {userTrails && userTrails.length > 0 ? (
                                userTrails.map((trail) => (
                                    <TrailCard2 key={trail._id} trail={trail} />
                                ))
                                ) : (
                                <p>No Trails Yet</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default UserProfile