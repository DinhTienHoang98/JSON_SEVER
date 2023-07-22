var listbooksApi = "http://localhost:3000/listbook"
var listbooks = [];

// hàm hiển thị danh sách
async function displayBooks() {
    listbooks = await axios.get(listbooksApi)
    listbooks = listbooks.data

    var tableElement = $('#list-books');
    // tiêu đề
    var htmlTitle = `
    <thead>
        <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>DETAIL</th>
            <th>STATUS</th>
            <th>FUNCTION</th>
        </tr>
    </thead>
    `;
    tableElement.html(htmlTitle);
    // nội dung
    var htmlBody = '<tbody>'; // sử dụng thẻ <tbody> để bao bọc phần body của bảng
    var html = '';
    listbooks.forEach(el => {
        html += `<tr>
        <td>${el.id}</td>
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td>${el.detail}</td>
        <td>${el.status ? "Enable" : "Disable"}</td>
        <td>
            <button onclick="onUpdate(${el.id})">SỬA</button>
            <button href = "" onclick="onDelete(${el.id})">XÓA</button>
        </td>
    </tr>
    `;
    });
    htmlBody += html + '</tbody>';
    tableElement.append(htmlBody);
}
displayBooks();

function onUpdate(id) {
    location = `edit.html?idBook=${id}`;
}

async function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        var idx = listbooks.findIndex(el => {
            return el.id == id
        })
        await axios({
            method: "DELETE",
            url: listbooksApi + "/" + id,
            headers: { "Content-Type": "application/json" }
        })
        if (idx !== -1) {
            listbooks.splice(idx, 1);
            displayBooks()
            isMessageDisplayed = true; // Cho phép hiển thị thông báo khi người dùng click chuột
            msgElement.html('<strong style="color: pink; background-color: black">Xoa thanh cong !!!</strong>');
        }
    }

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

var msg = getParameterByName('msg');

var msgElement = $('#msg');

if (msg === '1') {
    msgElement.html('<strong style="color: pink; background-color: black">Them thanh cong !!!</strong>')
}
if (msg === '2') {
    msgElement.html('<strong style="color: pink; background-color: black">Sua thanh cong !!!</strong>')
}

// Biến kiểm soát (flag) để chỉ cho phép xóa thông báo một lần duy nhất khi người dùng click chuột
var isMessageDisplayed = true;

// Xử lý sự kiện khi người dùng nhấp chuột vào bất kỳ đâu trên màn hình
$(document).on('click', function () {
    if (isMessageDisplayed) {
        msgElement.html(''); // Xóa nội dung thông báo khi nhấp chuột
        isMessageDisplayed = false; // Đánh dấu rằng thông báo đã được xóa
    }
});