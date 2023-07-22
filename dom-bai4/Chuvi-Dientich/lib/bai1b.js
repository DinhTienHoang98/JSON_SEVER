
var resultDiv = $("#result");

// hàm check input
function handleBlurInput(input) {
    var checkElement = $(input).parent().find('.form-message');
    console.log(checkElement);
    input.blur(function () {
        if (input.val().trim() === '') {
            checkElement.css({ 'color': 'red', 'font-style': 'italic' })
            checkElement.text('Vui long nhap');
            input.addClass('invalid')
        } else {
            checkElement.text('');
            input.removeClass('invalid')
        }
    })
    input.on('input', function () {
        checkElement.css({ 'display': 'none' });
        input.removeClass('invalid')
    })
}
var daysoInput = $('input[name="dayso"]'); // Lấy giá trị nhập vào input
handleBlurInput(daysoInput);

$('#form').submit(function (event) {
    event.preventDefault(); // Ngăn chặn form gửi dữ liệu và tải lại trang

    // Kiểm tra xem giá trị dayso có hợp lệ hay không
    var tong = 0;
    var dayso = daysoInput.val()
    var daysoArray = dayso.split(',')
    for (var i = 0; i < daysoArray.length; i++) {
        var so = parseInt(daysoArray[i]); // Chuyển chuỗi thành số
        if (isNaN(so)) {

            resultDiv.css({ 'color': 'red', 'font-style': 'italic' });
            resultDiv.html("Vui lòng nhập đúng định dạng số!");
            return;
        }
        tong += so;
    }

    resultDiv.css('style', 'color: black; font-style: normal;');
    resultDiv.html("Tổng các số là: " + tong);
});
