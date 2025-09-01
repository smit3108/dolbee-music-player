const admin = require("../config/firebase.config");
const song = require("../models/song");
const user = require("../models/user");

const router = require("express").Router();

router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(500).json({ message: "Un Authorize" });
    }
    // checking user email already exists or not
    const userExists = await user.findOne({ user_id: decodeValue.user_id });
    if (!userExists) {
      newUserData(decodeValue, req, res);
    } else {
      updateUserData(decodeValue, req, res);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

router.get("/getAll", async (req, res) => {
  const options = {
    // sort returned documents in ascending order
    sort: { createdAt: 1 },
    // Include only the following
    // projection : {}
  };
  try {
    const cursor = await user.find(options);
    if (cursor) {
      console.log(cursor);
      res.status(200).send({ success: true, users: cursor });
    } else {
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, msg: "Internam server error" })
  }

});

router.get("/getUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const userExists = await user.findOne({ _id: filter });
  if (!userExists)
    return res.status(400).send({ success: false, msg: "Invalid User ID" });
  if (userExists.favourites) {
    res.status(200).send({ success: true, data: userExists });
  } else {
    res.status(200).send({ success: false, data: null });
  }
});


router.put("/update/:userId", async (req, res) => {

  const filter = { _id: req.params.userId };
  const role = req.body.role;
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(filter, { role: role }, options);
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
});

router.get("/getfav/:userid", async (req, res) => {
  const filter = { _id: req.params.userid };
  try {
    const userExists = await user.findOne(filter);
    if (!userExists) return res.status(404).send({ success: false, msg: "User not found" });

    const favouriteSongIds = userExists?.favourites.map((favourite) => favourite.songId);
    console.log(filter);
    return res.send(favouriteSongIds);

  } catch (error) {
    return res.status(400).send({ success: false });
  }

})
router.put("/addfav", async (req, res) => {
  const filter = { _id: req.body.userid };
  const songid = req.body.songid;
  try {
    const result = await user.updateOne(
      {
        _id: filter._id,
        favourites: { $elemMatch: { songId: songid } },
      },
      {
        $pull: { favourites: { songId: songid } },
      }
    );
    if (result.modifiedCount > 0) {
      // If the songId was found and removed, return success response
      return res.status(200).send({ success: true, msg: "Song removed from favourites" });
    }
    await user.updateOne(filter, {
      $push: { favourites: { songId: songid } },
    });
    return res.status(200).send({ success: true, msg: "Song added to favourites" });

  } catch (error) {
    return res.status(400).send({ success: false, msg: error });
  }
});



router.get("/delete/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const result = await user.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageURL: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verfied: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

const updateUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

module.exports = router;
