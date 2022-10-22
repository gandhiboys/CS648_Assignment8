/*eslint-env browser*/

var btnDel = [], i;

for (i = 0; i < 5; i += 1) {
    btnDel[i] = "<button class='btnDel" + String(i) + "'>delete</button>";
}

var employeeList = [["Manas Gandhi", "MUM", 1111, btnDel[0]],
                    ["Yash Mehta", "MUM", 4444, btnDel[1]],
                    ["Ritik Mody", "PUN", 3333, btnDel[2]],
                    ["Prakshal Doshi", "MUM", 2222, btnDel[3]],
                    ["Harsh Nahar", "PUN", 5555, btnDel[4]]];

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

function viewEmployees() {
    "use strict";
    var row, col, table, tbody, tableString = "";
    
    table = document.getElementsByTagName("table")[0];
    tbody = document.createElement('tbody');
    
    $("employees").innerHTML = "Showing " + employeeList.length + " employees";
        
    for (row = 0; row < employeeList.length; row += 1) {
        tableString += "<tr>";
        for (col = 0; col < 4; col += 1) {
            tableString += "<td>" + employeeList[row][col] + "</td>";
        }
        tableString += "</tr>";
    }
    tableString += "</tbody>";
    table.appendChild(tbody);
    $("tblBody").innerHTML = tableString;
}

var addEmployee = function () {
    "use strict";
    var name, title, extension, employees = [];
       
    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;
       
    if (name === "") {
        $("requireName").innerHTML = "This field is required.";
        return;
    } else {
        $("requireName").innerHTML = "";
        employees.push(name);
    }
    
    if (title === "") {
        $("requireTitle").innerHTML = "This field is required.";
        return;
    } else {
        $("requireTitle").innerHTML = "";
        employees.push(title);
    }
    
    if (extension === "") {
        $("requireExt").innerHTML = "This field is required.";
        return;
    }
    
    if (isNaN(extension) || extension.length !== 4) {
        $("requireExt").innerHTML = "The extension must be a 4-digit number";
        return;
    } else {
        $("requireExt").innerHTML = "";
        employees.push(extension);
        window.console.log(employeeList.length);
        btnDel[employeeList.length + 1] = "<button class='btnDel" + String(employeeList.length + 1) + "'>delete</button>";
        employees.push(btnDel[employeeList.length + 1]);
    }
    
    if (employees.length > 0) {
        employeeList.push(employees);
    }
    viewEmployees();
   
    $("regForm").reset();
    $("name").innerHTML = "";
    $("title").innerHTML = "";
    $("extension").innerHTML = "";
};

var deleteEmployee = function (index) {
    "use strict";
    employeeList.splice(index, 1);
    viewEmployees();
};

window.addEventListener("load", function () {
    "use strict";
    viewEmployees();
    $("add").addEventListener("click", addEmployee);
    $("tblBody").addEventListener("click", function (e) {
        if (e.target.textContent.match(/delete/)) {
            var i, index, tblBody, btnElements;

            tblBody = $("tblBody");
            btnElements = tblBody.getElementsByTagName("button");
            for (i = 0; i < btnElements.length; i += 1) {
                if (event.target.className === btnElements[i].className) {
                    index = i;
                }
            }
            deleteEmployee(index);
        }
    });
});