function end(res, data) {
    setTimeout(() => {
        res.end(JSON.stringify(data));
    }, 800);
}

function endFail(res, data) {
    setTimeout(() => {
        res.end(JSON.stringify(data));
    }, 800);
}

exports.ok = function (req, res, obj) {
    obj = obj || {};
    end(res, obj);
};

exports.fail = function (req, res, obj) {
    obj = obj || {};
    endFail(res, obj);
};

exports.formatDate = function (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

exports.substractDate = function (date, day = 1) {
    date.setDate(date.getDate() - day);
    return date;
};