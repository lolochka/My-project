//clean button
clean = function () {
    var ul = document.getElementById('list');//get ul in DOM
    while (ul.hasChildNodes()) {//while ul has childs remove first
        ul.removeChild(ul.firstChild);
    }
};

//append button
append = function () {
    var i = 0; 
    while (i < 100) {
        i++;
        var ul = document.getElementById('list'); 
        var li = document.createElement('li');//create li
        li.appendChild(document.createTextNode('Element '+i));//create li text
        li.setAttribute('class', 'append');//create li class="append"
        ul.appendChild(li);//place li in ul
    }
};

//inner button
inner = function () {    
    var ul = document.getElementById('list');
    for (i = 1; i <= 100; i++) {
        ul.innerHTML += '<li class="inner">Element ' + i + '</li>';//create html in ul with li and class
    }
};

//fragment button
fragment = function () {
    var i = 0;
    while (i < 100) {
        i++;
        var ul = document.getElementById('list');
        var d = document.createDocumentFragment();//create doc fragment
        var li = document.createElement('li');
        li.appendChild(document.createTextNode('Element '+i));//add text to li
        li.setAttribute('class', 'fragment');//set class of li
        d.appendChild(li);//add li as a child of doc fragment
        ul.appendChild(d);//add doc fragment to ul
    }
};

//join button
join = function() {
    var ul = document.getElementById('list');
    var i = 0;
    var list = [];//create array
    do {
        i++;
        list.push('<li class="join">Element ');
        list.push(i);    
        list.push('</li>');
    } while (i < 100);
    ul.innerHTML += list.join('');
};