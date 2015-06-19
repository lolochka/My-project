var sendComment = document.getElementById('send-comment');

function Comment(text, author, date) {
  this.text = text.value;
  this.date = date.toUTCString();
  this.author = author;
}

sendComment.onclick = function (e) {
  var text = document.querySelector('textarea[name="comment"]');
  var date = new Date();
  var comment = new Comment(text, "Albus Dambledore", date);
  storeComment(comment);
  var commentBlock = document.getElementById('comments-block');
  commentBlock.innerHTML += '<div class="block-emploee-description_block-comments_comment"><p class="block-emploee-description_block-comments_author">' + comment.author + '</p><p class="block-emploee-description_block-comments_comment-time" ><time datetime="2015-04-05">' + comment.date + '</time></p><p class="block-emploee-description_block-comments_comment-text">' + comment.text + '</p></div>';
  return false;
};

function isOnline() {
	return navigator.onLine; // перевіляє чи є доступ до інтернету
}

function storeComment(comment) {
	if (isOnline()) {
		storeCommentRemote(comment);
	} else {
		storeCommentLocal(comment);
	}
}

