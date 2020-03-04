function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let result = 0;
    const RegexAll = /[+*/\-]/g;
    const RegexBracket = /[()]/;
    expr = expr.replace(/\s/g, '');
    let operator = expr.match(RegexAll);
    let buf = expr.split(RegexAll);
    let bracket = expr.match(RegexBracket);
    if (!(bracket == null)) {
        if ((bracket.length % 2) == 1) {
            throw "ExpressionError: Brackets must be paired";
        }
    }
    for (let i = 0; i < operator.length; i) {
        if (operator[i] == '/') {
            if (buf[i + 1] == 0) {
                throw "TypeError: Division by zero.";
            }
            buf[i] = +buf[i] / (+buf[i + 1]);
            buf.splice(i + 1, 1);
            operator.splice(i, 1);
        } else if (operator[i] == '*') {
            buf[i] = +buf[i] * (+buf[i + 1]);
            buf.splice(i + 1, 1);
            operator.splice(i, 1);
        } else {
            ++i;
        }
    }

    for (let i = 0; i < operator.length; i) {
        if (operator[i] == '-') {

            buf[i] = +buf[i] - (+buf[i + 1]);
            buf.splice(i + 1, 1);
            operator.splice(i, 1);
        } else if (operator[i] == '+') {
            buf[i] = +buf[i] + (+buf[i + 1]);
            buf.splice(i + 1, 1);
            operator.splice(i, 1);
        } else {
            ++i;
        }
    }

    return buf[0];
}

module.exports = {
    expressionCalculator
}