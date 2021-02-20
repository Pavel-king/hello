let util = require('../../util');

function formatId(num, bits = 8) {
    let ret = num + '';
    if (ret.length < bits) {
        let n = bits - ret.length;
        while(n--) {
            ret = '0' + ret;
        }
    }
    return ret;
}
module.exports = function(req, res) {
    const data = [];
    for(let i = 0; i < 100; i++) {
        data.push({
            id: formatId(i),
            name: '阿里巴巴(中国)网络技术有限公司' + i,
            talent: Math.floor(Math.random() * 100),
            trade: Math.floor(Math.random() * 100),
            innovation: Math.floor(Math.random() * 100),
            brand: Math.floor(Math.random() * 100),
            competitionIndex: Math.floor(Math.random() * 100)
        });
    }
    util.ok(req, res, data);
}