var icon=document.getElementById("toggle")
icon.onclick=function()
{
    document.body.classList.toggle("dark")
}
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve like counts and comments from local storage on page load
    function retrieveDataFromLocalStorage() {
        // Retrieve data for each blog post
        for (let postId = 1; postId <= 2; postId++) {
            const likeCount = localStorage.getItem(`post_${postId}_likes`) || 0;
            const comments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
            
            // Update like count display
            const likeCountDisplay = document.querySelector(`.blog-post[data-post-id="${postId}"] .like-count`);
            likeCountDisplay.textContent = likeCount;

            // Update comments display
            const commentsDisplay = document.querySelector(`.blog-post[data-post-id="${postId}"] .comments`);
            commentsDisplay.innerHTML = "";
            comments.forEach(comment => {
                const commentElement = document.createElement("div");
                commentElement.textContent = comment;
                commentsDisplay.appendChild(commentElement);
            });
        }
    }

    // Update like count in local storage and display
    function updateLikeCount(postId, likeCount) {
        localStorage.setItem(`post_${postId}_likes`, likeCount);
        const likeCountDisplay = document.querySelector(`.blog-post[data-post-id="${postId}"] .like-count`);
        likeCountDisplay.textContent = likeCount;
    }

    // Add comment to local storage and display
    function addComment(postId, commentText) {
        const comments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
        comments.push(commentText);
        localStorage.setItem(`post_${postId}_comments`, JSON.stringify(comments));
        retrieveDataFromLocalStorage(); // Update comments display
    }

    // Event listener for like buttons
    document.querySelectorAll(".like-btn").forEach(likeBtn => {
        likeBtn.addEventListener("click", function() {
            const postId = this.dataset.postId;
            let likeCount = parseInt(localStorage.getItem(`post_${postId}_likes`) || 0);
            likeCount++;
            updateLikeCount(postId, likeCount);
        });
    });

    // Event listener for comment form submission
    document.querySelectorAll(".comment-form").forEach(commentForm => {
        commentForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const postId = this.dataset.postId;
            const commentInput = this.querySelector(".comment-input");
            const commentText = commentInput.value.trim();
            if (commentText !== "") {
                addComment(postId, commentText);
                commentInput.value = ""; // Clear input field
            }
        });
    });

    // Retrieve data from local storage on page load
    retrieveDataFromLocalStorage();
});
