
var coursesApi = 'http://localhost:3000/courses';

function start() {
    getCourse(renderCourse)

    hadlerCreateForm()
}
start();

// function
function getCourse(callback) {
    fetch(coursesApi)
        .then(response => {
            return response.json();
        })
        .then(callback)
};

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    fetch(coursesApi, options)
        .then(response => response.json()) // Thêm 'return' để trả về dữ liệu JSON
        .then(function () {
            // Xử lý sau khi tạo khóa học thành công
            callback(); // Gọi callback để thực hiện công việc sau khi tạo khóa học
        })
        .catch(error => console.error('Lỗi khi tạo khóa học:', error));
}


function halderdeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    };
    fetch(coursesApi + '/' + id, options)
        .then(response => response.json())
        .then(function () {
            var courseItem = $('.course-item-' + id);
            if (courseItem) {
                courseItem.remove();
            }
        })
        .catch(error => console.error('Lỗi khi xóa khóa học:', error));
}

function renderCourse(courses) {
    var listCourseBlock = $('#list-courses')
    var htmls = courses.map(course => {
        return `
        <li class="course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="halderdeleteCourse(${course.id})">Xoa</button>
        </li>
        `
    })
    listCourseBlock.html(htmls)
};

function hadlerCreateForm() {
    var createBtn = $('#create');
    createBtn.click(function () {
        var name = $('input[name="name"]').val()

        var description = $('input[name="description"]').val()

        var formData = {
            name: name,
            description: description
        }
        createCourse(formData, function () {
            getCourse(renderCourse)
        })
    })
}