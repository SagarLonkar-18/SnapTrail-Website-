import React from 'react';
import { Link } from 'react-router-dom';

const TrailCard2 = ({ trail }) => {
    return (
        <div className="break-inside-avoid mb-6">
            <div className="bg-white rounded-lg overflow-hidden shadow group relative cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
                <img
                src={trail.image.url}
                alt=""
                className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
                    <Link
                        to={`/trail/${trail._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 text-sm transition duration-300"
                    >
                        View Trail
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrailCard2;
