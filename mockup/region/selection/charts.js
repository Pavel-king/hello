let util = require('../../util');

module.exports = function(req, res) {
    const industries = [
        '农、林、牧、渔业',
        '采矿业',
        '制造业',
        '电力、热力、燃气与水生产和供应业',
        '建筑业',
        '批发和零售业',
        '交通运输、仓储和邮政业',
        '住宿和餐饮业'
    ];
    let data = industries.map(industry => ({
        industry,
        fiveAModel: Math.floor(Math.random() * 40) + 60,
        excellentEnterprises: Math.floor(Math.random() * 40) + 60,
        cooperationIntensity: Math.floor(Math.random() * 40) + 60
    }));
    
    util.ok(req, res, data);
}