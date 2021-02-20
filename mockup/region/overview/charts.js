let util = require('../../util');

module.exports = function(req, res) {
    const industryName = [
        '制造业',
        '农、林、牧、渔业',
        '信息传输、软件和信息技术服务业',
        '建筑业',
        '水利、环境和公共设施管理业'
    ];
    const allDay = 5;
    const xData = [];
    let date = new Date();
    for (let j = 0; j < allDay; j++) {
        xData.unshift(util.formatDate(date));
        util.substractDate(date)
    }
    const yData = [];
    for (let i = 0; i < industryName.length; i++) {
        let baseData = 100 + i * 100;
        let data = [];
        for (let j = 0; j < allDay; j++) {
            data.push(Math.floor(baseData + Math.random() * 150));
        }
        yData.push({
            industryName: industryName[i],
            data
        });
    }
    util.ok(req, res, [{
        regionData: {
            xData,
            yData
        }
    }]);
}