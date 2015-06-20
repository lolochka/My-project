//var sendComment = document.getElementById('send-comment');
//
//function Comment(text, author, date) {
//  this.text = text.value;
//  this.date = date.toUTCString();
//  this.author = author;
//}
//
//sendComment.onclick = function (e) {
//  var text = document.querySelector('textarea[name="comment"]');
//  var date = new Date();
//  var comment = new Comment(text, "Albus Dambledore", date);
//  storeComment(comment);
//  var commentBlock = document.getElementById('comments-block');
//  commentBlock.innerHTML += '<div class="block-emploee-description_block-comments_comment"><p class="block-emploee-description_block-comments_author">' + comment.author + '</p><p class="block-emploee-description_block-comments_comment-time" ><time datetime="2015-04-05">' + comment.date + '</time></p><p class="block-emploee-description_block-comments_comment-text">' + comment.text + '</p></div>';
//  return false;
//};
//
//function isOnline() {
//	return navigator.onLine; // перевіляє чи є доступ до інтернету
//}
//
//function storeComment(comment) {
//	if (isOnline()) {
//		storeCommentRemote(comment);
//	} else {
//		storeCommentLocal(comment);
//	}
//}

//create employee and save him to localStorage
var saveEmployee = document.getElementById('buton-create-employee');

saveEmployee.onclick = function (e) {
  var empl = {};
  
  var emplName = document.querySelector("input[name='empl-name']");
  var emplSurname = document.querySelector("input[name='empl-surname']");
  var emplTitle = document.querySelector("input[name='empl-title']");
  var emplLevel = document.querySelector("select[name='empl-level']");
  var emplDepartment = document.querySelector("select[name='empl-department']");
  var emplManager = document.querySelector("input[name='empl-manager']");
  var emplMonth = document.querySelector("select[name='empl-month-career-start']");
  var emplYear = document.querySelector("input[name='empl-year-career-start']");
  var emplSkills = document.querySelector("input[name='empl-primary-skills']");
  var emplLdUrl = document.querySelector("input[name='empl-linkedin-page']");
  var emplBhUrl = document.querySelector("input[name='empl-behance-page']");
  var emplOtherUrl = document.querySelector("input[name='empl-web-page']");
  var emplSkype = document.querySelector("input[name='empl-skype']");
  var emplEmail = document.querySelector("input[name='empl-email']");
  
  var date = new Date();
  empl.id = date.getTime();
  
  empl.name = emplName.value;
  empl.surname = emplSurname.value;
  empl.title = emplTitle.value;
  empl.level = emplLevel.value;
  empl.department = emplDepartment.value;
  empl.manager = emplManager.value;
  
  empl.experience = function () {
    var month = emplMonth.value;
    var year = emplYear.value;
    var nowMonth = date.getMonth();
    var nowYear = date.getFullYear();
    
    var diffMonth = nowMonth - month;////need compile
    var diffYear = nowYear - year;
   
    if (diffMonth > 0) {
      
      if (diffYear > 0) {
        return diffYear + " year(s) and " + diffMonth + " month(es)";
      } else if (diffYear === 0) {
        return diffMonth + " month(es)";
      } else {
        return "Have not started yet";
      }
      
    } else if (diffMonth === 0) {
      if (diffYear > 0) {
        return diffYear + " year(s)";
      } else if (diffYear === 0) {
        return "Don't have any experience";
      } else {
        return "Have not started yet";
      }
      
    } else {
      diffMonth = diffMonth + 12;
      diffYear = diffYear - 1;
      if (diffYear > 0) {
        return diffYear + " year(s) and " + diffMonth + " month(es)";
      } else if (diffYear === 0) {
        return diffMonth + " month(es)";
      } else {
        return "Have not started yet";
      }
    }//need compile
    
  };
  
  empl.skills = function () {
    var s = emplSkills.value;
    var skills = s.split(", ");
    return skills;
  };
  
  empl.ldUrl = emplLdUrl.value;
  empl.bhUrl = emplBhUrl.value;
  empl.otherUrl = emplOtherUrl.value;
  empl.skype = emplSkype.value;
  empl.email = emplEmail.value;
  
//  console.log(empl); ПРОВЕРКА
//  console.log(empl.experience());
//  console.log(empl.skills());
  
  storeEmployee(empl);
  
  return false;
};

function storeEmployee(empl) {
  addItem(empl.id, empl);
  clearUI();
}

function clearUI() {
  document.getElementById('create-emloyee-form').reset();//обнуляем все поля формы с помощь reset()
}