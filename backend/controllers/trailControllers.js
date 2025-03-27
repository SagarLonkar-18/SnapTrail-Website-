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

