import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({user}) => {
    return (
        <div>
            <div className="bg-white shadow-sm mt-2">
                <div className="mx-auto px-4 py-2 flex justify-between items-center">
                    <Link to="/" className='flex items-center md:mr-5 md:ml-10'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl9Oqbrl3WfO3ueIICGguflYVtUCQcQE707A&s"
                            alt="SnapTrail" className='h-6 md:h-7 md:mr-2'
                        />
                        <span className='text-blue-400 text-xl md:text-2xl font-bold px-1'>SNAPTRAIL</span>
                    </Link>
                    <div className='flex items-center gap-4 justify-end md:justify-evenly w-[200px] md:gap-6 md:mr-10'>
                        <Link to="/" className='text-gray-700 hover:text-gray-900 md:text-lg'>Home</Link>
                        <Link to="/create" className='text-gray-700 hover:text-gray-900 md:text-lg'>Create</Link>
                        <Link to="/account" className='w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-xl text-gray-700'>{user.name.slice(0,1)}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar