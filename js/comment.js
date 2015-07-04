//var commentButton = document.getElementById('send-comment');

function addComment() {
  var text = document.querySelector('textarea[name="comment"]');
  if ( text.value != 0 ) {
    var id = document.querySelector('.active').id;
    var currentEmpl = JSON.parse(localStorage.getItem(id));

    var comment = {};
    var username = 'Me';
    var date = new Date();
    var currentEmplComments = currentEmpl.comments;
    comment.text = text.value;
    comment.username = username;
    comment.date = date;
    comment.empl = currentEmpl.id;

    storeComment(id, currentEmpl, comment);
    drawComment(comment, currentEmplComments.length);
    document.querySelector('textarea[name="comment"]').value = '';
    document.querySelector('.block-emploee-description_block-comments_title').innerHTML = 'Comments (' + currentEmplComments.length + '):';
    
  }
  return false;
}

function storeComment(emplId, empl, message) {
  console.log(empl);
  empl.comments.push(message);
  console.log(empl.comments);
  addItem(emplId, empl);
}