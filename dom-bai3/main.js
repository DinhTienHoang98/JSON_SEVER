var listNews2Api = "http://localhost:3000/listnew2"
var listNews = [];

$('#heading').html('Sản phẩm nổi bật');

var ulElement = $('#list');
var html = '';
console.log(listNews);
axios.get(listNews2Api)
    .then(response => {
        listNews = response.data
        listNews.map(item => {
            html += `
        <li>
                        <div class="left">
                            <a href="#" title=""><img src=${item.img} alt=${item.img} /></a>
                        </div>
                        <div class="right">
                            <h2><a href="#" title="">${item.tenHoa}</a></h2>
                            <p>${item.loaiHoa}</p>
                            <span><a href="#" title="">-Chi tiết-</a></span>
                        </div>
                        <div class="clr"></div>
                    </li>`;
        });
        $('#list').html(html)
    })
    .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
    });
