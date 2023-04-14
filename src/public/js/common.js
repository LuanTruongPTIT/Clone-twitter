$("#postTextarea, #replyTextarea").keyup(event => {
  var textbox = $(event.target);

  const isModal = textbox.parents(".modal").length == 1;



  var value = textbox.val().trim();

  var submitButton = isModal ? $("#submitReplyButton") : $('#submitPostButton');

  if (submitButton.length == 0) return alert("No submit button found");
  if (value == "") {
    submitButton.prop("disabled", true);
    return;
  } else
    submitButton.prop("disabled", false);
})

// login-form 
$(document).ready(() => {
  $('#loginForm').submit((e) => {
    e.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();
    if (!username || !password) {
      $('.error').text('Please fill in both the username and password fields');
      return;
    }
    axios.post('/login', {
      username: username,
      password: password
    }).then((response) => {
      if (response.data) {
        window.location.href = "/trang-chu"
      }
    }).catch((error) => {
      console.log(error)
      $('.error').text(error.response.data.message);
    })
  })
})
// Submit button to get API
$("#submitPostButton").click(() => {
  const button = $(event.target);
  const textBox = $("#postTextarea");
  const data = {
    content: textBox.val()
  };
  axios.post('/api/post', data).then((response) => {

    let html = PostHTML(response.data);
    $(".postContainer").prepend(html);
    textBox.val("");
    button.prop("disabled", true);
  })
})

// Function create PostHTML
const PostHTML = async (dataArr) => {
  console.log(dataArr)
  const isRetweet = dataArr.retweetData.length !== 0;
  dataArr = isRetweet ? dataArr.retweetData : dataArr;
  const dataArrs = dataArr
  if (Array.isArray(dataArrs)) {
    dataArr = Object.assign({}, dataArrs[0])
  }
  console.log(dataArr)
  console.log(Array.isArray(dataArr))

  const timestamp = timeDifference(new Date(), new Date(dataArr.createdAt));
  const postedBy = dataArr.postedBy;

  const displayName = postedBy.firstName + " " + postedBy.lastName;
  const likeButtonActiveClass = dataArr.likes.includes(user._id) ? "active" : " ";
  const retweetbuttonActiveClass = dataArr.retweetUsers.includes(user._id) ? 'active' : '';


  const retweetBy = isRetweet ? dataArr.postedBy.username : null;


  let retweetText = '';
  if (isRetweet) {
    retweetText = `<span>
    <i class='fas fa-retweet'></i>
    Retweeted by <a href="/profile/${retweetBy}">${retweetBy}</a></span>`
  }


  return `<div class='post' data-id='${dataArr._id}'>
  <div class='postActionContainer'>
  ${retweetText}</div>
<div class="mainContentContainer">
      <div class="userImageContainer">
        <img src="${postedBy.profilePic}"/>
      </div>
      <div class="postContentContainer">
        <div class"header">
           <a href="/profile/${postedBy.username}" class='displayName'>${displayName}</a>
           <span class="username">@${postedBy.username}</span>
           <span class="date">${timestamp}</span>
        </div>
        <div class="postBody">
          <span>
            ${dataArr.content}
          </span>
        </div>
        <div class="postFooter">
        <div class='postButtonContainer'>
  
        <button id="open-reply" data-toggle='modal' data-target='#replyModal'>
        <i class='far fa-comment'></i>
        
        </button>
       
                              
                            </div>
                            <div class='postButtonContainer green'>
                                <button class='retweetButton ${retweetbuttonActiveClass} '>
                                    <i class='fas fa-retweet'></i>
                                    <span>${dataArr.retweetUsers.length || ""}</span>
                                </button>
                            </div>
                            <div class='postButtonContainer red'>
                                <button class='likeButton ${likeButtonActiveClass} '>
                                <i class='far fa-heart'></i>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 72">
  <path d="M38.723,12c-7.187,0-11.16,7.306-11.723,8.131C26.437,19.306,22.504,12,15.277,12C8.791,12,3.533,18.163,3.533,24.647 C3.533,39.964,21.891,55.907,27,56c5.109-0.093,23.467-16.036,23.467-31.353C50.467,18.163,45.209,12,38.723,12z"/>
</svg>
                                  
                                </button>
                            </div>
        </div>
      </div>
      </div>
  </div>`
}
const timeDifference = (current, previous) => {


  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return 'Just now'
    return Math.round(elapsed / 1000) + "" + 'seconds ago';
  }
  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "" + 'minutes ago';
  }
  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "" + 'hours ago';
  }
  else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + "" + 'days ago'
  }
  else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + "" + ' months ago';
  }
  else {
    return Math.round(elapsed / msPerYear) + "" + ' years ago';
  }
}
const getPostIdFromElement = (element) => {
  const isRoot = element.hasClass("post");

  const rootElement = isRoot == true ? element : element.closest(".post");

  const postId = rootElement.data().id;
  if (postId === undefined) return alert("Post is undefined")
  return postId;
}
$(document).on("click", ".likeButton", (event) => {
  const button = $(event.target);
  const postId = getPostIdFromElement(button)
  if (postId === undefined) { return }
  axios.put(`/api/posts/${postId}/like`).then((result) => {
    const data = result.data;

    button.find("span").text(data.likes.length || " ");

    if (data.likes.includes(user._id)) {

      button.addClass("active")
    } else {

      button.removeClass("active")
    }
  })
})
$(document).on('click', '.retweetButton', (event) => {
  const button = $(event.target);
  const postId = getPostIdFromElement(button)
  if (postId === undefined) {
    console.alert('Khong co id bai viet nay')
    return;
  }
  axios.post(`/api/posts/${postId}/retweet`).then((results) => {
    const result = results.data

    button.find('span').text(result.retweetUsers.length | "");
    if (result.retweetUsers.includes(user._id)) {
      button.addClass('active')
    } else {
      button.removeClass('active')
    }
  }).catch((error) => {
    console.log(error)
  })
})
// replyModal
//show.bs.modal là một sự kiện(event) được kích hoạt khi một modal (cửa sổ pop-up)
$(document).ready(() => {
  $('#replyModal').on("show.bs.modal", (event) => {
    console.log("hahah")
    const button = $(event.relatedTarget);
    console.log(button)
    const postId = getPostIdFromElement(button)
    axios.get(`/api/posts/:${postId}`).then((result) => {
      outputPosts(result, $('.postsContainer'))
    }).catch((error) => {

    })
  })
})

