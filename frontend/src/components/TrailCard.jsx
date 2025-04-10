import React from 'react';
import { Link } from 'react-router-dom';

const TrailCard = ({ trail }) => {
    return (
        <div className="break-inside-avoid mb-4 rounded-lg overflow-hidden shadow bg-white group">
            <div className="relative w-full">
                <img
                    src={trail.image.url}
                    alt=""
                    className="w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <Link
                        to={`/trail/${trail._id}`}
                        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        View Trail
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrailCard;
