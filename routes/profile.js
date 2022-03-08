const express = require("express");
const multer = require("multer");
const middleware = require("../middleware");
const Profile = require("../models/profile.models");
const router = express.Router();
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, req.decoded.username + ".jpg");
    },
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        cb(null, true);
    }else{
        cb(null, false);
    }
};


const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1024 * 1024 * 6,
    },
    fileFilter:fileFilter,
});


router
    .route("/add/image")
    .patch(middleware.checkToken, upload.single("img"), async(req, res) => {
        await Profile.findOneAndUpdate().then(
            {username: req.decoded.username},
            {$set: {
                img: req.file.path,
            },
        },
        {new: true},
        (err, profile) => {
            if(err) return res.status(500).send(err);
            const response = {
                message: "image added successfully update",
                data: profile,
            };
            return res.status(200).send(response);
        }
        );
    });

router.route("/add").post(middleware.checkToken, (req, res) => {
    const profile = Profile({
        username:req.decoded.username,
        name:req.body.name,
            proffession:req.body.proffession,
            DOB:req.body.DOB,
            titleline:req.body.titleline,
            about:req.body.about
    });
    profile.save().then(() => {
        return res.json({msg:"profile successfully stored"});
    })
    .catch((err) => {
        return res.status(400).json({err:err});
    });
});

module.exports = router;
