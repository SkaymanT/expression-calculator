function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let result = 0;
    const RegexAll = /[+*/\-]/;
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
    if (operator[0] == '/' ) {
        if(buf[1]==0)
        throw "TypeError: Division by zero.";
        result =  +buf[0] / (+buf[1]);
    }
    if (operator[0] == '*') {
        result = +buf[0] * (+buf[1]);
    }

    //result = +buf.join('');
    // result = +buf1.join('');
    // result = +buf2.join('');
    // for (let i = 0; i < buf.length; ++i) {
    //     if(){

    //     }
    // }
    // if(expr=="2+2"){
    //     return 4;
    // }

    return result;
}

module.exports = {
    expressionCalculator
}