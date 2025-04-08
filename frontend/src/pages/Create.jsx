import React, { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { TrailData } from '../context/TrailContext';
import {useNavigate} from 'react-router-dom';
import { Loading } from '../components/Loading';

const Create = () => {

    const inputRef = useRef(null);

    const {loading} = TrailData();

    const handleClick = () => {
        inputRef.current.click();
    }

    const [file, setFile] = useState("");
    const [filePrev, setFilePrev] = useState("");
    const [title, setTitle] = useState("");
    const [trail, setTrail ] = useState("");

    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setFilePrev(reader.result);
            setFile(file);
        }
    }

    const {addTrail} = TrailData();
    const navigate = useNavigate();

    const addTrailHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title",title);
        formData.append("trail",trail);
        formData.append("file",file);

        addTrail(formData,setFilePrev, setFile, setTitle, setTrail, navigate)
    }

    return (
        loading ? <Loading/> : 
        <div className='flex flex-wrap justify-center items-center gap-2 mt-10'>
            <div className='flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center w-80 h-auto p-6 bg-white rounded-lg shadow-lg'>
                    {
                        filePrev && <img src={filePrev} alt=""/>
                    }
                    <div className='flex flex-col items-center justify-center h-full cursor-pointer' onClick={handleClick}>
                        <input type="file" accept='image/*' className='hidden' ref={inputRef} onChange={changeFileHandler}/>
                        <div className='w-12 h-12 mb-4 flex items-center justify-center bg-gray-200 rounded-full mt-4'>
                            <FaPlus/>
                        </div>
                        <p className='text-gray-500'>Choose a file</p>
                    </div>
                    <p className='mt-4 text-sm text-gray-400'>we recommend using high quality .jpg but less than 10MB</p>
                </div>
            </div>
            <div >
                <div className='flex items-center justify-center bg-gray-100'>
                    <form className='w-full max-w-lg p-6 bg-white rounded-lg shadow-lg' onSubmit={addTrailHandler}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" id="title" className="common-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="trail" className="block text-sm font-medium text-gray-700">Trail Description</label>
                            <input type="text" id="trail" className="common-input" value={trail} onChange={(e) => setTrail(e.target.value)} required />
                        </div>
                        <button className='common-btn'>Create Trail</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create