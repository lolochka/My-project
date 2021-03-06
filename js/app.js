drawEmplList();

function drawEmplList() {
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
    var employeesLi = document.createElement('li');
    var skillSet = employees[i].skills;
    skillUl = skillSet.join('</li><li class="block-employees_block-employee_block-tags_tag">')
    skillUl = '<li class="block-employees_block-employee_block-tags_tag">' + skillUl + '</li>';
    var photoUrl;
    employees[i].photoUrl != 0 ? photoUrl = employees[i].photoUrl : photoUrl = "images/user.png";
    employeesLi.innerHTML = '<div class="photo-block"><img src="' + photoUrl + '" alt="' + employees[i].name + ' ' + employees[i].surname + ' photo" width="59"></div><h3 class="block-employees_block-employee_name">' + employees[i].name + ' ' + employees[i].surname + '</h3><p class="block-employees_block-employee_title">' + employees[i].level + ' ' + employees[i].title + '</p><ul class="block-employees_block-employee_block-tags">' + skillUl +'</ul>';
    employeesLi.setAttribute('id', employees[i].id);
    var emplClass = 'block-employees_block-employee ' + employees[i].department;
    employeesLi.setAttribute('class', emplClass);
    employeesLi.setAttribute('onclick', 'showDescript(this.id)');
    employeesUl.appendChild(employeesLi);
  }
//  giveScroll(employeesUl, 197);
  
  if (employees.length >= 1) {
    var j = employees.length - 1;
    var newEmployeeId = employees[j].id;
    var newEmployee = document.getElementById(newEmployeeId);
    newEmployee.classList.add('active');
    console.log(newEmployeeId);
    drawDescription(employees[j]);
  } else {
    clearDescript();
  }
  
//  giveScroll(employeesUl);
}

var saveEmployeeForm = document.getElementById('create-emloyee-form');

saveEmployeeForm.onsubmit = function (e) {
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
  var emplPhotoUrl = document.querySelector('input[name="photoUrl"]');
  
  var date = new Date();
  empl.id = date.getTime();
  
  empl.name = emplName.value;
  empl.surname = emplSurname.value;
  empl.title = emplTitle.value;
  empl.level = emplLevel.value;
  empl.department = emplDepartment.value;
  empl.manager = emplManager.value;
  empl.month = emplMonth.value;
  empl.year = emplYear.value;
  
  var s = emplSkills.value;
  var skills = s.split(", ");
  empl.skills = skills;
  empl.photoUrl = emplPhotoUrl.value;
  
  empl.ldUrl = emplLdUrl.value;
  empl.bhUrl = emplBhUrl.value;
  empl.otherUrl = emplOtherUrl.value;
  empl.skype = emplSkype.value;
  empl.email = emplEmail.value;
  empl.comments = [];

  
  storeEmployee(empl);
  drawEmplList();
  successMsgShow();
//  setTimeout( function() {
//    successMsgHide();
//  }, 1000);
  setTimeout( function() {
    successMsgHide();
  }, 1150);
  saveEmployeeForm.reset();
  setTimeout( function() {
    document.location.href = "#x";
  }, 1200);
//  successMsgHide();
  return false;
};

function successMsgShow() {
  var successMsg = document.querySelector('.block-create-employee-success-msg');
  successMsg.style.visibility = "visible";
  successMsg.style.opacity = "1";
}

function successMsgHide() {
  var successMsg = document.querySelector('.block-create-employee-success-msg');
  successMsg.style.opacity = "";
  successMsg.style.visibility = "";
}
 

function storeEmployee(employee) {
  addItem(employee.id, employee);
}

function showDescript(employeeId) {
  var previousEmpl = document.querySelector('.active');
  previousEmpl.classList.remove('active');
  var currentEmpl = document.getElementById(employeeId);
  currentEmpl.classList.add('active');
  var thisEmpl = JSON.parse(localStorage.getItem(employeeId));
  console.log(thisEmpl)
  showDescriptBlock();
  drawDescription(thisEmpl);
}

function drawDescription(currentEmpl) {
    
  var descHeader = document.querySelector('.block-emploee-description_header');
  descHeader.innerHTML = '<div class="block-emploee-description_header_close" onclick="hideDescriptBlock()"></div><div class="block-header_edit-employee" onclick="deleteEmployee(' + currentEmpl.id + ')"><a href="#">Delete</a></div><h2 class="block-emploee-description_title">' + currentEmpl.level + ' ' + currentEmpl.title + '</h2><div class="wrapper"></div>';
    
  var mainDescHeader = document.querySelector('.block-emploee-description_block-main-description_header');
  var currentEmplEmail;
  currentEmpl.email != 0 ? currentEmplEmail = '<div class="block-emploee-description_block-main-description_block-contacts_email"><span class="flaticon-send4"></span><a href="mailto:#" title="harry_potter@gmail.com">' + currentEmpl.email + '</a></div>' : currentEmplEmail = '';
  
  var currentEmplPhotoUrl;
  currentEmpl.photoUrl != 0 ? currentEmplPhotoUrl = currentEmpl.photoUrl : currentEmplPhotoUrl = "images/user.png";
  mainDescHeader.innerHTML = '<aside class="block-emploee-description_block-main-description_block-contacts"><h3 class="block-emploee-description_block-main-description_block-contacts_heading">Contact information</h3><div class="block-emploee-description_block-main-description_block-contacts_skype"><span class="flaticon-skype12"></span>' + currentEmpl.skype + '</div>' + currentEmplEmail + '</aside><div class="photo-block"><img src="' + currentEmplPhotoUrl + '" alt="' + currentEmpl.name + ' ' + currentEmpl.surname + ' photo" width="59"></div><h3 class="block-emploee-description_block-name_name">' + currentEmpl.name + ' ' + currentEmpl.surname + '</h3><div class="wrapper block-emploee-description_block-main-description_contacts_line"></div>';
  var descBody = document.querySelector('.block-emploee-description_description');
  var currentEmplManager;
  currentEmpl.manager != 0 ? currentEmplManager = '<p class="block-emploee-description_block-main-description_manager">Manager: <span class="block-emploee-description_block-main-description_manager-label">' + currentEmpl.manager + '</span></p>' : currentEmplManager = '';
  
  var currentEmplExperience;
  if (currentEmpl.years != 0 || currentEmpl.month != 0 ) {
    var month = currentEmpl.month;
    var year = currentEmpl.year;
    var date = new Date();
    var nowMonth = date.getMonth();
    var nowYear = date.getFullYear();
    var diffMonth;////need compile
    var diffYear;
    month == 0 ? diffMonth = 0 : diffMonth = nowMonth - month;
    year == 0 ? diffYear = 0 : diffYear = nowYear - year;
    if (diffMonth > 0) {
      if (diffYear > 0) {
        currentEmplExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">' + diffYear + ' year(s) and ' + diffMonth + ' month(es)</span></p>';
      } else if (diffYear == 0) {
        currentEmplExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">' + diffMonth + ' month(es)</span></p>';
      } else {
        currentEmplExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">Have not started yet</span></p>';
      }
    } else if (diffMonth == 0) {
      if (diffYear > 0) {
        currentEmplExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">' + diffYear + ' year(s)</span></p>';
      } else if (diffYear == 0) {
        currentEmplExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">Do not have any experience</span></p>';
      } else {
        currentEmplExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">Have not started yet</span></p>';
      } 
    } else {
      diffMonth = diffMonth + 12;
      diffYear = diffYear - 1;
      if (diffYear > 0) {
        currentEmplExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">' + diffYear + ' year(s) and ' + diffMonth + ' month(es)</span></p>';
      } else if (diffYear === 0) {
        currentEmplExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">' + diffMonth + ' month(es)</span></p>';
      } else {
        currentEmplExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">Have not started yet</span></p>';
      }
    }//need compile
  } else {
    currentEmplExperience = '';
  }
  
  var skills = currentEmpl.skills;
  skillSet = skills.join('</li><li class="block-emploee-description_block-main-description_tags-list_tag">')
  var currentEmplSkillSet = '<p class="block-emploee-description_block-main-description_skills-label">Primary skills:</p><ul class="block-emploee-description_block-main-description_tags-list"><li class="block-emploee-description_block-main-description_tags-list_tag">' + skillSet + '</li></ul>';
  
  var currentEmplLd;
  currentEmpl.ldUrl != 0 ? currentEmplLd = '<li class="block-emploee-description_block-main-description_links-list_link link-linkedin"><a href="' + currentEmpl.ldUrl + '" title="' + currentEmpl.ldUrl + '">' + currentEmpl.ldUrl + '</a></li>' : currentEmplLd = '';
  var currentEmplBh;
  currentEmpl.bhUrl != 0 ? currentEmplBh = '<li class="block-emploee-description_block-main-description_links-list_link link-behance"><a href="' + currentEmpl.bhUrl + '" title="' + currentEmpl.bhUrl + '">' + currentEmpl.bhUrl + '</a></li>' : currentEmplBh = '';
  var currentEmplOtherUrl;
  currentEmpl.otherUrl != 0 ? currentEmplOtherUrl = '<li class="block-emploee-description_block-main-description_links-list_link link-link"><a href="' + currentEmpl.otherUrl + '" title="' + currentEmpl.otherUrl + '">' + currentEmpl.otherUrl + '</a></li>' : currentEmplOtherUrl = '';
  
  var currentEmplUrls;
  currentEmpl.ldUrl != 0 || currentEmpl.bhUrl != 0 || currentEmpl.otherUrl != 0 ? currentEmplUrls = '<p class="block-emploee-description_block-main-description_links_label">Links:</p><ul class="block-emploee-description_block-main-description_links-list">' + currentEmplLd + currentEmplBh + currentEmplOtherUrl + '</ul>' : currentEmplUrls = '';
  
  descBody.innerHTML = '<p class="block-emploee-description_list-description_department">Department: <span class="block-emploee-description_list-description_department-label">' + currentEmpl.department + '</span></p>' + currentEmplManager + currentEmplExperience + currentEmplSkillSet + currentEmplUrls;  
  
  var currentEmplComments = currentEmpl.comments;
  var commentsBlock = document.querySelector('.block-emploee-description_block-comments');
  commentsBlock.innerHTML = '<h4 class="block-emploee-description_block-comments_title">Comments (' + currentEmplComments.length + '):</h4><div id="all-comments"></div><div class="block-emploee-description_block-comments_form" method="get" action="#" id="comment-form"><textarea name="comment" class="block-emploee-description_block-comments_form" placeholder="Insert your comment here"></textarea><div class="block-emploee-description_block-comments_form_button-block"><button  class="block-emploee-description_block-comments_form_button" id="send-comment" onclick="addComment()">Submit</button></div></div>';
  
  if ( currentEmplComments.length != 0 ) {
    for (i = 0; i < currentEmplComments.length; i++ ) {
      drawComment(currentEmplComments[i]);
      console.log(currentEmplComments[i]);
      
    }
  }
  
  
  var blockDescription = document.querySelector('.block-emploee-description_block-main-description'); 
//  giveScroll(blockDescription, 140);
}

function showDescriptBlock() {
  var descBlock = document.querySelector('.block-emploee-description');
  descBlock.style.display = 'block';
  var descOverlay = document.querySelector('.description-overlay');
  descOverlay.style.visibility = 'visible';
  descOverlay.style.opacity = '1';
//  up();
}

function hideDescriptBlock() {
//  document.querySelector('.active').classList.remove('active');
  var descBlock = document.querySelector('.block-emploee-description');
  descBlock.style.display = '';
  var descOverlay = document.querySelector('.description-overlay');
  descOverlay.style.visibility = '';
  descOverlay.style.opacity = '';
}

function deleteEmployee(id) {
  hideDescriptBlock();
  deleteItem(id);
  drawEmplList();
}

function clearDescript() {
  var descHeader = document.querySelector('.block-emploee-description_header').innerHTML = '<h2 class="block-emploee-description_title">Add employees!</h2><div class="wrapper"></div>'
  var mainDescHeader = document.querySelector('.block-emploee-description_block-main-description_header').innerHTML = 'Use button "Add employee" list to add new employee';
  var descBody = document.querySelector('.block-emploee-description_description').innerHTML = '';
  var comments = document.querySelector('.block-emploee-description_block-comments').innerHTML = '';
}

var formOverlay = document.querySelector('#add-employee');
var formExitButton = document.querySelector('.heading-create-employee_close');

formOverlay.onclick = function(e) {
  document.getElementById('create-emloyee-form').reset();
//  up();
}

formExitButton.onclick = function(e) {
  document.getElementById('create-emloyee-form').reset();
//  up();
}

var t;
function up() {
  var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
  if(top > 0) {
    window.scrollBy(0,-100);
    t = setTimeout('up()',20);
  } else clearTimeout(t);
    return false;
}

function drawComment(message) {
  var newMessage = document.createElement('div');
  var messageDate = formatDate(message.date);
  var allComments = document.getElementById('all-comments');
  allComments.appendChild(newMessage);
  console.log(messageDate);
  newMessage.innerHTML = '<div class="block-emploee-description_block-comments_remove-comment">x</div><p class="block-emploee-description_block-comments_author">' + message.username + '</p><p class="block-emploee-description_block-comments_comment-time" ><time datetime="' + message.date + '">' + messageDate + '</time></p><p class="block-emploee-description_block-comments_comment-text">' + message.text + '</p>';
  newMessage.setAttribute('class', 'block-emploee-description_block-comments_comment');
  console.log(length);
  console.log(message.empl);
  deleteComment(message.empl);
}

function formatDate(date) {
  var dt;
  var diff = new Date() - date;
  var sec = Math.floor(diff / 1000); 
  if (sec < 60) {
    dt = 'just now';
    return dt;
  }
  var min = Math.floor(diff / 60000);
  if (min < 60) {
    dt = min + ' minutes ago';
    return dt;
  }
  dt = date;
  return dt.substr(0, 10) + ' ' + dt.substr(11, 5);
}

function deleteComment(id) {
  var buttons = document.querySelectorAll('#comments-block .block-emploee-description_block-comments_remove-comment');
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    button.setAttribute('id', i);
    button.onclick = function () {
      var empl = JSON.parse(localStorage.getItem(id));
      var comments = empl.comments;
      var el = this.parentNode;
      var k = this.id;
      el.parentNode.removeChild(el);
      comments.splice(k, 1);
      console.log(comments);
      addItem(id, empl);
      document.querySelector('.block-emploee-description_block-comments_title').innerHTML = 'Comments (' + comments.length + '):';
      deleteComment(id);
    }
  }
}

var ulList = document.querySelector('.block-employees_list');


function giveScroll(list, x) {
  var pageHeight =  window.innerHeight - x;
  console.log(pageHeight);
  list.style.maxHeight = pageHeight + "px";
}

window.onresize = function () {
  var ulList = document.querySelector('.block-employees_list');
  giveScroll(ulList, 200);
}