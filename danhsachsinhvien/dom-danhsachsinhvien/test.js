const students = [
    {
        id: '1',
        name: 'Nguyen Van Teo',
        classId: '1'
    },
    {
        id: '2',
        name: 'Nguyen Van Ti',
        classId: '2'
    },
    {
        id: '3',
        name: 'Tran Van Tun',
        classId: '3'
    },
    {
        id: '4',
        name: 'Nguyen Thi Heo',
        classId: '1'
    },
    {
        id: '5',
        name: 'Le Thi Be',
        classId: '1'
    }
]

const classList = [
    {
        id: '1',
        name: "CNTT"
    },
    {
        id: '2',
        name: 'DTVT'
    },
    {
        id: '3',
        name: 'THXD'
    },
    {
        id: '4',
        name: 'XDDD'
    }
];

// ham lay ID
function getClassNameById(id) {
    return classList.find(student => {
        return student.id == id
    }).name;
}
// Tao danh sach SV
var listStudents = [];
students.forEach(student => {
    var classInfo = classList.find(el => {
        return el.id == student.classId
    });
    var newstudents = {
        id: student.id,
        name: student.name,
        classId: classInfo.id,
        className: classInfo.name
    }
    listStudents.push(newstudents)
});

// man hinh hien thi
function display(array) {
    var tableElement = document.getElementById('tbl')
    // tieu de
    var htmlTitle = `
    <thead>
        <tr>
            <th>Ten</th>
            <th>Lop</th>
            <th>Chuc Nang</th>
        </tr>
    </thead>
    `;
    tableElement.innerHTML = htmlTitle;
    // Noi dung
    var htmlBody = '<body>';
    for (const student of array) {
        const conntent = displaystudent(student)
        htmlBody += conntent;
    }
    htmlBody += '</body>'
    tableElement.innerHTML = htmlBody;
}
display(listStudents);
function displaystudent(student) {
    const htmls = `
    <tr>
        <td>${student.name}</td>
        <td>${student.className}</td>
        <td>
            <button onclick = onUpdate(${student.id})>SUA</button>
            <button onclick = onDelete(${student.id})>XOA</button>
        </td>
    </tr>
    `;
    return htmls;
};
// Tao danh sach lop hoc
var classSelectElement = document.getElementById('class');
var classOptions = '<option value = "">-- Chuc nang --</option>'
classList.forEach(classInfo => {
    classOptions += `<option value = "${classInfo.id}">${classInfo.name}</option>`
})
classSelectElement.innerHTML = classOptions;

// ***********************
var tenInput = document.querySelector('input[name = "name"]')
var lopInput = document.querySelector('select[name = "class"]')
var createButton = document.getElementById('create')
var updateButton = document.getElementById('update')

// ham kiem tra value nhap vao
function handleBlurInput(input) {
    var errorElement = input.parentElement.querySelector('.form-message')
    input.onblur = function () {
        if (input.value === '') {
            errorElement.setAttribute('style', 'color: red; font-style: italic')
            errorElement.innerText = 'Vui long nhap'
        } else {
            errorElement.innerText = '';
        }
        input.oninput = function () {
            errorElement.setAttribute('style', 'display: none')
        }
    }
}
handleBlurInput(tenInput);
handleBlurInput(lopInput);

// Hàm add 

function addStudents() {
    createButton.onclick = function (e) {
        e.preventDefault();
        const ten = tenInput.value;
        const lop = lopInput.value;

        const newStudent = {
            id: listStudents.length + 1,
            name: ten,
            classId: lop,
            className: getClassNameById(lop)
        }
        listStudents.push(newStudent)

        display(listStudents)

        tenInput.value = '';
        lopInput.value = '';
    }
}
// Gắn sự kiện click cho nút them
createButton.addEventListener('click', addStudents());

// ham sua sv
var idEd;
function onUpdate(id) {
    idEd = id
    var editSt = listStudents.find(el => {
        return el.id == id
    })
    tenInput.value = editSt.name;
    lopInput.value = editSt.classId;

    updateButton.style.display = 'block';
    createButton.style.display = 'none';
}
function editStudent() {
    updateButton.onclick = function (e) {
        e.preventDefault();
        const ten = tenInput.value;
        const lop = lopInput.value;

        const newStudent = {
            id: idEd,
            name: ten,
            classId: lop,
            className: getClassNameById(lop)
        };
        var idx = listStudents.findIndex(el => {
            return el.id == idEd
        })
        listStudents.splice(idx, 1, newStudent);

        display(listStudents);


        updateButton.style.display = 'none';
        createButton.style.display = 'block';
        tenInput.value = '';
        lopInput.value = '';
    }
}
// Gắn sự kiện click cho nút Sửa
updateButton.addEventListener('click', editStudent());

// ham xoa sinh vien
function onDelete(id) {
    var check = confirm('ban co that su muon xoa');
    if (check) {
        const idx = listStudents.findIndex(el => {
            return el.id == id
        })
        listStudents.splice(idx, 1);
        display(listStudents)
    }
}