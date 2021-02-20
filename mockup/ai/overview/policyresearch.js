let util = require('../../util');

module.exports = function(req, res) {
    util.ok(req, res, {
        policy: [
            {
                title: '新一代人工智能发展规划',
                type: '国家政策',
                publisher: '发行单位',
                time: '2019-05-14'
            },
            {
                title: '关于积极推进“互联网+”行动的指导意见',
                type: '国家政策',
                publisher: '发行单位',
                time: '2019-05-14'
            },
            {
                title: '促进新一代人工智能产业发展三年行动计划(2018-2020年)',
                type: '国家政策',
                publisher: '发行单位',
                time: '2019-05-14'
            },
            {
                title: '浙江省促进新一代人工智能发展行动计划(2019-2022年)',
                type: '地方政策',
                publisher: '发行单位',
                time: '2019-05-14'
            },
            {
                title: '杭州市人工智能产业发展规划',
                type: '地方政策',
                publisher: '发行单位',
                time: '2019-05-14'
            }
        ],
        experts: [
            {
                src: '/pan2.jpg',
                title: '中国工程院院士潘云鹤：人工智能迈向2.0时代',
                content: '潘云鹤院士谈到，自从AlphaGo问世以后，大数据智能就已经初现端倪，但AlphaGo不仅仅体现了在机器学习方面的应用，更表现出了极强的自我活跃技术。大数据智能具有可提前预报、实施调控等优点，能为企业带来大量的经济效益...',
                time: '2019-05-14'
            },
            {
                src: '/pan2.jpg',
                title: '中国工程院院士潘云鹤：人工智能迈向2.0时代',
                content: '潘云鹤院士谈到，自从AlphaGo问世以后，大数据智能就已经初现端倪，但AlphaGo不仅仅体现了在机器学习方面的应用，更表现出了极强的自我活跃技术。大数据智能具有可提前预报、实施调控等优点，能为企业带来大量的经济效益...',
                time: '2019-05-14'
            },
            {
                src: '/pan2.jpg',
                title: '中国工程院院士潘云鹤：人工智能迈向2.0时代',
                content: '潘云鹤院士谈到，自从AlphaGo问世以后，大数据智能就已经初现端倪，但AlphaGo不仅仅体现了在机器学习方面的应用，更表现出了极强的自我活跃技术。大数据智能具有可提前预报、实施调控等优点，能为企业带来大量的经济效益...',
                time: '2019-05-14'
            }
        ],
        industry: [
            {
                src: '/ai.jpg',
                title: '2018年中国人工智能产业白皮书',
                content: '中国人工智能产业发展迅速，2018年中国人工智能市场规模有望超过300亿元人民币。人工智能企业数量超过1000家，位列全球第二。本次人工智能浪潮以从实验室走向商业化为特征，其发展驱动力主要来自计算力的显著提升、多方位的政策支持、大规模多频次的投资以及逐渐清晰的用户需求。与此同时，中国处于人工智能发展初期...',
                type: '人工智能',
                publisher: '研报作者',
                time: '2019-05-14'
            },
            {
                src: '/ai.jpg',
                title: '2018年中国人工智能产业白皮书',
                content: '中国人工智能产业发展迅速，2018年中国人工智能市场规模有望超过300亿元人民币。人工智能企业数量超过1000家，位列全球第二。本次人工智能浪潮以从实验室走向商业化为特征，其发展驱动力主要来自计算力的显著提升、多方位的政策支持、大规模多频次的投资以及逐渐清晰的用户需求。与此同时，中国处于人工智能发展初期...',
                type: '人工智能',
                publisher: '研报作者',
                time: '2019-05-14'
            },
            {
                src: '/ai.jpg',
                title: '2018年中国人工智能产业白皮书',
                content: '中国人工智能产业发展迅速，2018年中国人工智能市场规模有望超过300亿元人民币。人工智能企业数量超过1000家，位列全球第二。本次人工智能浪潮以从实验室走向商业化为特征，其发展驱动力主要来自计算力的显著提升、多方位的政策支持、大规模多频次的投资以及逐渐清晰的用户需求。与此同时，中国处于人工智能发展初期...',
                type: '人工智能',
                publisher: '研报作者',
                time: '2019-05-14'
            }
        ],
        institution: [
            {
                title: '人工智能某企业研究报告',
                content: '木地板产品按结构和材料主要分实木地板、实木复合地板、强化复合地板、竹地板和软木地板五类，其中前四类为主流消费材料。主要分实木地板、实木复合地板、强化复合地板、竹地板和软木地板五类，其中前四类为主流消费...',
                type: '计算机视觉',
                publisher: '研报作者',
                time: '2019-05-14'
            },
            {
                title: '智能技术与系统国家重点实验室年鉴',
                content: '2016年我们继续切实推进和加强人才队伍建设，并开展广泛的学术交流。青年教师刘知远获“钱伟长中文信息处理科学技术奖青年创新一等奖”；刘奕群副教授受邀担任信息检索领域著名国际学术会议 ACM SIGIR 2018 程序委员会主席；朱军副教授和杜克大学 Larry Carin 教...',
                type: '研究机构',
                publisher: '研报作者',
                time: '2019-05-14'
            },
            {
                title: '某研究机构年鉴',
                content: '木地板产品按结构和材料主要分实木地板、实木复合地板、强化复合地板、竹地板和软木地板五类，其中前四类为主流消费材料。主要分实木地板、实木复合地板、强化复合地板、竹地板和软木地板五类，其中前四类为主流消费...',
                type: '研究机构',
                publisher: '研报作者',
                time: '2019-05-14'
            }
        ]
    });
}