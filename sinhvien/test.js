const studentList = [
    {
        id: 1,
        name: 'Hoàng',
        address: 'Hòa Hải',
    },
    {
        id: 2,
        name: 'Nam',
        address: 'QN',
    },
    {
        id: 3,
        name: 'Việt',
        address: 'ĐN',
    }
];

const nameElement = $('input[name="name"]');
const addressElement = $('input[name="address"]');
const createButton = $('#create');
const updateButton = $('#update');
const studentInput = $('#list-students');

// Hàm kiểm tra input
function handleBlurInput(input) {
    const checkElement = input.parent().find('.form-message');

    input.blur(function () {
        if (input.val().trim() === '') {
            checkElement.attr('style', 'color: red; font-style: italic');
            checkElement.text('Vui lòng nhập');
            input.addClass('invalid');
        } else {
            checkElement.text('');
            input.removeClass('invalid');
        }
    });

    input.on('input', function () {
        checkElement.attr('style', 'display: none');
        input.removeClass('invalid');
    });
}

handleBlurInput(nameElement);
handleBlurInput(addressElement);

// Hàm thêm sinh viên mới vào danh sách
function addStudent() {

    // Kiểm tra xem tên và địa chỉ có được cung cấp hay không
    if (nameElement.val() === '' || addressElement.val() === '') {
        alert('Vui lòng nhập tên và địa chỉ.');
        return;
    }

    // Tạo đối tượng sinh viên từ thông tin nhập vào
    const student = {
        id: studentList.length + 1,
        name: nameElement.val(),
        address: addressElement.val()
    };

    // Thêm sinh viên vào mảng
    studentList.push(student);

    // Hiển thị danh sách sinh viên
    displayStudents();

    // Xóa nội dung ô input sau khi thêm sinh viên thành công
    nameElement.val('');
    addressElement.val('');
}

// Gắn sự kiện click cho nút Thêm
createButton.click(addStudent);

// Hàm hiển thị danh sách sinh viên
function displayStudents() {
    let htmls = '';

    studentList.forEach((student) => {
        htmls += `<li class='student-${student.id}'>
            <h2>Tên: ${student.name}</h2>
            <p>Địa chỉ: ${student.address}</p>
            <button onclick="onUpdate(${student.id})">Sửa</button>
            <button onclick="onDelete(${student.id})">Xóa</button>
        </li>`;
    });

    studentInput.html(htmls);
}

displayStudents();

// Hàm xử lý sự kiện khi nhấn nút Sửa
function onUpdate(id) {
    // Tìm sinh viên trong danh sách dựa trên id
    const student = studentList.find(item => item.id === id);

    if (student) {
        // Hiển thị thông tin sinh viên trong ô input
        nameElement.val(student.name);
        addressElement.val(student.address);

        // Ẩn nút Thêm và hiển thị nút Sửa
        createButton.css({ 'display': 'none' });
        updateButton.css({ 'display': 'block' });

        // Gán sự kiện click cho nút Sửa
        updateButton.click(function () {
            // Cập nhật thông tin sinh viên trong danh sách
            student.name = nameElement.val();
            student.address = addressElement.val();

            // Hiển thị danh sách sinh viên
            displayStudents();

            // Xóa nội dung ô input sau khi sửa sinh viên thành công
            nameElement.val('');
            addressElement.val('');

            // Hiển thị lại nút Thêm và ẩn nút Sửa
            createButton.css({ 'display': 'block' });
            updateButton.css({ 'display': 'none' });
        });
    }
}

// hàm xóa sinh viên
function onDelete(id) {
    var check = confirm('Bạn có chắc muốn xóa không?');
    if (check) {
        var idx = studentList.findIndex(el => {
            return el.id == id;
        })
        studentList.splice(idx, 1)
        displayStudents();
    }
}
