const Post = require("../models/post")
const User = require("../models/user");
const getTrangChu = (req, res) => {
  const userImage = req.session.user;
  const user = JSON.stringify(req.session.user);

  console.log(user)
  const image = userImage.profilePic;
  return res.render('home.ejs', { userLogin: image, userLoggedInJs: user });
}
const getApiPost = (req, res) => {
  Post.find()
    .populate("postedBy")
    .populate("retweetData")
    .sort({ "createdAt": -1 })
    .then(async (results) => {
      console.log('important')
      console.log(results);
      results = await User.populate(results, { path: "retweetData.postedBy" })
      res.status(200).send(results)
    }).catch((error) => {
      console.log(error)
      res.status(400)
    })
}
const getPost = async (req, res) => {
  const content = req.body.content;
  const postedBy = req.session.user;

  if (content) {
    const newpost = new Post({
      content, postedBy
    })
    await newpost.save().then(async (result) => {
      console.log(result)
      try {
        result = await User.populate(result, { path: "postedBy" })

        res.status(201).send(result)
      } catch (error) {
        console.log(error)
      }
    }).catch((error) => {
      res.status(400)
    });
  } else {
    return res.status(400)
  }
}
const getApiLikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.session.user._id;
  console.log(userId)
  // console.log(req.session.user._id)
  const isLiked = req.session.user.likes && req.session.user.likes.includes(postId);
  const option = isLiked ? "$pull" : "$addToSet";
  req.session.user = await User.findByIdAndUpdate(userId, { [option]: { likes: postId } }, { new: true })
    .catch((error) => {
      console.log(error);
      res.status(400);
      return;
    })
  const post = await Post.findByIdAndUpdate(postId, { [option]: { likes: userId } }, { new: true })
    .catch(error => {
      console.log(error)
    })
  console.log(post)
  res.status(200).send(post)
}

const getApiReweetPost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.session.user._id
  console.log(userId)
  const deletePost = await Post.findOneAndDelete({ postedBy: userId, retweetData: postId })
  console.log(deletePost)
  const option = deletePost != null ? "$pull" : "$addToSet";
  let repost = deletePost;
  if (repost == null) {
    repost = await Post.create({ postedBy: userId, retweetData: postId })
      .catch(error => {
        console.log(error);
        res.sendStatus(400);
      })
  }
  console.log(repost)
  console.log(repost._id)
  req.session.user = await User.findByIdAndUpdate(userId, { [option]: { retweets: repost._id } }, { new: true })
    .catch(error => {
      console.log(error)
      res.sendStatus(400)
    })
  const post = await Post.findByIdAndUpdate(postId, { [option]: { retweetUsers: userId } }, { new: true })
    .catch(error => {
      console.log(error)
      res.sendStatus(400)
    })
  return res.status(200).send(post)

}
module.exports = { getTrangChu, getPost, getApiPost, getApiLikePost, getApiReweetPost }