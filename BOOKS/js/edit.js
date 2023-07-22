var listbooksApi = "http://localhost:3000/listbook";
var listbooks = [];

var titleInput = $('input[name="title"]');
var descriptionInput = $('textarea[name="description"]');
var detailInput = $('textarea[name="detail"]');
var statusInput = $('select[name="status"]');

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

var id = getParameterByName('idBook');
console.log(id);

async function getBookById(bookId) {
    var bookById = await axios.get(listbooksApi + `/${bookId}`);
    bookById = bookById.data;

    titleInput.val(bookById.title);
    descriptionInput.val(bookById.description)
    detailInput.val(bookById.detail)
    statusInput.val((bookById.status).toString())

}
getBookById(id);

updatebtn = $('input[type="submit"]')
updatebtn.click(async function (e) {
    e.preventDefault();
    var newBook = {
        id: id,
        title: titleInput.val(),
        description: descriptionInput.val(),
        detail: detailInput.val(),
        status: statusInput.val()
    }
    await axios({
        method: "PUT",
        url: listbooksApi + "/" + id,
        data: newBook,
        headers: { "Content-Type": "application/json" }
    })
    location = "list.html?msg=2";
})

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
