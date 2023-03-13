const Post = require("../models/post")
const User = require("../models/user");
const getTrangChu = (req, res) => {
  const user = req.session.user;
  const image = user.profilePic;
  return res.render('home.ejs', { userLogin: image })
}
const getPost = async (req, res) => {
  const content = req.body.content;
  const postedBy = req.session.user;
  console.log(postedBy);
  if (content) {
    const newpost = new Post({
      content, postedBy
    })
    await newpost.save().then(async (result) => {
      console.log(result)
      try {
        result = await User.populate(result, { path: "postedBy" })
        console.log(result)
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
module.exports = { getTrangChu, getPost }