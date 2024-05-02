// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

myChart.showLoading();
$.get("./lib/hebei.json", function (usaJson) {
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
            showDelay: 0,
            transitionDuration: 0.2
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
            animationDurationUpdate: 0,
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

    myChart.on('georoam', params => {
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
