var listNewsApi = 'http://localhost:3000/listNews'
var listNews = [];

$("h1").html("Trang tin VinaEnter Edu");

// async function getApi() {
//     listNews = await axios.get(listNewsApi)
//     console.log(listNews);
//     listNews = listNews.data

//     var ulElement = $("#list")
//     console.log(ulElement);
//     var content = '';
//     listNews.map(item => {
//         content += `
//                     <li>
//                         <a href="#"><img src=${item.img} alt=${item.img} /></a>
//                         <div class="khoiphai">
//                             <h2><a href="#">${item.title}</a></h2>
//                             <p>${item.content}</p>
//                         </div>
//                         <div class="clr"></div>
//                     </li>
//                 `;
//         return content
//     })
//     ulElement.html(content);
// }
// getApi()


var ulElement = $("#list");

var content = '';

axios.get(listNewsApi)
    .then(response => {
        listNews = response.data;
        listNews.map(item => {
            content += `
        <li>
          <a href="#"><img src=${item.img} alt=${item.img} /></a>
          <div class="khoiphai">
            <h2><a href="#">${item.title}</a></h2>
            <p>${item.content}</p>
          </div>
          <div class="clr"></div>
        </li>
      `;
            return content;
        });
        ulElement.html(content);
    })
    .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
    });
