/**
 * Created by lifei
 */

var  card1, card2, card3, card4, hot, chartOne;
$(function () {

    card1 = echarts.init(document.getElementById('chart-nine-card'), 'customed');
    var option2 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data:[
                    {value:335, name:'大健康产业'},
                    {value:310, name:'先进制造业'},
                    {value:234, name:'先进制造业'},
                    {value:335, name:'互联网经济'},
                    {value:448, name:'优势特色农业'}
                ]
            }
        ]
    }
    card1.setOption(option2, true);

    card2 = echarts.init(document.getElementById('card2'), 'customed');
    var option3 = {
        radar: {
            name: {
                textStyle: {
                    color: '#00bfff',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                { name: '销售', max: 6500},
                { name: '管理', max: 16000},
                { name: '信息技术', max: 30000},
                { name: '客服', max: 38000},
                { name: '研发', max: 52000},
                { name: '市场', max: 25000}
            ]
        },
        series: [{
            name: '',
            type: 'radar',
            data : [
                {
                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                    name : '2017'

                },
                {
                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                    name : '2016'
                },
                {
                    value : [6000, 11000, 18000, 29000, 22000, 18000],
                    name : '2015'
                }
            ]
        }]
    };
    card2.setOption(option3, true);

    card3 = echarts.init(document.getElementById('card3'), 'customed');
    var option4 = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },

        xAxis : [
            {
                type : 'category',
                data : ['获得成果', '获得奖项', '专利申请', '科技论文', '技术成交额'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390]
            }
        ]
    };
    card3.setOption(option4, true);

    card4 = echarts.init(document.getElementById('card4'), 'customed');
    var option5 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                data: [
                    {value: 335, name: '社发出'},
                    {value: 310, name: '合作处'},
                    {value: 234, name: '社发处'},
                    {value: 135, name: '网络中心'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    card4.setOption(option5, true);

    hot = echarts.init(document.getElementById('hot_page'), 'customed');
    var card_hot = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                data: [
                    {value: 335, name: '生物制药'},
                    {value: 310, name: '互联网经济'},
                    {value: 234, name: '先进制造业'},
                    {value: 135, name: '高性能材料'},
                    {value: 120, name: '电子信息'},
                    {value: 90, name: '优势特色农业'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    hot.setOption(card_hot, true);

    chartOne = echarts.init(document.getElementById('chart-guangxi'), 'customed');
    function showProvince() {
        var name = 'guangxi';
        $.get('./json/guangxi.json', function (geoJson) {
            chartOne.hideLoading();

            echarts.registerMap(name, geoJson);

            chartOne.setOption(option = {
                series: [
                    {
                        type: 'map',
                        mapType: name,
                        label: {
                            emphasis: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#0a89ff',
                                areaColor: '#fff',
                                borderWidth: 2,
                                label:{
                                    show:true,
                                    color:'#999',
                                    textStyle:{
                                        fontSize:8
                                    }
                                },
                            },
                            emphasis: {
                                areaColor: '#0a89ff',
                                borderWidth: 0
                            }
                        },
                        animation: true
                    }
                ]
            });
        });
    }
    showProvince();
});


function allowDrop(ev)
{
    ev.preventDefault();
}

function drag(ev)
{
    ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
    ev.preventDefault();
    var sourceId = ev.dataTransfer.getData("Text"),
        $target = $(ev.target).hasClass('panel') ? $(ev.target) : $(ev.target).closest('.panel');
    if($target.attr('id') == sourceId){
        return ;
    }

    var $source = $('#'+sourceId);
    var $sourceParent = $source.parent(),
        $sourcePanelBody = $source.find('.panel-body'),
        sourceBodyHeight = $sourcePanelBody.height();
    var $targetParent = $target.parent(),
        $targetPanelBody = $target.find('.panel-body'),
        targetBodyHeight = $targetPanelBody.height();

    if($sourcePanelBody.hasClass('map-panel-body')){
        $sourcePanelBody.find('.chart').css('height', targetBodyHeight-60);
        $targetPanelBody.find('.chart').css('height', sourceBodyHeight);
    }else if($targetPanelBody.hasClass('map-panel-body')){
        $sourcePanelBody.find('.chart').css('height', targetBodyHeight);
        $targetPanelBody.find('.chart').css('height', sourceBodyHeight-60);
    }else{
        $sourcePanelBody.find('.chart').css('height', targetBodyHeight);
        $targetPanelBody.find('.chart').css('height', sourceBodyHeight);
    }


    $targetParent.empty().append($source);
    $sourceParent.empty().append($target);

    resizeChart();
}

function resizeChart(){
    card1.resize();
    card2.resize();
    card3.resize();
    card4.resize();
    hot.resize();
    chartOne.resize();
}