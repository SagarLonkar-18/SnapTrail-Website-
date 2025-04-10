import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TrailData } from '../context/TrailContext';
import { Loading } from '../components/Loading';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const TrailPage = ({user}) => {
    const params = useParams();

    const {loading, fetchTrail, trail, updateTrail, addComment, deleteComment, deleteTrail} = TrailData();
    // console.log(trail);

    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [trailValue, setTrailValue] = useState("");

    const editHandler = () => {
        setTitle(trail.title);
        setTrailValue(trail.trail);
        setEdit(!edit);
    }

    const updateHandler = () => {
        updateTrail(trail._id, title, trailValue, setEdit);
    }

    const [comment, setComment] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();  // make sure there is no reload
        addComment(trail._id, comment, setComment);
    }

    const deleteCommentHandler = (id) => {
        if(confirm("Are you sure you want to delete the comment ?")){
            deleteComment(trail._id, id);
        }
    }

    const navigate = useNavigate();

    const deleteTrailHandler = () => {
        if(confirm("Are you sure you want to delete the trail?")){
            deleteTrail(trail._id,navigate);
        }
    }

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
                        <div className='w-full md:w-1/2 bg-gray-200 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center'>
                            { 
                                trail.image &&
                                <img src={trail.image.url} className='object-cover w-full rounded-t-lg md:rounded-l-l'  alt="trailImage"/>
                            }
                        </div>
                        <div className='w-full md:w-1/2 p-6 flex flex-col'>
                            <div className='flex items-center justify-between mb-4 '>
                                {
                                    edit ? <input value={title} onChange={e=>setTitle(e.target.value)} className='common-input' style={{width:"200px"}} placeholder='Enter Title' type="text" /> 
                                    : <h1 className='text-2xl font-bold'>{trail.title}</h1>
                                }
                                {
                                    trail.owner && trail.owner._id === user._id &&
                                    <button onClick={editHandler}><FaEdit /></button>
                                }
                                {
                                    trail.owner && trail.owner._id === user._id && 
                                    <button className='bg-red-500 text-white py-1 px-3 rounded'
                                    onClick={deleteTrailHandler}>
                                        <MdDelete/>
                                    </button>
                                }
                            </div>
                            {
                                edit ? <input value={trailValue} onChange={e=>setTrailValue(e.target.value)} className='common-input' style={{width:"200px"}} placeholder='Enter Title' type="text" /> 
                                : <p className='mb-6' >{trail.trail}</p>
                            }
                            {
                                edit && <button style={{width:"200px"}} onClick={updateHandler} className='bg-red-500 text-white py-1 px-3 mt-2 mb-2'>Update</button>
                            }
                            {
                                trail.owner && 
                                <div className='flex items-center justify-between border-b pb-4 mb-4'>
                                    <div className='flex items-center'>
                                        <Link to={`/user/${trail.owner._id}`}>
                                            <div className='rounded-full h-12 w-12 bg-blue-100 flex items-center justify-center'>
                                                <span className='font-bold'>{trail.owner.name.slice(0,1)}</span>
                                            </div>
                                        </Link>
                                        <div className='ml-4'>
                                            <h2 className='text-lg font-semibold'>{trail.owner.name}</h2>
                                            <p className='text-gray-500'>{trail.owner.followers.length} Followers</p>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className='flex items-center mt-4 '>
                                <div className='rounded-full h-12 w-12 bg-blue-100 flex items-center justify-center mr-4'>
                                    <span className='font-bold'>
                                        {trail.owner && trail.owner.name.slice(0,1)}
                                    </span>
                                </div>
                                <form className='flex-1 flex' onSubmit={submitHandler}>
                                    <input type="text" className='flex-1 border rounded-lg p-2' required placeholder='Add comment' 
                                    value={comment} onChange={e=>setComment(e.target.value)}/>
                                    <button type='submit' className='ml-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white'>Add+</button>
                                </form>
                            </div>
                            <hr className='font-bold text-gray-400 mt-3 mb-3 '/>
                            <div className='overflow-y-auto h-60'>
                                {
                                    trail.comments && trail.comments.length>0 ? trail.comments.map((e,index)=>(
                                        <div className='flex items-center justify-between mb-4'>
                                            <div className='flex items-center mb-4 justify-center'>
                                                <Link to={`/user/${e.user}`}>
                                                    <div className='rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center'>
                                                        <span className='font-bold'>{e.name.slice(0,1)}</span>
                                                    </div>
                                                </Link>
                                                <div className="ml-4 ">
                                                    <div className="ml-4 ">
                                                        <h2 className='text-lg font-semibold'>{e.name}</h2>
                                                        <p className='text-gray-500'>{e.comment}</p>
                                                    </div>
                                                </div>
                                                {
                                                    e.user === user._id && 
                                                    <button className='bg-red-500 text-white py-1 px-3 rounded mx-4'
                                                    onClick={()=>deleteCommentHandler(e._id)}>
                                                        <MdDelete/>
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    )) : <p>Be the first one to add comment</p>
                                }
                            </div>
                        </div>
                    </div>
                    } 
                </div>
            }
        </div>
    )
}

export default TrailPage