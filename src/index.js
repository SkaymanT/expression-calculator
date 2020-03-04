function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const RegexAll = /[+*/\-]/g;
    const RegexBracket = /[()]/g;
    expr = expr.replace(/\s/g, '');
    let brackets = expr.match(RegexBracket);
    let operator = expr.match(RegexAll);
    let buf = expr.split(RegexAll);
    let bracketOpen = 0;
    let bracketClose = 0;
    if (!(brackets == null)) {
        for (let i = 0; i < brackets.length; ++i) {
            if (brackets[i] == "(") {
                ++bracketOpen;
            }
            if (brackets[i] == ")") {
                bracketClose++;
            }
        }
        if (bracketOpen != bracketClose) {
            throw "ExpressionError: Brackets must be paired";
        }
    }
    if (!(brackets == null)) {
        for (let l = 0; l < brackets.length; l = +2) {
            for (let i = 0; i < expr.length; ++i) {
                if (expr[i] == ')') {
                    for (let j = i; j >= 0; --j) {
                        if (expr[j] == '(') {
                            let bufexpr = expr.substring(j + 1, i);
                            let prebufexpr = expr.substring(0, j);
                            if ((i + 1) == expr.length) {
                                let bufres = expressionCalculator(bufexpr);
                                expr = prebufexpr + bufres;
                                break;
                            } else {
                                let bufres = expressionCalculator(bufexpr);
                                let nextbufexpr = expr.substring(i + 1, expr.length);
                                expr = prebufexpr + bufres + nextbufexpr;
                                break;
                            }
                        } else if (j == 0) {
                            throw "ExpressionError: Brackets must be paired";
                        }

                    }
                }
            }
        }
    }
    operator = expr.match(RegexAll);
    brackets = expr.match(RegexBracket);
    buf = expr.split(RegexAll);
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

function searchOperator(expr) {
    let operators = [];
    let j = 0;
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == "*" || expr[i] == "/" || expr[i] == "+" || (expr[i] == "-" && i != 0)) {
            if (!(expr[i] == "-" && (expr[i - 1] == "*" || expr[i - 1] == "/" || expr[i - 1] == "+" || expr[i - 1] == "-"))) {
                operators[j++] = expr[i];
            }
        }
    }

    return operators;
}

function searchNumber(expr) {
    let Numbers = [];
    let j = 0;
    let prev = 0;
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == "*" || expr[i] == "/" || expr[i] == "+" || (expr[i] == "-" && i != 0) || i == expr.length - 1) {
            if (!(expr[i] == "-" && (expr[i - 1] == "*" || expr[i - 1] == "/" || expr[i - 1] == "+" || expr[i - 1] == "-")) || i == expr.length - 1) {
                if (i == expr.length - 1) {
                    Numbers[j++] = expr.substring(prev, i);
                } else {
                    Numbers[j++] = expr.substring(prev, i);
                    prev = i + 1;
                }
            }
        }
    }
    return Numbers;
}

module.exports = {
    expressionCalculator
}

let expr = " 85 * 97 / (  89 / 11 - 18 * 96  ) - 61 ";
let expr1 = "-85-97*-9/-12";
let buf = searchOperator(expr1);
let buf1 = searchNumber(expr1);
//expressionCalculator(expr);