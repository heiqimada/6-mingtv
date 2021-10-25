// console.dir(document.URL)
// 获取url后面的vod_id=86204
var url = document.URL;
var temp2 = url.split('=')[1];
// console.log(temp2);  //vod_id=86204


function getDate() {
    // axios (url,{method,header,params,data,timeout,withCridentials})
    // 当以post形式传递参数时，参数是以form data的形式在请求体中呈现，
    // 头信息中需要说明请求体的类型：Content-type=application/x-www-form-urlencoded
    // 参数放在send里面，即axios的data中，即请求体中
    axios(`http://api.mingtv.xyz/mpapi/play`, {
        method: 'post',
        header: {
            'Content-type':'application/x-www-form-urlencoded',
            'X-Content-Type-Options':'nosniff'
            },
        data: `vod_id=${temp2}`
    }).then((response) => {
        // 1、introduce部分
        introduce();
        //2、播放列表部分
        bfform();

        // 生成介绍部分页面
        function introduce() {
            // 1、introduce部分
            const main_img = document.getElementById('main_img');
            const main_remarks = document.getElementById('main_remarks');
            const main_name = document.getElementsByTagName('li')[0];
            const main_actor = document.getElementsByClassName('vod_actor')[0];
            const main_year = document.getElementsByClassName('vod_year')[0];
            const main_area = document.getElementsByClassName('vod_area')[0];
            const main_class = document.getElementsByClassName('vod_class')[0];
            const main_smpitd = document.querySelector('.introduce li:nth-child(6)')
            // console.log(main_smpitd)
            // 得到数据
            let vod_name = response.data.data[0].vod_name;
            let vod_actor = response.data.data[0].vod_actor;
            let vod_pic = response.data.data[0].vod_pic;
            let vod_year = response.data.data[0].vod_year;
            let vod_area = response.data.data[0].vod_area;
            let vod_class = response.data.data[0].vod_class;
            let vod_remarks = response.data.data[0].vod_remarks;
            let vod_content = response.data.data[0].vod_content;
            // 传入数据
            main_img.src = vod_pic;
            main_remarks.innerHTML = vod_remarks;
            main_name.innerHTML = vod_name;
            main_actor.innerHTML = vod_actor;
            main_year.innerHTML = vod_year;
            main_area.innerHTML = vod_area;
            main_class.innerHTML = vod_class;
            main_smpitd.innerHTML = `简介：${vod_content}`;
        };
        // 播放列表部分
        function bfform() {
            // 获取数据
            let vod_play_url = response.data.data[0].vod_play_url;
            // 获取播放列表节点
            const lines_dom = document.getElementById('lines')
            // 动态创建线路
            let line_num = vod_play_url.split('$$$').length
            const lines_name = ['极速线路1', '高清云播', '极速线路2']
            for (let lines = 0; lines < line_num; lines++) {
                const li_lines = document.createElement("li");  //创建n条线路
                lines_dom.appendChild(li_lines);
                li_lines.innerHTML = lines_name[lines];
            };
            // 默认line0为播放线路
            // let line_btn = 0 ;
            // 事件委托给父元素

            lines_dom.onclick = (e) => {
                const tag = e.target
                // 判断epi下是否有子节点，有就删，没就过
                isEpiHasChild();
                // 只点击li路线标签才生效
                if (tag.nodeName.toLowerCase() == 'li') {
                    // 判断点击的是哪个标签/哪条路线
                    for (let test = 0; test < lines_name.length; test++) {
                        if (tag.innerHTML === lines_name[test]) {
                            // 生成播放列表
                            creatEpiList(test);
                            // 去掉所有已上色背景
                            const lines_children =document.getElementById('lines').childNodes
                            // 遍历每一个children然后删除背景色
                            for (let i = 0; i < lines_children.length; i++) {
                                lines_children[i].className='';
                            }
                            // 被点击li背景上色
                            tag.className ='bgc';
                        }
                    };
                } 
            };
            // 
            function isEpiHasChild() {
                if (epi_ul.childElementCount!=0) {
                    // 删除epi下所有的子节点,
                    const lis =document.getElementById('epi').childNodes
                    // 正向删除只能删一半，因为删除一个索引会往前跳一个，所以从后往前删
                    for (let index = lis.length-1; index >=0 ; index--) {
                        epi_ul.removeChild(lis[index]);
                    }
                    console.log(epi_ul.childElementCount)
                }
            }
            // 生成播放集数列表
            const epi_ul = document.getElementById('epi');
            function creatEpiList(num) {
                let epi_num = vod_play_url.split('$$$')[num].split('#');
                // console.log(epi_num)
                for (let epis = 0; epis < epi_num.length; epis++) {
                    let epi_name = epi_num[epis].split('$')[0];
                    let epi_url = epi_num[epis].split('$')[1];
                    const epi_li = document.createElement("li");
                    epi_ul.appendChild(epi_li);
                    const epi_li_a = document.createElement("a");
                    epi_li_a.setAttribute('href', epi_url);
                    epi_li_a.innerHTML = epi_name;
                    epi_li.appendChild(epi_li_a);
                }
            }
            // 立即播放按钮
            const ljbf_ul = document.querySelector('.introduce li:nth-child(7)');
            ljbf_ul.onclick=()=>{
                isEpiHasChild();
                creatEpiList(0);
            }
        };
    });
}
getDate();


