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
var saveEmployee = document.getElementById('create-emloyee-form');

saveEmployee.onsubmit = function (e) {
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
  
  var experience;
  function getExperience() {
    var month = emplMonth.value;
    var year = emplYear.value;
    var nowMonth = date.getMonth();
    var nowYear = date.getFullYear();
    var diffMonth = nowMonth - month;////need compile
    var diffYear = nowYear - year;
   
    if (diffMonth > 0) {
      if (diffYear > 0) {
        experience = diffYear + " year(s) and " + diffMonth + " month(es)";
      } else if (diffYear === 0) {
        experience = diffMonth + " month(es)";
      } else {
        experience = "Have not started yet";
      }
      
    } else if (diffMonth === 0) {
      if (diffYear > 0) {
        experience = diffYear + " year(s)";
      } else if (diffYear === 0) {
        experience = "Don't have any experience";
      } else {
        experience = "Have not started yet";
      }
      
    } else {
      diffMonth = diffMonth + 12;
      diffYear = diffYear - 1;
      if (diffYear > 0) {
        experience = diffYear + " year(s) and " + diffMonth + " month(es)";
      } else if (diffYear === 0) {
        experience = diffMonth + " month(es)";
      } else {
        experience = "Have not started yet";
      }
    }//need compile
  }
  
  getExperience();
  empl.experience = experience;
  
  var s = emplSkills.value;
  var skills = s.split(", ");
  empl.skills = skills;
  
  empl.ldUrl = emplLdUrl.value;
  empl.bhUrl = emplBhUrl.value;
  empl.otherUrl = emplOtherUrl.value;
  empl.skype = emplSkype.value;
  empl.email = emplEmail.value;
  
//  console.log(empl); ПРОВЕРКА
//  console.log(empl.experience());
//  console.log(empl.skills());
  
  storeEmployee(empl);
  drawUI();
};

function storeEmployee(empl) {
  addItem(empl.id, empl);
  clearUI();
}

function clearUI() {
  document.getElementById('create-emloyee-form').reset();//обнуляем все поля формы с помощь reset()
}

function drawUI() {
  var employeesUl = document.querySelector(".block-employees_list");
  while (employeesUl.hasChildNodes()) {
    employeesUl.removeChild(employeesUl.firstChild);
  }
  var employees = [];
  getAllItems(function (result) {
    employees = result;
  });
  console.log(employees);

  for (var i = 0; i < employees.length; i++) {
    console.log(employees[i].id);//CHECK
    var employeesLi = document.createElement('li');
    var skillSet = employees[i].skills;
    console.log(skillSet);
    
    for (var k = 0; k < skillSet.length; k++) {
      var skillUl = '';
      skillUl += '<li class="block-employees_block-employee_block-tags_tag">' + skillSet[k] +'</li>';
    }
    
    employeesLi.innerHTML = '<div class="photo-block"><img src="images/photo-harry-potter.png" alt="Harry Potter foto"></div><h3 class="block-employees_block-employee_name">' + employees[i].name + ' ' + employees[i].surname + '</h3><p class="block-employees_block-employee_title">' + employees[i].level + ' ' + employees[i].title + '</p><ul class="block-employees_block-employee_block-tags">' + skillUl +'</ul>';
    
    employeesLi.setAttribute('id', employees[i].id);
    var emplClass = 'block-employees_block-employee ' + employees[i].department + ' ';
    employeesLi.setAttribute('class', emplClass);
    employeesUl.appendChild(employeesLi);
  }
}