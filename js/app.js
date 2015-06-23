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
  var thisEmpl = JSON.parse(localStorage.getItem(employeeId));
  console.log(thisEmpl);
  
  drawDescription(thisEmpl);
  
}

function drawDescription(obj) {
  var descTitle = document.querySelector('.block-emploee-description_title');
  descTitle.innerHTML = obj.level + ' ' + obj.title;
    
  var descHeader = document.querySelector('.block-emploee-description_block-main-description_header');
  var objEmail;
  obj.email != 0 ? objEmail = '<div class="block-emploee-description_block-main-description_block-contacts_email"><span class="flaticon-send4"></span><a href="mailto:#" title="harry_potter@gmail.com">' + obj.email + '</a></div>' : objEmail = '';
  
  descHeader.innerHTML = '<aside class="block-emploee-description_block-main-description_block-contacts"><h3 class="block-emploee-description_block-main-description_block-contacts_heading">Contact information</h3><div class="block-emploee-description_block-main-description_block-contacts_skype"><span class="flaticon-skype12"></span>' + obj.skype + '</div>' + objEmail + '</aside><div class="photo-block"><img src="images/photo-harry-potter.png" alt="Harry Potter foto"></div><h3 class="block-emploee-description_block-name_name">' + obj.name + ' ' + obj.surname + '</h3><ul class="block-emploee-description_projects-list"><li class="block-emploee-description_projects-list_project">Quidich</li><li class="block-emploee-description_projects-list_project">Goblet of fire</li></ul><div class="wrapper block-emploee-description_block-main-description_contacts_line"></div>';
  
  
  
//  while (descTitle.hasChildNodes()) {
//    descTitle.removeChild(descTitle.firstChild);
//  }
  
    
}