
var listbooksApi = "http://localhost:3000/listbook";
var listbooks = [];

var titleInput = $('input[name="title"]');
var descriptionInput = $('textarea[name="description"]');
var detailInput = $('textarea[name="detail"]');
var statusInput = $('select[name="status"]');


async function getApi() {
    try {
        var response = await axios.get(listbooksApi);
        listbooks = response.data;

    } catch (error) {
        console.error("Lỗi khi tải dữ liệu: ", error);
    }
}

getApi();

function handleBlurInput(input) {
    var errorElement = $(input).parent().find('.form-message');

    $(input).on('blur', function () {
        if ($(this).val() === '') {
            errorElement.css({ 'color': 'red', 'font-style': 'italic' });
            errorElement.text('Vui lòng nhập.');
        } else {
            errorElement.text('');
        }
    });

    $(input).on('input', function () {
        errorElement.css('display', 'none');
    });
}

handleBlurInput(titleInput);
handleBlurInput(descriptionInput);
handleBlurInput(detailInput);

var addBtnElement = $('#create');
addBtnElement.click(async function (e) {
    e.preventDefault();
    var status = statusInput.val() === 'true';//chuyển sang kiểu dữ liệu boolean

    var newBook = {
        id: listbooks.length + 1,
        title: titleInput.val(),
        description: descriptionInput.val(),
        detail: detailInput.val(),
        status: status
    };
    console.log(newBook);
    try {
        await axios({
            method: "POST",
            url: listbooksApi,
            data: newBook,
            headers: { "Content-Type": "application/json" }
        })

        // Chuyển sang trang list.html sau khi thêm sách thành công
        location = "list.html?msg=1";
    } catch (error) {
        console.error("Lỗi khi thêm sách: ", error);
    }
});

