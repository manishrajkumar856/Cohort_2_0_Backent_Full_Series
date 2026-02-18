const followModel = require("../modals/follow.model");
const userModal = require("../modals/user.modals");

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

// async function unfollowUserController(){
//     const followerId = req.user.userId;
//     const followeeId = req.params.userId;

//     const isUserFollowing = await followModel.findOne({
//         follower: followerId,
//         followee: followeeId
//     });

//     if(isUserFollowing){
//         return res.status()
//     }


// }

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


module.exports = {
    followUserConatroller,
    unfollowUserController
}