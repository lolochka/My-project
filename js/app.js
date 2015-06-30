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
    employeesLi.innerHTML = '<div class="photo-block"><img src="images/photo-harry-potter.png" alt="Harry Potter foto"></div><h3 class="block-employees_block-employee_name">' + employees[i].name + ' ' + employees[i].surname + '</h3><p class="block-employees_block-employee_title">' + employees[i].level + ' ' + employees[i].title + '</p><ul class="block-employees_block-employee_block-tags">' + skillUl +'</ul>';
    employeesLi.setAttribute('id', employees[i].id);
    var emplClass = 'block-employees_block-employee ' + employees[i].department;
    employeesLi.setAttribute('class', emplClass);
    employeesLi.setAttribute('onclick', 'showDescript(this.id)');
    employeesUl.appendChild(employeesLi);
  }
  
  if (employees.length >= 1) {
    var j = employees.length - 1;
    var newEmployeeId = employees[j].id;
    var newEmployee = document.getElementById(newEmployeeId);
    newEmployee.classList.add('active');
    console.log(newEmployeeId); 
    drawDescription(newEmployeeId);
  } else {
    clearDescript();
  }
}

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
  empl.month = emplMonth.value;
  empl.year = emplYear.value;
  
  var s = emplSkills.value;
  var skills = s.split(", ");
  empl.skills = skills;
  
  empl.ldUrl = emplLdUrl.value;
  empl.bhUrl = emplBhUrl.value;
  empl.otherUrl = emplOtherUrl.value;
  empl.skype = emplSkype.value;
  empl.email = emplEmail.value;
 
  storeEmployee(empl);
  drawEmplList();
};

function storeEmployee(empl) {
  addItem(empl.id, empl);
}

function showDescript(employeeId) {
  var previousEmpl = document.querySelector('.active');
  previousEmpl.classList.remove('active');
  var currentEmpl = document.getElementById(employeeId);
  currentEmpl.classList.add('active');
  drawDescription(employeeId);
  showDescriptBlock();
}

function drawDescription(id) {
  var obj = JSON.parse(localStorage.getItem(id));
  console.log(obj);
  
  var descHeader = document.querySelector('.block-emploee-description_header');
  descHeader.innerHTML = '<div class="block-emploee-description_header_close" onclick="hideDescriptBlock()"></div><div class="block-header_edit-employee" onclick="deleteEmployee(' + obj.id + ')"><a href="#">Delete</a></div><h2 class="block-emploee-description_title">' + obj.level + ' ' + obj.title + '</h2><div class="wrapper"></div>';
    
  var mainDescHeader = document.querySelector('.block-emploee-description_block-main-description_header');
  var objEmail;
  obj.email != 0 ? objEmail = '<div class="block-emploee-description_block-main-description_block-contacts_email"><span class="flaticon-send4"></span><a href="mailto:#" title="harry_potter@gmail.com">' + obj.email + '</a></div>' : objEmail = '';
  
  mainDescHeader.innerHTML = '<aside class="block-emploee-description_block-main-description_block-contacts"><h3 class="block-emploee-description_block-main-description_block-contacts_heading">Contact information</h3><div class="block-emploee-description_block-main-description_block-contacts_skype"><span class="flaticon-skype12"></span>' + obj.skype + '</div>' + objEmail + '</aside><div class="photo-block"><img src="images/photo-harry-potter.png" alt="Harry Potter foto"></div><h3 class="block-emploee-description_block-name_name">' + obj.name + ' ' + obj.surname + '</h3><ul class="block-emploee-description_projects-list"><li class="block-emploee-description_projects-list_project">Quidich</li><li class="block-emploee-description_projects-list_project">Goblet of fire</li></ul><div class="wrapper block-emploee-description_block-main-description_contacts_line"></div>';
  
  var descBody = document.querySelector('.block-emploee-description_description');
  var objManager;
  obj.manager != 0 ? objManager = '<p class="block-emploee-description_block-main-description_manager">Manager: <span class="block-emploee-description_block-main-description_manager-label">' + obj.manager + '</span></p>' : objManager = '';
  
  var objExperience;
  if (obj.years != 0 && obj.month != 0 ) {
    var month = obj.month;
    var year = obj.year;
    var date = new Date();
    var nowMonth = date.getMonth();
    var nowYear = date.getFullYear();
    var diffMonth;////need compile
    var diffYear;
    month == 0 ? diffMonth = 0 : diffMonth = nowMonth - month;
    year == 0 ? diffYear = 0 : diffYear = nowYear - year;
    if (diffMonth > 0) {
      if (diffYear > 0) {
        objExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">' + diffYear + ' year(s) and ' + diffMonth + ' month(es)</span></p>';
      } else if (diffYear == 0) {
        objExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">' + diffMonth + ' month(es)</span></p>';
      } else {
        objExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">Have not started yet</span></p>';
      }
      
    } else if (diffMonth == 0) {
      if (diffYear > 0) {
        objExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">' + diffYear + ' year(s)</span></p>';
      } else if (diffYear == 0) {
        objExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">Do not have any experience</span></p>';
      } else {
        objExperience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">Have not started yet</span></p>';
      }
      
    } else {
      diffMonth = diffMonth + 12;
      diffYear = diffYear - 1;
      if (diffYear > 0) {
        experience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">' + diffYear + ' year(s) and ' + diffMonth + ' month(es)</span></p>';
      } else if (diffYear === 0) {
        experience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">' + diffMonth + ' month(es)</span></p>';
      } else {
        experience = '<p class="block-emploee-description_block-main-description_years">Years of experience: <span class="block-emploee-description_block-main-description_years-label">Have not started yet</span></p>';
      }
    }//need compile
  } else {
    objExperience = '';
  }
  
  var skills = obj.skills;
  skillSet = skills.join('</li><li class="block-emploee-description_block-main-description_tags-list_tag">')
  var objSkillSet = '<p class="block-emploee-description_block-main-description_skills-label">Primary skills:</p><ul class="block-emploee-description_block-main-description_tags-list"><li class="block-emploee-description_block-main-description_tags-list_tag">' + skillSet + '</li></ul>';
  
  
  var objL;
  obj.ldUrl != 0 ? objLd = '<li class="block-emploee-description_block-main-description_links-list_link link-linkedin"><a href="' + obj.ldUrl + '" title="' + obj.ldUrl + '">' + obj.ldUrl + '</a></li>' : objLd = '';
  var objBh;
  obj.bhUrl != 0 ? objBh = '<li class="block-emploee-description_block-main-description_links-list_link link-linkedin"><a href="' + obj.bhUrl + '" title="' + obj.bhUrl + '">' + obj.bhUrl + '</a></li>' : objBh = '';
  var objOtherUrl;
  obj.otherUrl != 0 ? objOtherUrl = '<li class="block-emploee-description_block-main-description_links-list_link link-linkedin"><a href="' + obj.otherUrl + '" title="' + obj.otherUrl + '">' + obj.otherUrl + '</a></li>' : objOtherUrl = '';
  
  var objUrls;
  obj.ldUrl != 0 || obj.bhUrl != 0 || obj.otherUrl != 0 ? objUrls = '<p class="block-emploee-description_block-main-description_links_label">Links:</p><ul class="block-emploee-description_block-main-description_links-list">' + objLd + objBh + objOtherUrl + '</ul>' : objUrls = '';
  
  descBody.innerHTML = '<p class="block-emploee-description_list-description_department">Department: <span class="block-emploee-description_list-description_department-label">' + obj.department + '</span></p>' + objManager + objExperience + objSkillSet + objUrls;    
}

function showDescriptBlock() {
  var descBlock = document.querySelector('.block-emploee-description');
  descBlock.style.display = 'block';
}

function hideDescriptBlock() {
  var descBlock = document.querySelector('.block-emploee-description');
  descBlock.style.display = '';
}

function deleteEmployee(id) {
  deleteItem(id);
  drawEmplList();
}

function clearDescript() {
  var descHeader = document.querySelector('.block-emploee-description_header');
  descHeader.innerHTML = '<h2 class="block-emploee-description_title">Dear friend, you have removed all your employees!</h2><div class="wrapper"></div>'
  var mainDescHeader = document.querySelector('.block-emploee-description_block-main-description_header');
  mainDescHeader.innerHTML = 'Use button under the list to add new employee';
  var descBody = document.querySelector('.block-emploee-description_description');
  descBody.innerHTML = '';
}