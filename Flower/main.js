var listHoaApi = "http://localhost:3000/listHoa"
var listNews = [];
$('h3').html('Danh sách hoa');

var title = `<thead>
<tr>
    <th>ID</th>
    <th>Tên hoa</th>
    <th>Loại hoa</th>
    <th>Hình ảnh</th>
</tr>
</thead>`;
$('#tbl').html(title);

var html = '';
axios.get(listHoaApi)
    .then(response => {
        listNews = response.data
        listNews.map(item => {
            html += `
            <tr>
            <td>${item.id}</td>
            <td><a href="#" title= ${item.tenHoa}></a>${item.tenHoa}</td>
            <td>${item.loaiHoa}</td>
            <td><img src= ${item.img} alt=${item.img} /></td>
        </tr>
            `;
        })
        var content = html += ('<tbody>' + html + '</tbody>');
        $('#tbl').append(content)
    })
    .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
    });
