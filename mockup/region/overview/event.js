let util = require('../../util');

module.exports = function(req, res) {
    let time = util.formatDate(new Date());
    util.ok(req, res, [{
        policy: [
            {
                time,
                title: '商务部办公厅关于做好对外承包工程项目备案管理的通知'
            },
            {
                time,
                title: '发展改革委 商务部令2019第27号 鼓励外商投资产业目录 (2019年版)'
            },
            {
                time,
                title: '教育部办公厅关于印发《中等职业学校专业设置管理办法(试行)》的通知'
            },
            {
                time,
                title: '关于印发《推动重点消费品更新升级 畅通资源循环利用实施方案（2019-2020年）》的通知'
            }
        ],
        company: [
            {
                time,
                brand: '品牌',
                title: '兔宝宝荣获"2019 CBD TOP100品牌"'
            },
            {
                time,
                brand: '中标',
                title: '兔宝宝承接多项重要工程'
            },
            {
                time,
                brand: '经营',
                title: '兔宝宝衣柜与祥生集团签订衣柜精装修合作战略协议'
            },
            {
                time,
                brand: '品牌',
                title: '相信品牌，未来已来——兔宝宝衣柜迎来四月品牌季'
            }
        ]
    }]);
}