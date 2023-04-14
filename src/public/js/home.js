$(document).ready(() => {
  axios.get("/api/posts/user").then((results) => {


    outputPosts(results, $('.postsContainer'))
  })
})
const outputPosts = (results, container) => {

  container.html("");

  results.data.forEach((result) => {

    let html = PostHTML(result)
    html.then((htmlContent) => {
      container.append(htmlContent)
    })

  });

  if (results.data.length === 0) {
    container.append("<span class='noResults'>Nothing to show</span>")
  }
}