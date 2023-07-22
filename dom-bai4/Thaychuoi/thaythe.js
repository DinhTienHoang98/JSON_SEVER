// 3. Replace
// console.log(myString.replace('JS', 'Javascript')) // thay chữ JS thành Javascript
// console.log(myString.replace(/JS/g, 'Javascript')) // Thay tất cả chữ JS có trong biến thành Javascript 

$('#form').submit(function (event) {
    event.preventDefault();

    var textInput = $('#chuoigoc').val();
    var tugocInput = $('#tugoc');
    var tuthaytheInput = $('#tuthaythe');
    var output = $('#doanthaythe')

    var errorElement = $('#error')
    if (tugocInput.val() === '' || tuthaytheInput.val() === '') {
        errorElement.attr('style', 'color: red; font-style: italic; text-align: center')
        errorElement.text('Vui lòng nhập đầy đủ thông tin!');
    } else {
        errorElement.text('');
        var chuoi = textInput.replace(tugocInput.val(), tuthaytheInput.val())
        output.html(chuoi);
    }
})
