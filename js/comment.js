var commentButton = document.getElementById('send-comment');

commentButton.onclick = function(e) {
//  var emplAbout = document.querySelector('.active');
  storeComment();
  document.getElementById('comment-form').reset();
  return false;
}

function storeComment() {
  var id = document.querySelector('.active').id;
  var currentEmpl = JSON.parse(localStorage.getItem(id));
  console.log(currentEmpl);
  var comment = {};
  var text = document.querySelector('textarea[name="comment"]');
  var username = 'Myname';
  var date = new Date();
  comment.text = text.value;
  comment.username = username;
  comment.date = date;
  currentEmpl.comments.push(comment);
  console.log(currentEmpl.comments);
  addItem(id, currentEmpl);
}