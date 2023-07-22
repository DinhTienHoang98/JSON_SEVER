const studentApi = "http://localhost:3000/student1"
const classListApi = "http://localhost:3000/classlist"

var listStudents = [];
var students = []

var classList = []
async function getApi() {
    students = await axios.get(studentApi);
    students = students.data

    classList = await axios.get(classListApi);
    classList = classList.data


    students.forEach(function (student) {
        var classInfo = classList.find(function (el) {
            return el.id == student.classId;
        })
        var newSt = {
            id: student.id,
            studentName: student.name,
            classId: classInfo.id,
            className: classInfo.name
        }
        listStudents.push(newSt);

    })
    display(listStudents);

    // Tạo danh sách lớp học
    var classElement = $('#class');

    var htmlOptions = `<option value=''>-- Chọn lớp --</option>`;
    console.log(classList);
    classList.forEach(function (classInfo) {
        htmlOptions += `
            <option value='${classInfo.id}'>${classInfo.name}</option>
        `;
    })

    classElement.html(htmlOptions);

}
getApi()
console.log(listStudents);

function getClassNameById(id) {
    return classList.find(function (el) {
        return el.id == id;
    }).name;
}


// man hinh hien thi
function display(array) {

    var tableElement = $('#tbl')

    // Tieu de
    var htmlTitle = `
<thead>
    <tr>
        <th>Ten Sinh Vien</th>
        <th>Lop</th>
        <th>Chuc Nang</th>
    </tr>
</thead>
`;
    // Noi dung
    var htmlBody = '<body>'
    for (const student of array) {
        var trElement = displaystudent(student);
        htmlBody += trElement;
    }
    htmlBody += '</body>'
    tableElement.html(htmlTitle + htmlBody);
}



function displaystudent(student) {
    var htmls = `
    <tr>
        <td>${student.studentName}</td>
        <td>${student.className}</td>
        <td>
            <button onclick = "onUpdate('${student.id}')" > Sua</button>
            <button onclick = "onDelete('${student.id}')"> Xoa </button>
        </td>
    </tr>
    `;
    return htmls;
};

var addBtnElement = $('#create');
var editBtnElement = $('#update');

var stName = $('input[name="name"]');
var classInfo = $('select[name="class"]');

// Ham nay de tao ra mot chuoi ngau nhien lam id
function generateUuid() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function handleBlurInput(input) {
    var errorElement = input.parent().find('.form-message');
    input.blur(function () {
        if (input.val() === '') {
            errorElement.css({ 'display': 'block', 'color': 'red', 'font-style': 'italic' });
            errorElement.text('Yêu cầu nhập!');
            input.addClass('invalid')
        } else {
            errorElement.css({ 'display': 'none' });
            input.removeClass('invalid')
        }
    })
    input.on('input', function () {
        errorElement.css({ 'display': 'none' });
        errorElement.text('')
        input.removeClass('invalid')
    })
}

handleBlurInput(stName);
handleBlurInput(classInfo);

addBtnElement.click(async function (e) {
    e.preventDefault();

    var check = true;
    if (isRequired(stName)) {
        check = false;
    }
    if (isRequired(classInfo)) {
        check = false;
    }
    if (check) {

        var newSt = {
            id: generateUuid(),
            studentName: stName.val(),
            classId: (classInfo.val()),
            className: getClassNameById(classInfo.val())
        }

        var newStudents = {
            id: generateUuid(),
            name: stName.val(),
            classId: classInfo.val()
        }
        await axios({
            method: "POST",
            url: studentApi,
            data: newStudents,
            headers: { "Content-Type": "application/json" }
        })
        listStudents.push(newSt);
        display(listStudents);

        stName.val('');
        classInfo.val('');

    }
    function isRequired(input) {
        var errorElement = input.parent().find('.form-message');
        if (input.val() === '') {
            errorElement.css({ 'display': 'block', 'color': 'red', 'font-style': 'italic' });
            errorElement.text('Yêu cầu nhập!');
            return true;
        } else {
            errorElement.css({ 'display': 'none' });
            return false;
        }
    }
})

var idEd;
function onUpdate(id) {
    idEd = id;
    // Tìm sinh viên muốn sửa
    var student = listStudents.find(function (st) {
        return st.id == idEd;
    })
    stName.val(student.studentName);
    classInfo.val(student.classId);

    addBtnElement.css({ 'display': 'none' });
    editBtnElement.css({ 'display': 'block' });
}

editBtnElement.click(async function (e) {
    e.preventDefault();
    var edSt = {
        id: idEd,
        studentName: stName.val(),
        classId: classInfo.val(),
        className: getClassNameById(classInfo.val())
    }
    var newStudents = {
        id: idEd,
        name: stName.val(),
        classId: classInfo.val()
    }
    await axios({
        method: "PUT",
        url: studentApi + "/" + idEd,
        data: newStudents,
        headers: { "Content-Type": "application/json" }
    })

    var idx = listStudents.findIndex(function (student) {
        return student.id == idEd;
    })
    listStudents.splice(idx, 1, edSt);
    display(listStudents);

    addBtnElement.css({ 'display': 'block' });
    editBtnElement.css({ 'display': 'none' });

    stName.val('');
    classInfo.val('');
})

async function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        var idx = listStudents.findIndex(function (student) {
            return student.id == id;
        })
        await axios({
            method: "DELETE",
            url: studentApi + "/" + id,
            headers: { "Content-Type": "application/json" }
        })


        if (idx !== -1) {
            listStudents.splice(idx, 1);
        }

        display(listStudents);
    }
}