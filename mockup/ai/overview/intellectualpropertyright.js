let util = require('../../util');

module.exports = function(req, res) {
    const cities = ['上海','北京','天津','重庆','河北','河南','云南','辽宁',
        '黑龙江','湖南','安徽','山东','新疆','江苏','浙江','江西','湖北','广西',
        '甘肃','山西','内蒙古','陕西','吉林','福建','贵州','广东','青海','西藏','四川',
        '宁夏','海南','台湾','香港','澳门'];
    const ipNumbers = [];
    let baseC = 1000;
    let baseW = 25000;
    for (let i = 1997; i <= 2018; i++) {
        ipNumbers.push({
            time: i + '',
            china: baseC,
            world: baseW
        });
        baseC = Math.floor(baseC * 1.1);
        baseW = Math.floor(baseW * 1.05);
    }
    util.ok(req, res, [{
        map: cities.map(name => ({name, value: Math.floor(Math.random() * 2000)})),
        ipNumbers,
        ipEvents: [
            {
                title: '一种人工智能充电系统',
                content: '本发明公开了一种人工智能充电系统，属于智能充电技术领域，所述人工智能充电系统包括：电池模块、电压采集模块、开关模块、DC-DC调压模块、充电模块以及逻辑控制单元，所述充电模块...'
            },
            {
                title: '一种人工智能充电系统',
                content: '本发明公开了一种人工智能充电系统，属于智能充电技术领域，所述人工智能充电系统包括：电池模块、电压采集模块、开关模块、DC-DC调压模块、充电模块以及逻辑控制单元，所述充电模块...'
            },
            {
                title: '一种人工智能充电系统',
                content: '本发明公开了一种人工智能充电系统，属于智能充电技术领域，所述人工智能充电系统包括：电池模块、电压采集模块、开关模块、DC-DC调压模块、充电模块以及逻辑控制单元，所述充电模块...'
            }
        ],
        ipProduction: [
            {name: '中国科学院系统', value: 23000},
            {name: '清华大学', value: 7500},
            {name: '上海交通大学', value: 6200},
            {name: '浙江大学', value: 6180},
            {name: '中国科学院大学', value: 5100},
            {name: '哈尔滨工业大学', value: 5090},
            {name: '华中科技大学', value: 4900},
            {name: '北京航空航天大学', value: 4200},
            {name: '北京大学', value: 4100},
            {name: '东南大学', value: 4000},
            {name: '武汉大学', value: 3800},
            {name: '西安交通大学', value: 3400},
            {name: '电子科技大学', value: 3300},
            {name: '中山大学', value: 3000},
            {name: '西安电子科技大学', value: 2950},
            {name: '中国科学技术大学', value: 2800},
            {name: '东北大学', value: 2700},
            {name: '加州大学系统', value: 2600},
            {name: '复旦大学', value: 2550},
            {name: '北京理工大学', value: 2500}
        ]
    }]);
}