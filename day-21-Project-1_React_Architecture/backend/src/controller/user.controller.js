const followModel = require("../modals/follow.model");
const userModal = require("../modals/user.modals");


// Follow
async function  followUserConatroller(req, res){

    const followerId = req.user.userId;
    const followeeId = req.params.userId;

    if(!followeeId || !followerId){
        return res.status(400).json({
            message: "Invalid Request! Id is messing..."
        })
    }

    if(followerId === followeeId){
        return res.status(400).json({
            message: "You are not following yourself!..."
        })
    }

    try {
        const followee = await userModal.findById(followeeId);

        if(!followee){
            return res.status(404).json({
                message: `User not exist with id ${followeeId}`
            })
        }

        const isAlreadyFollowing = await followModel.findOne(
            {followee:followeeId, follower:followerId}
        );

        if(isAlreadyFollowing){
            return res.status(409).json({
                message: "You are already folloing to "+followeeId,
            })
        }

        const followDocument = await followModel.create({
            followee: followeeId,
            follower: followerId,
        });

        return res.status(201).json({
            message: "You are now follow to the user with id "+followeeId,
            followDocument,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error!"+error
        })
    }
}

// Unfollow
async function  unfollowUserController(req, res) {
    const followerId = req.user.userId;
    const followeeId = req.params.userId;
    
    if(!followeeId || !followeeId){
        return res.status(400).json({
            message: "Invalid Request, id is messing!"
        })
    }

    try {
        const isUserFollowing = await followModel.findOne({
            follower: followerId,
            followee: followeeId,
        })

        if(!isUserFollowing){
            return res.status(404).json({
                message: "You are not following to the user with id "+followeeId
            })
        }

        await followModel.findOneAndDelete({
            follower: followerId,
            followee: followeeId
        });

        return res.status(200).json({
            message: "Unfollow usre successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"+error,
        })
    }
}


// Follow Back
async function  acceptFollowRequestController(req, res) {
    const followDocId = req.params.followId;
    const followeeId = req.user.userId;

    if(!followDocId || !followeeId){
        return res.status(400).json({
            message: "Id is missing!",
        })
    }


    try {
        const isFollowDocExist = await followModel.findById(followDocId);

        console.log(isFollowDocExist, followDocId, followeeId);

        if(!isFollowDocExist){
            return res.status(404).json({
                message: "Follow request not found",
            })
        }

        const isFollow = isFollowDocExist.followee.toString() === followeeId;

        if(!isFollow){
            return res.status(403).json({
                message: "you are not followed by id "+isFollowDocExist.follower,
            })
        }

        const isAlreadyAccepted = isFollowDocExist.status === "accepted";
        if(isAlreadyAccepted){
            return res.status(409).json({
                message: "Already accepted!"
            })
        }

        isFollowDocExist.status = "accepted";
        await isFollowDocExist.save();

        return res.status(200).json({
            message: "Request Accepted",
            isFollowDocExist,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error! : "+error,
        })
    }


    
}

// Reject Request 
async function  rejectFollowRequestController(req, res) {
    const followDocId = req.params.followId;
    const followeeId = req.user.userId;

    if(!followDocId || !followeeId){
        return res.status(400).json({
            message: "Id is missing!"
        })
    }

    try {
        const isReqExist = await followModel.findOne({
            _id: followDocId,
            followee: followeeId
        });


        if(!isReqExist){
            return res.status(404).json({
                message: "Request not exist! with id "+followDocId,
            })
        }

        const isAlredyAccepted = isReqExist.status === "accepted";
        if(isAlredyAccepted){
            return res.status(409).json({
                message: "Request already accepted with id "+followDocId,
            });
        }

        const isAlreadyRejected = isReqExist.status === "rejected";
        if(isAlreadyRejected){
            return res.status(409).json({
                message: "Request already rejected with id "+followDocId,
            });
        }

        isReqExist.status = "rejected";
        await isReqExist.save();

        console.log(isAlredyAccepted);

        return res.status(200).json({
            message: "Reject Request Successfully!",
            isReqExist,
        });


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

module.exports = {
    followUserConatroller,
    unfollowUserController,
    acceptFollowRequestController,
    rejectFollowRequestController,
}