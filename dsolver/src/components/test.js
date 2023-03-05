function DPLL() {
    let listOfSteps = [] 

  }


  function dpll_apply (list, klauseln) {

  }

  function dpll_apply_step(klauseln) {
     //error codes
    var letter

    if (!Array.isArray(klauseln)) return -1

    //success codes
    if (klauseln.length == 0) return 1

   
    if (!Array.isArray(klauseln[0])) return -3
    
    //check for OLR Rule
    let klauselnMitOne = []
    klauseln.forEach(element => addIfOne(klauselnMitOne, element)) //add klauseln with only one literal

    //if there is, determine the one with highest priority 
    if (klauselnMitOne.length != 0) {
        letter = determineLiteraryFirst(klauselnMitOne)
        return dpll_reduce(klauseln, letter)
    }

    //check for PLR Rule


    //apply dpll literary 

  }


  //adds to the given array the klausel with only one literal
  function addIfOne(arr, klausel) {
    if (klausel.length == 1) {
        arr.push(klausel)
    }
  }

  function determineLiteraryFirst(klauseln) {
    if (Array.isArray(klauseln)) {
        klauseln.sort()
        return klauseln[0]
    }
    return "-1";
  }

  function dpll_reduce(klauseln, literal) {
    //clear the ones that contains this literal
    for (let index = 0; index < klauseln.length; index++) {
        if (Array.isArray(klauseln[index]) && klauseln[index].includes(literal)) {
            klauseln.splice(index--, 1)
        }
    }
    //clear opposite literals in the rest

    literal = literal.includes('!') ? literal.replace('!', '') : literal = "!" + literal
    
    klauseln.forEach(element => {
      var index = element.indexOf(literal)
      if (index != -1) element.splice(index, 1)
    })

    return klauseln
  }


  //check if the step contains an empty klausel, if so return --> not satisfiable
  function contains_empty(klauseln) {
    
  }

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

  var literal = "!a"
  let klauseln = [["a", "b", "c", "d"], ["!a", "c", "d"], ["b", "c", "d"], ["!a", "c"]]

  let testAlph = ["a", "b", "!b", "!a"]
  let hey = new Set(testAlph)

  let testString = "{a, b, c}, {!a, b, c}"
  console.log(parseClauses(testString))

  //console.log(dpll_reduce(klauseln, literal))