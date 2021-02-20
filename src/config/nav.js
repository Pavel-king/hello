export default {
    nav: [
        {
            text: '区域产业分析',
            url: '/region/overview',
            include: /^\/region\/overview/,
            icon: 'el-icon-menu',
            children: [
                {
                    text: '产业概览',
                    url: '/region/overview',
                    include: /^\/region\/overview/,
                },
                {
                    text: '产业甄选',
                    url: '/region/selection',
                    include: /^\/region\/selection/,
                }
            ]
        },
        {
            text: 'AI产业分析',
            url: '/ai/overview',
            include: /^\/ai\/overview/,
            icon: 'el-icon-document',
            children: [
                {
                    text: '产业概览',
                    url: '/ai/overview',
                    include: /^\/ai\/overview/,
                },
                {
                    text: '企业画像',
                    url: '/ai/portrait',
                    include: /^\/ai\/portrait/,
                }
            ]
        }
    ]
};