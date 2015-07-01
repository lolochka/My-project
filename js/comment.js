var commentButton = document.getElementById('send-comment');

commentButton.onclick = function(e) {
//  var emplAbout = document.querySelector('.active');
  var id = document.querySelector('.active').id;
  var currentEmpl = JSON.parse(localStorage.getItem(id));
  storeComment(id, currentEmpl);
  document.getElementById('comment-form').reset();
  return false;
}

function storeComment(emplId, empl) {
  console.log(empl);
  var comment = {};
  var text = document.querySelector('textarea[name="comment"]');
  var username = 'Myname';
  var date = new Date();
  comment.text = text.value;
  comment.username = username;
  comment.date = date;
  empl.comments.push(comment);
  console.log(empl.comments);
  addItem(emplId, empl);
}