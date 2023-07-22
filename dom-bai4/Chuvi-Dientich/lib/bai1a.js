var chieuDaiInput = $('input[name="chieudai"]');
var chieuRongInput = $('input[name="chieurong"]');

var resultDiv = $("#result");
var submitElement = $('input[type="submit"]');

// Kiểm tra xem đã nhập giá trị chieuDai và chieuRong chưa
function handleBlurInput(input) {
    var errorElement = $(input).parent().find('.form-message');
    input.blur(function () {
        if ($(input).val() === "") {
            errorElement.css({ 'color': 'red', 'font-style': 'italic' });
            errorElement.text('Vui lòng nhập');
            input.addClass('invalid')
        } else {
            errorElement.text('');
            input.removeClass('invalid')
        }
    })
    input.on('input', function () {
        errorElement.css('display', 'none');
    })
}
handleBlurInput(chieuDaiInput);
handleBlurInput(chieuRongInput);

submitElement.click(function (event) {
    event.preventDefault(); // Ngăn chặn form gửi dữ liệu và tải lại trang
    if (chieuDaiInput.val() === '' || chieuRongInput.val() === '') {
        resultDiv.html(`
    <p style="color: red">Vui lòng nhập đầy đủ thông tin vào!</p>
`);
    } else {
        var chieuDai = parseFloat(chieuDaiInput.val());
        var chieuRong = parseFloat(chieuRongInput.val());


        var chuVi = 2 * (chieuDai + chieuRong);
        var dienTich = chieuDai * chieuRong;

        resultDiv.html("Chu vi: " + chuVi + "<br />Diện tích: " + dienTich);
    }

});
