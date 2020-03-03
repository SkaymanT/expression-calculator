function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let result = 0;
    const RegexAll = /[+*/\-]/g;
    const RegexFirst = /[\\*\\/]/;
    const RegexSecond = /[+-]/;
    const RegexBracket = /[()]/;
    expr = expr.replace(/\s/g, '');
    let operator = expr.match(RegexAll);
    let buf = expr.split(RegexAll);
    let buf1 = expr.split(RegexSecond);
    let buf2 = expr.split(RegexBracket);
    if (operator[0] == '+') {
        result = +buf[0] + (+buf[1]);
    }
    if (operator[0] == '-') {
        result = +buf[0] - (+buf[1]);
    }
    if (operator[0] == '/') {
        if (buf[1] == 0)
            throw "TypeError: Division by zero.";
        result = +buf[0] / (+buf[1]);
    }
    if (operator[0] == '*') {
        result = +buf[0] * (+buf[1]);
    }

    for (let i = 1; i < operator.length; ++i) {
        if (operator[i] == '+') {
            result = result + (+buf[i + 1]);
        }
        if (operator[i] == '-') {
            result = result - (+buf[i + 1]);
        }
        if (operator[i] == '/') {
            if (buf[1] == 0)
                throw "TypeError: Division by zero.";
            result = result / (+buf[i + 1]);
        }
        if (operator[i] == '*') {
            result = result * (+buf[i + 1]);
        }
    }
    // if(expr=="2+2"){
    //     return 4;
    // }

    return result;
}

module.exports = {
    expressionCalculator
}