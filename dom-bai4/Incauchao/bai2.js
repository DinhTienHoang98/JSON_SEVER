
var input = $('input[name="hoten"]');
var greeting = $("#greeting");

$('#form').submit(function (event) {
    event.preventDefault();

    var ten = input.val(); // Lấy giá trị tên từ input
    console.log(ten);
    var checkElement = $('.form-message');
    if (input.val() === '') {
        checkElement.attr('style', 'color: red; font-style: italic;');
        checkElement.text('Vui lòng nhập');
        greeting.text("");
    } else {
        greeting.html(`Câu chào: <strong>Chào bạn ${ten}</strong>`);
        input.val(ten);
    }
});