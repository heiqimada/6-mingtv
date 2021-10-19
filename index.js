// 创建li标签，在li标签下绑a标签，a标签下绑img和p
const container = document.getElementById("rymovie-container");  //获取列表父容器
       
// 分别得到给a、img、p数据
const url = 'http://api.mingtv.xyz/mpapi/recommend';

function getData(index){
    // 创建元素
    const li_rymovie = document.createElement("li");
    const a_container = document.createElement("a");
    const img_item = document.createElement("img");
    const p_item = document.createElement("p");

    // 上树
    container.appendChild(li_rymovie);
    li_rymovie.appendChild(a_container);
    a_container.appendChild(img_item);
    a_container.appendChild(p_item);
   //获取相应中的数据
    $.ajax({
        url:'http://api.mingtv.xyz/mpapi/recommend',
        success:function(result){
            // console.log(result);
            let pic_id = result.data[index].vod_id;
            let pic_url = result.data[index].vod_pic;
            let pic_name = result.data[index].vod_name;
            // return data_number = result.data.length;   
            a_container.setAttribute('href', './conponent/yyry.html')
            // a_container.setAttribute('href', `http://api.mingtv.xyz/mpapi/play?id=${pic_id}`)
            img_item.src = pic_url;
            p_item.innerHTML = pic_name;
        }
    })
}
// 解析数据
// 获取数据长度n：创建n个li,再for循环给每个li下执行赋值操作
function data_run(){
    // 获取数据长度
    $.ajax({
        url:'http://api.mingtv.xyz/mpapi/recommend',
        success:function(result){
            let data_number = [...result.data].length;
            // console.log(data_number);
            for (let index = 0; index < data_number; index++) {
                // console.log(index);
                getData(index);
            }
        }
    });
    // console.log(data_nun);
}
data_run();