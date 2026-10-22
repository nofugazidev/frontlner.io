//core application state management
let posts = JSON.parse(localStorage.getItem("blog_posts")) || [];

//dom  registry
const postForm = document.getElementById("postForm");
const blogContainer = document.getElementById("blogContainer");
const postCountBadge = document.getElementById("postCount");

//modal registry
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editIdInput = document.getElementById("editIdInput");
const editTitleInput = document.getElementById("editTitleInput");
const editContentInput = document.getElementById("editContentInput");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");

//state sync
function syncLocalStorage() {
  localStorage.setItem("blog_posts", JSON.stringify(posts));
  renderPosts();
}

//create post
postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPost = {
        id: Date.now().toString(),
        title: document.getElementById('title').value.trim(),
        content: document.getElementById('content').value.trim(),
        date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    posts.unshift(newPost)
    postForm.reset();
    syncLocalStorage()
});
