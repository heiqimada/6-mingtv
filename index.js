// 创建li标签，在li标签下绑a标签，a标签下绑img和p
const container = document.getElementById("rymovie-container");  //获取列表父容器
       
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
   axios({
       method:'post',
       url:'http://api.mingtv.xyz/mpapi/recommend',
   }).then(function(response){
        console.log(response)
        let pic_id = response.data.data[index].vod_id;
        // console.log(pic_id)
        // 将数据分给相应的元素   跳转到影院热映yyry功能页面
        a_container.setAttribute('href', `./conponent/yyry.html?vod_id=${pic_id}`);
        img_item.src = response.data.data[index].vod_pic;
        p_item.innerHTML = response.data.data[index].vod_name;
   })
}
// getData(1)
// 解析数据
// 获取数据长度n：创建n个li,再for循环给每个li下执行赋值操作
function data_run(){
    // 获取数据长度
    axios({
        method:'post',
        url:'http://api.mingtv.xyz/mpapi/recommend',
        header: {
            'Content-type':'application/x-www-form-urlencoded',
            'X-Content-Type-Options':'nosniff'
            },
    }).then(function(response){
        console.log([...response.data.data].length);
        let data_number = [...response.data.data].length;
        for (let index = 0; index < data_number; index++) {
            console.log(index);
            getData(index);
        };
    })
};
data_run();