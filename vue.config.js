let path = require('path');


let mock = true;
const needMock = function(path) {
    return mock && /^\/data/.test(path);
};

function mockupHandler(req, res, next) {
    if (req.headers.referer && needMock(req.path)) {
        try {
            let modulePath = require.resolve('.' + req.path.replace(/^\/data/, '/mockup'));
            delete require.cache[modulePath];
            if (/upload$/.test(req.path)) {
                res.type('html');
            }
            else {
                res.type('json');
            }
            require(modulePath)(req, res, next);
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
    else {
        next();
    }
}

module.exports = {
    devServer: {
        before(app) {
            app.use((req, res, next) => {
                if (needMock(req.path)) {
                    require('body-parser').urlencoded({
                        extended: true
                    })(req, res, next);
                }
                else {
                    next();
                }
            });
            app.get(/^\/data\//, mockupHandler);
            app.post(/^\/data\//, mockupHandler);
        },
        proxy: {
            '/data': {
                target: 'http://172.18.17.28:8092'
            }
        },
        disableHostCheck: true,
        compress: true,
        open: true,
        openPage: '/'
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        }
    }
};
