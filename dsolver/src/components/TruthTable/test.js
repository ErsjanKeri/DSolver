// // recursively split the expression  in [expr, op, expr]
// function splitExpr(expr){
//     // check if there are any brackets 
//     if(!hasBrackets(expr)){
//         return expr
//     }

//     let expr_split = []
//     let expr_start = 0

//     // split first part if there is on bracket
//     if(expr[0] !== "("){
//         for(let i = 0; i < expr.length; i++){
//         if(expr[i] === "("){
//             expr_start = i;
//             break
//         }
//         }

//         expr_split.push(splitExpr(expr.substring(0, expr_start)))
//     }

//     // iterate over every char to find matching brackts
//     for(let i = expr_start; i < expr.length; i++){

//         // if there are no brackets left return the rest of the string
//         if(!hasBrackets(expr.substring(i, expr.length))){
//         expr_split.push(expr.substring(i, expr.length))
//         break
//         }

//         // find matching bracket
//         if(expr.charAt(i) === "("){
//         let iStart = i
//         let iEnd = findMatchingBracket(expr, iStart) // get index for matching bracket
        
//         // add subsring to array and recursively continue splitting the string
//         expr_split.push(splitExpr(expr.substring(iStart + 1, iEnd)))

//         i = iEnd
//         }
//     }
//     return expr_split
//     }




// function return the index of the matching bracket
function findMatchingBracket(expr, indexBracket){
let counter = 0;
let matchingIndex = expr.length - 1 
for(let i = indexBracket + 1; i < expr.length; i++){

    if(counter === 0 && expr.charAt(i) === ")"){
    matchingIndex = i      
    break
    }
    else{
    if(expr.charAt(i) === "("){
        counter++
    }else if(expr.charAt(i) === ")"){
        counter--
    }
    }
}
return matchingIndex
}

// return boolean if the expression has brackets
function hasBrackets(expr) {
return (expr.includes("(") || expr.includes(")"));
}




function normalize(exec) {
    return exec
        .replaceAll("xor", "!==")
        .replaceAll("nand", "") // TODO beide 1
        .replaceAll("nor", "") // TODO wenn beide 0 dann true
        .replaceAll("xand", "===")
        .replaceAll("and", "&&")
        .replaceAll("or", "||")
        .replaceAll("impl", "") // TODO
        .replaceAll("not ", "-")
}




function getExprVars(expr){
    let expr_vars = []
    expr = expr.replaceAll("(", "").replaceAll(")", "").split(" ")
    for(let i = 0; i < expr.length; i++){
      if(expr[i].length === 1 && !expr_vars.includes(expr[i]) ){
        expr_vars.push(expr[i])
      }
    }
    
    return expr_vars.sort()
}


// function splitExpr(expr){
//     for(let i = 0; i < )
// }

function createVarValues(expr_vars){
    const amount_vars = Math.pow(2, expr_vars.length)
    let var_values = []
    for(let i = 0; i < amount_vars; i++){
        var_values.push((i >>> 0).toString(2))
    }
    return var_values.map(t => {
        while(t.length < expr_vars.length){
            t = "0" + t
        }
        return t
    })
    .map(t => {
        t = t.split("").map(f => f === "1")
        return t
    })
}


function solve(expr) {
    const expr_vars = getExprVars(expr)
    const expr_vars_values = createVarValues(expr_vars)
    expr = normalize(expr)
    let solution = []

    // iterate over every possible combination of true and false values
    for(let i = 0; i < expr_vars_values.length; i++){
        let vars = ""
        // assign values to variables
        for(let v = 0; v < expr_vars.length; v++){
            vars += `let ${expr_vars[v]} = ${expr_vars_values[i][v]};\n`
        }
        eval(`${vars} solution.push(${expr})`)
    }
    return solution 
}

let expr = "(not p or q) xor (p and c)"
expr = "(b and a)"
// console.log(splitExpr(expr))
console.log(solve(expr))
// console.log(createVarValues(getExprVars(expr)))