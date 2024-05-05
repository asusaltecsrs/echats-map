// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

myChart.showLoading();
$.get("/01_map/hebei.json", function (usaJson) {
    myChart.hideLoading();
    echarts.registerMap('hebei', usaJson);
    option = {
        title: {
            text: 'USA Population Estimates (2012)',
            subtext: 'Data from www.census.gov',
            sublink: 'https://www.baidu.com',
            left: 'right'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'click',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                console.log(params)
                var html = `<div style="color: red; font-size: 40px; ">123</div>`
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
        visualMap: {
            show: true, // 隐藏
            left: 'right',
            min: 500000,
            max: 38000000,
            inRange: {
                color: [ // 由低到高
                    '#0000ff',
                    '#ff0000',
                    // '#313695',
                    // '#4575b4',
                    // '#74add1',
                    // '#abd9e9',
                    // '#e0f3f8',
                    // '#ffffbf',
                    // '#fee090',
                    // '#fdae61',
                    // '#f46d43',
                    // '#d73027',
                    // '#a50026'
                ]
            },
            text: ['High', 'Low'],
            calculable: true
        },
        toolbox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        geo: [{
            map: 'hebei',
            // center: [105.194115019531, 35.582111640625],
            center: [116, 39],
            aspectScale: 0.75, //长宽比
            zoom: 1,
            roam: true,
            animationDurationUpdate: 0, // 快速刷新
            itemStyle: {
                normal: {
                    areaColor: `#10359b`,
                    shadowColor: `#10359b`,
                    shadowOffsetX: 6,
                    shadowOffsetY: 6,
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
        series: [
            {
                name: '人口', // tooltip标题
                type: 'map',
                roam: true,
                map: 'hebei',
                // center: [105.194115019531, 35.582111640625],
                center: [116, 39],
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    { name: '石家庄市', value: 4822023 },
                ]
            }
        ]
    };
    myChart.setOption(option);

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
});
