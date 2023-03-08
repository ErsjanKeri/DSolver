  //to parse user input in 2d Array
  function parseClauses(input) {
    var clausesArr = []
    try {
      var raw1 = input.split('}')
      raw1.forEach(element => {

        var clause = element.replace('{', '').replaceAll(' ', '')
        clausesArr.push(clause.split(',').filter(n => n.length != 0))
      })
    } catch (exception) {
      return []
    }
    clausesArr.pop()
    return clausesArr
  }

  function dpll_apply_step(klauseln, mother) {
    
    var letter
    //error -1:: not in the format I want (2D-Array) or the mother is not an instance of tree
    if (!Array.isArray(klauseln)) return -1
    if (mother instanceof TreeNode === false) return - 1

    //success, all of them are satisfied
    console.log("clausel size: " + klauseln.length)
    if (klauseln.length === 0) return 1

   
    //error -2: not an array inside
    if (!Array.isArray(klauseln[0])) return -2
    //error -3: go back, not satisfiable 
    if (contains_empty(klauseln)) return -3
    
    //check for OLR Rule
    let klauselnMitOne = []

    console.log("actual: " + klauseln)

    klauseln.forEach(element => addIfOne(klauselnMitOne, element)) //add klauseln with only one literal

    //if there is, determine the one with highest priority 
    if (klauselnMitOne.length !== 0) {
      letter = determineLiteraryFirst(klauselnMitOne)
      letter = letter[0]
      
      mother.middle = new TreeNode(dpll_reduce(klauseln, letter))
      return dpll_apply_step(mother.middle.value, mother.middle)
    }

    //check for PLR Rule
    let pureLiterals = []
    findPure(klauseln, pureLiterals)
    if (pureLiterals.length !== 0) {
      letter = determineLiteraryFirst(pureLiterals)
      mother.middle = new TreeNode(dpll_reduce(klauseln, letter))
      return dpll_apply_step(mother.middle.value, mother.middle)
    }


    //literary steps

    //positive
    var positiveLits = posLitArray(klauseln)
    var negatvieLits = negLitArray(klauseln)

    console.log(positiveLits)
    letter = positiveLits[0]
    mother.left = new TreeNode(dpll_reduce(klauseln, letter))
    console.log("Mother left value: " + mother.left.value)
    
    var code = dpll_apply_step(mother.left.value, mother.left)
    if (code === 1) return 1 //empty clauses set, success
    
    //negative
    //-3 means continue
    if (code === -3) {
      letter = negatvieLits[0]
      mother.right = new TreeNode(dpll_reduce(klauseln, letter))
      console.log("Mother right value: " + mother.right.value)
      return dpll_apply_step(mother.right.value, mother.right)
    }
  }


  //adds to the given array the klausel with only one literal
  function addIfOne(arr, clause) {
  
    if (clause.length === 1) {
        arr.push(clause)
    }
  }

  //returns the literal which has literary priority
  function determineLiteraryFirst(literals) {
    if (!Array.isArray(literals) || literals.length === 0) return ''

    var positives = literals.filter(n => !n.includes('!')).sort()
    var negatives = literals.filter(n => n.includes('!')).sort()

    //check if either of the literal arrays are empty
    //console.log(positives)
    //console.log(negatives)
    if (positives.length === 0 || negatives.length === 0 ) {
      return positives.length === 0 ? negatives[0] : positives[0]
    }

    var reversedNeg = negatives[0].replace('!', '')
    //compare the first letters of negative and positives, return the smaller (alphabeticely higher) one
    return reversedNeg.localeCompare(positives[0]) ? negatives[0] : positives[0]
  }

  //reduces the set with given literal
  function dpll_reduce(klauseln, literal) {
    //clear the ones that contains this literal
     
    for (let index = 0; index < klauseln.length; index++) {
        if (klauseln[index].includes(literal)) {
          klauseln.splice(index--, 1)
        }
    }

    //clear opposite literals in the rest
    var reverseLiteral = literal.includes('!') ? literal.replace('!', '') : "!" + literal
    
    klauseln.forEach(element => {
      var index = element.indexOf(reverseLiteral)
      if (index !== -1) element.splice(index, 1)
    })

    return klauseln
  }


  //check if the step contains an empty klausel, if so return --> not satisfiable
  function contains_empty(clauses) {
    if (Array.isArray(clauses)) {
      var res = false;
      clauses.forEach(element => {
        if (Array.isArray(element) && element.length === 0) {
          res = true
        }
      })
      return res
    }
    return false
  }

  //adds to given array the literals according to Pure-Line-Rule
  function findPure(clauses, pureList) {
    var listLiterals = makeASet(clauses)

    listLiterals.forEach(element =>  {
      var reverseLiteral = element.includes('!') ? element.replace('!', '') : element = "!" + element
      if (!containsLiteral(clauses, reverseLiteral)) {
        pureList.push(element)
      }
    })
  }

  function containsLiteral(clauses, literal) {
    var res = false
    clauses.forEach(elementArray => {
      if (elementArray.includes(literal)) res = true
    })
    return res
  }

  function makeASet(clauses) {
    if (Array.isArray(clauses)) {
      var res = new Set();
      
      clauses.forEach(elementArr => {
        elementArr.forEach(elementIn => res.add(elementIn))
      })

      return res;
    }

    return new Set()
  }

  //returns a sorted array containing only positive literals
  function posLitArray(clauses) {
     return Array.from(makeASet(clauses)).filter(n => !n.includes('!')).sort()
  }
  //returns a sorted array containing only negative literals
  function negLitArray(clauses) {
    return Array.from(makeASet(clauses)).filter(n => n.includes('!')).sort()
  }

  class TreeNode{

    constructor(value){
        this.value = value.map((x) => x)
        this.left = null
        this.right = null
        this.middle = null
    }
  }

  var literal = "a"
  let klauseln = [["a", "b", "c", "d"], ["!a", "c", "d"], ["b", "c", "d"], ["!a", "c"]]

  let testAlph = ["a", "b", "!b", "!a"]
  let hey = new Set(testAlph)

  let testString = "{a, b, c}, {!a, b, c}"
  //console.log(parseClauses(testString))

  testString = "{a}"
  var klauselP = parseClauses(testString)

  //klauseln = [["a"]]

  //console.log(dpll_reduce(klauselP, literal))
  //console.log(klauselP)

  var klauselp2 = [["a", "d"], ["!a", "d"], ["d"], ["!a"]]
  var klauselp3 = [["a", "!d"], ["!a", "d"]]
  //console.log(dpll_reduce(klauselp2, '!a'))

  dpll_apply_step(klauselp3, new TreeNode(klauselp3))