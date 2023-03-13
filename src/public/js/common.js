$("#postTextarea").keyup(event => {
  var textbox = $(event.target);
  var value = textbox.val().trim();
  var submitButton = $("#submitPostButton");
  if (submitButton.length == 0) return alert("No submit button found");
  if (value == "") {
    submitButton.prop("disabled", true);
    return;
  }
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
    console.log(response);
  })
})

// Function create PostHTML
const PostHTML = (postData) => {

}