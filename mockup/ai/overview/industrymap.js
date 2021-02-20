let util = require('../../util');

module.exports = function(req, res) {
    const cities = ['上海','北京','天津','重庆','河北','河南','云南','辽宁',
        '黑龙江','湖南','安徽','山东','新疆','江苏','浙江','江西','湖北','广西',
        '甘肃','山西','内蒙古','陕西','吉林','福建','贵州','广东','青海','西藏','四川',
        '宁夏','海南','台湾','香港','澳门'];
    util.ok(req, res, [{
        industryRate: [
            {name: 'AI+', value: 0.46},
            {name: '智能机器人', value: 0.24},
            {name: '智能驾驶', value: 0.04},
            {name: '无人机', value: 0.04},
            {name: '大数据及数据服务', value: 0.20},
            {name: 'AR/VR', value: 0.02}
        ],
        industryIncrease: {
            x: ['1月', '3月', '6月', '9月', '12月'],
            y: [
                {
                    name: 'AI+',
                    data: [110, 120, 130, 140, 150]
                },
                {
                    name: '智能机器人',
                    data: [65, 73, 81, 89, 98]
                },
                {
                    name: '智能驾驶',
                    data: [12, 14, 16, 18, 20]
                },
                {
                    name: '无人机',
                    data: [12, 14, 16, 18, 20]
                },
                {
                    name: '大数据及数据服务',
                    data: [50, 57, 64, 71, 78]
                },
                {
                    name: 'AR/VR',
                    data: [21, 24, 27, 30, 33]
                }
            ]
        },
        map: cities.map(name => ({name, value: Math.floor(Math.random() * 2000)})),
        event: new Array(5).fill(1).map(() => ({
            title: '宝马汽车和戴姆勒将联合开发自动驾驶技术',
            content: '宝马汽车和戴姆勒公司(Daimler AG, DAI.XE, DMLRY)周四表示，正在合作开发自动驾驶技术。两家公司表示，双方签署了...'
        }))
    }]);
}