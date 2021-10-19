function getDate() {
    // 获取introduce中的数据赋给相应的元素
    $.ajax({
        url:`http://api.mingtv.xyz/mpapi/play?id=99`
    })
}









function data_run(){
    // 获取数据长度
    $.ajax({
        url:'http://api.mingtv.xyz/mpapi/recommend',
        success:function(result){
            let data_number = [...result.data].length;
            // console.log(data_number);
            // 数据拿不出success
            for (let index = 0; index < data_number; index++) {
                // console.log(index);
                getData(index);
            }
        }
    });
    // console.log(data_nun);
}
data_run();
