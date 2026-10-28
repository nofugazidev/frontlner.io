//core application state management
let posts = JSON.parse(localStorage.getItem("blog_posts")) || [];

//dom  registry
const postForm = document.getElementById("postForm");
const blogContainer = document.getElementById("blogContainer");
const postCountBadge = document.getElementById("postCount");

//modal registry
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editIdInput = document.getElementById("editId");
const editTitleInput = document.getElementById("editTitle");
const editContentInput = document.getElementById("editContent");
const closeModalBtn = document.getElementById("closeModal");
const cancelModalBtn = document.getElementById("cancelModal");

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
    title: document.getElementById("title").value.trim(),
    content: document.getElementById("content").value.trim(),
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };

  posts.unshift(newPost);
  postForm.reset();
  syncLocalStorage();
});

//read
function renderPosts() {
  postCountBadge.textContent = posts.length;

  if (posts.length === 0) {
    blogContainer.innerHTML = `
            <div class="text-center py-12 border-2 border-solid border border-slate-200 rounded-xl">
                <p class="text-slate-400">No blog posts published yet. Be the first to share your thoughts!</p>
            </div>
        `;

    return;
  }

  blogContainer.innerHTML = posts
    .map(
      (post) => `
        <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-transform duration-200 hover:shadow-md">
            <div class="flex justify-between items-start gap-4 mb-2">
                <h3 class="text-lg font-bold leading-snug text-slate-900">${escapeHTML(post.title)}</h3>
                <span class="text-xs text-slate-400 whitespace-nowrap">${post.date}</span>
            </div>

            <p class="text-slate-600 whitespace-pre-wrap mb-4 text-sm leading-relaxed">${escapeHTML(post.content)}</p>

            <div class="flex justify-end gap-4 border-t border-slate-100 pt-3">
                <button class="text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer" onclick="openEditModal('${post.id}')">
                    Edit
                </button>
                 <button class="text-sm font-semibold text-blue-600 hover:text-red-700 cursor-pointer" onclick="deletePost('${post.id}')">
                    Delete
                </button>
            </div>
        </article>
    `,
    ).join("");
}

//update post
function openEditModal(id) {
  editModal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");

  const post = posts.find((p) => p.id === id);
  if (!post) return;

  editIdInput.value = post.id;
  editTitleInput.value = post.title;
  editContentInput.value = post.content;
}

function closeEditModal() {
  editModal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
  editForm.reset();
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = editIdInput.value;

  posts = posts.map((post) => {
    if (post.id === id) {
      return {
        ...post,
        title: editTitleInput.value.trim(),
        content: editContentInput.value.trim(),
      };
    }

    return post;
  });

  closeEditModal();
  syncLocalStorage();
});

function deletePost(id) {
  if (confirm("Are you sure you want to permanently delete this article?")) {
    posts = posts.filter((post) => post.id !== id);
    syncLocalStorage();
  }
}

//utility helpers
function escapeHTML(str) {
  return str.replace(
    /[&<>''"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[tag] || tag,
  );
}

//hooks (closing modal)
closeModalBtn.addEventListener("click", closeEditModal);
cancelModalBtn.addEventListener("click", closeEditModal);
window.addEventListener("click", (e) => {
  if (e.target === editModal) closeEditModal();
});

renderPosts();
