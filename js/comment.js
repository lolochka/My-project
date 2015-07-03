var commentButton = document.getElementById('send-comment');

commentButton.onclick = function(e) {
//  var emplAbout = document.querySelector('.active');
  var id = document.querySelector('.active').id;
  var currentEmpl = JSON.parse(localStorage.getItem(id));
  
  var comment = {};
  var text = document.querySelector('textarea[name="comment"]');
  var username = 'Me';
  var date = new Date();
  comment.text = text.value;
  comment.username = username;
  comment.date = date;
  
  storeComment(id, currentEmpl, comment);
  drawComment(comment);
  document.getElementById('comment-form').reset();

  return false;
}

function storeComment(emplId, empl, message) {
  console.log(empl);
  empl.comments.push(message);
  console.log(empl.comments);
  addItem(emplId, empl);
}