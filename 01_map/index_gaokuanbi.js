// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
let center = [0, 0];
let mapAspectRatio = 1;

myChart.showLoading();
let provinceNames = [ 'anhui', 'aomen', 'beijing', 'chongqing', 'fujian', 'gansu', 'guangdong', 'guangxi', 'guizhou', 'hainan', 'hebei', 'heilongjiang', 'henan', 'hubei', 'hunan', 'jiangsu', 'jiangxi', 'jilin', 'liaoning', 'neimenggu', 'ningxia', 'qinghai', 'shandong', 'shanghai', 'shanxi', 'shanxi1', 'sichuan', 'taiwan', 'tianjin', 'xianggang', 'xinjiang', 'xizang', 'yunnan', 'zhejiang'];
let a = localStorage.getItem('a');
if (!a) {
    localStorage.setItem('a', '0');
} else {
    localStorage.setItem('a', String(Number(a) + 1)); 
}
console.log('province: ', provinceNames[Number(a)]);
// $.get("/01_map/province/tianjin.json", function (usaJson) {
// $.get(`/01_map/province/henan.json`, function (usaJson) {
$.get(`/01_map/province/${provinceNames[Number(a)]}.json`, function (usaJson) {
// $.get("/01_map/hebei.json", function (usaJson) {
    myChart.hideLoading();
    echarts.registerMap('hebei', usaJson);
    option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'click',
            showDelay: 0,
            transitionDuration: 0.2,
            padding: 0,
            formatter: function (params) {
                console.log(params)
                var html = `<div style="color: red; font-size: 40px; background: blue; height: 50px; line-height: 50px;">123</div>`
            //     let html = `<div style="height:auto;width: 163px;">
            //     <div style="font-size:14px;font-weight:bold;color:#333;margin-bottom:16px;line-height:1;">
            //       ${params[0].axisValue}
            //     </div>
            //     ${params
            //             .map(
            //                 (
            //                     item
            //                 ) => `<div style="font-size:12px;color:#808080;margin-bottom:8px;display:flex;align-items:center;line-height:1;">
            //           <span style="display:inline-block;margin-right:8px;border-radius:6px;width:6px;height:6px;background-color:${item.color
            //                     };"></span>
            //           ${item.seriesName}
            //           <span style="flex:1;text-align:right;">¥${item.value[
            //                     item.encode.y[0]
            //                     ] || 0}</span>
            //         </div>`
            //             )
            //             .join("")}
            //       <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:#333;padding-top:4px;margin-bottom:8px;line-height:1;">
            //       <span>总计</span>
            //       <span>¥${R.reduceRight(
            //                 R.add,
            //                 0,
            //                 R.drop(1, params[0].value || [])
            //             )}</span>
            //     </div>
            //   </div>`;
                return html;
            },
        },
        geo: [{
            // top: 0,
            // bottom: 0,
            map: 'hebei',
            // center: [105.194115019531, 35.582111640625],
            // center: [116, 39],
            // aspectScale: 0.75, //长宽比
            // aspectScale: 1,
            roam: true,
            animationDurationUpdate: 0, // 快速刷新
            itemStyle: {
                normal: {
                    areaColor: `#10359b`,
                    // shadowColor: `#10359b`,
                    // shadowOffsetX: 6,
                    // shadowOffsetY: 6,
                    borderColor: `#10359b`,
                    // borderWidth: 10,
                    // shadowBlur: 1
                },
                emphasis: {
                    label: {
                        show: false
                    }
                }
            }
        }],
        series: []
    };
    myChart.setOption(option);
    let haha = echarts.getMap('hebei')
    getMapAspectRatio(haha);

    let containerH = document.body.clientHeight;
    let containerW = document.body.clientWidth;
    let containerAspectRatio = containerH / containerW;
    // 流出标签的距离
    let geoPosition = {
        left: 5,
        right: 5,
    }
    if (mapAspectRatio >= containerAspectRatio) {
        geoPosition = {
            top: 5,
            bottom: 5,
        }
    }
    myChart.setOption({
        geo: [
            {
                ...geoPosition,
                center
            },
        ]
    })

    myChart.on('georoam', params => { // 拖动函数
        let option = myChart.getOption();
        if (params.zoom) {
            option.geo[0].zoom = option.series[0].zoom;
        } else {
        }
        option.geo[0].center = option.series[0].center;
        myChart.setOption(option)
    })

    myChart.on('click', function(params) {
        console.log(params)
        // 可以看到数据和位置
    })

    window.addEventListener('resize', () => {
        myChart.resize();
    })
});


// 计算高宽比
function getMapAspectRatio(js) {
    console.log('json: ', js)
    let minLeft = 2000;
    let maxLeft = -2000;
    let minTop = 2000;
    let maxTop = -2000;

    let minX = 2000;
    let maxX = -2000;
    let minY = 2000;
    let maxY = -2000;
    js.geoJson.features.forEach(featureItem => {
        let coordinatyCoup = [];
        featureItem.geometry.coordinates.flat(Infinity).forEach((coordinatyItem, index) => {
            if (index % 2 === 0) {
                minX = Math.min(minX, coordinatyItem);
                maxX = Math.max(maxX, coordinatyItem);
                if (isNaN(minX))  {
                    debugger
                }
            } else {
                minY = Math.min(minY, coordinatyItem);
                maxY = Math.max(maxY, coordinatyItem);
            }

            // https://echarts.apache.org/zh/api.html#echartsInstance.convertToPixel
            coordinatyCoup.push(coordinatyItem);
            if (index % 2 === 1) {
                // let [pageX, pageTop] = myChart.convertToPixel('geo', coordinatyCoup);
                // 使用第1个 geo 坐标系进行转换：
                let [pageX, pageTop] = myChart.convertToPixel({geoIndex: 0}, [128.3324, 89.5344]);
                minLeft = Math.min(minLeft, pageX);
                maxLeft = Math.max(maxLeft, pageX);
                minTop = Math.min(minTop, pageTop);
                maxTop = Math.max(maxTop, pageTop);
                coordinatyCoup = [];
            }
        })
    })

    let rangeX = maxX - minX;
    let rangeY = maxY - minY;
    let rangeWidth = maxLeft - minLeft;
    let rangeHeight = maxTop - minTop;
    // console.log('maxX: ', maxX)
    // console.log('minX: ', minX)
    // console.log('maxY: ', maxY)
    // console.log('minY: ', minY)
    // console.log('rangeX: ', rangeX)
    // console.log('rangeY: ', rangeY)
    // console.log('center X: ', rangeX / 2)
    // console.log('center Y: ', rangeY / 2)
    center = [minX + rangeX / 2, minY + rangeY / 2];
    
    // 高宽比公司计算
    // mapAspectRatio = rangeY / (Math.cos((minY + rangeY / 2) * 2 * Math.PI / 360) * rangeX);
    console.log('rangeHeight: ', rangeHeight)
    console.log('rangeWidth: ', rangeWidth)
    mapAspectRatio = rangeHeight / rangeWidth;
    console.log('mapAspectRatio: ', mapAspectRatio)
}
