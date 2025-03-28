import { Trail } from "../models/trailModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

export const createTrail = TryCatch(async(req,res)=>{
    const {title,trail} = req.body;

    const file = req.file;
    const fileUrl = getDataUrl(file);

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    await Trail.create({
        title,
        trail,
        image:{
            id: cloud.public_id,
            url: cloud.secure_url
        },
        owner: req.user._id,
    }) 
    res.json({
        message: "Pin created successfully"
    });
});

export const getAllTrails = TryCatch(async(req,res) => {
    const trails = await Trail.find().sort({createdAt:-1});
    res.json(trails);
});

export const getSingleTrail = TryCatch(async(req,res) => {
    const trail = await Trail.findById(req.params.id).populate("owner","-password");
    res.json(trail); 
});

export const commentOnTrail = TryCatch(async(req,res) => {
    const trail = await Trail.findById(req.params.id);
    // check if trail is there
    if(!trail){
        return res.status(400).json({
            message: "No trail with this id"
        });
    }
    trail.comments.push({
        user: req.user._id,
        name: req.user.name,
        comment: req.body.comment,
    });
    await trail.save();
    res.json({
        message: "Comment added successfully"
    })
});

export const deleteComment = TryCatch(async(req,res) => {
    const trail = await Trail.findById(req.params.id);
    // check if trail is there
    if(!trail){
        return res.status(400).json({
            message: "No trail with this id"
        });
    }
    if(!req.query.commentId){
        return res.status(404).json({
            message: "Please give comment id"
        })
    }
    const commentIndex = trail.comments.findIndex(
        item => item._id.toString() === req.query.commentId.toString()
    );
    if(commentIndex === -1){
        return res.status(404).json({
            message: "Comment not found"
        })
    }
    const comment = trail.comments[commentIndex];
    // check if user is owner of comment
    if(comment.user.toString() === req.user._id.toString()){
        trail.comments.splice(commentIndex,1);
        await trail.save();
        res.json({
            message: "Comment deleted successfully"
        })
    }
    else{
        return res.status(403).json({
            message: "You are not owner of this comment"
        })
    }
});

export const deleteTrail = TryCatch(async(req,res)=>{
    const trail = await Trail.findById(req.params.id);
    if(!trail){
        return res.status(400).json({
            message: "No trail with this id"
        });
    }
    if(trail.owner.toString() !== req.user._id.toString()){
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
    await cloudinary.v2.uploader.destroy(trail.image.id);
    await trail.deleteOne();
    res.json({
        message: "Trail deleted successfully"
    });
})

export const updateTrail = TryCatch(async(req,res)=>{
    const trail = await Trail.findById(req.params.id);
    if(!trail){
        return res.status(400).json({
            message: "No trail with this id"
        });
    }
    if(trail.owner.toString()!== req.user._id.toString()){
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
    trail.title = req.body.title;
    trail.trail = req.body.trail;
    await trail.save();
    res.json({
        message: "Trail updated successfully"
    });
});