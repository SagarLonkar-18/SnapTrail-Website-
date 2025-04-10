import React from 'react';
import { TrailData } from '../context/TrailContext';
import TrailCard2 from '../components/TrailCard2';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext';

const Account = ({ user }) => {
    const { trails } = TrailData();

    const userTrails = trails ? trails.filter((trail) => trail.owner === user._id) : [];

    const navigate = useNavigate();
    const { setIsAuth, setUser } = UserData();

    const logoutHandler = async () => {
        try {
            const { data } = await axios.get('/api/user/logout');
            toast.success(data.message);
            navigate('/login');
            setIsAuth(false);
            setUser([]);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="p-6 w-full max-w-6xl mx-auto">
                <div className="flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-3xl text-gray-700">{user.name.slice(0, 1)}</span>
                    </div>
                </div>
                <h1 className="text-center text-2xl font-bold mt-4">{user.name}</h1>
                <p className="text-center text-gray-600 mt-2">{user.email}</p>
                <div className="flex items-center justify-center mt-4 space-x-2">
                    <button
                        onClick={logoutHandler}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition"
                    >
                        Logout
                    </button>
                </div>
                {/* Masonry Trail Section */}
                <div className="mt-10 px-4">
                    <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
                        {userTrails && userTrails.length > 0 ? (
                        userTrails.map((trail) => <TrailCard2 key={trail._id} trail={trail} />)
                        ) : (
                        <p className="text-center text-gray-500">No Trails Yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
    };

export default Account;
