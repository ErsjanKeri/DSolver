import numpy as np
import sys

class Infix:
    def __init__(self, function):
        self.function = function
    def __ror__(self, other):
        return Infix(lambda x, self=self, other=other: self.function(other, x))
    def __or__(self, other):
        return self.function(other)
    def __rlshift__(self, other):
        return Infix(lambda x, self=self, other=other: self.function(other, x))
    def __rshift__(self, other):
        return self.function(other)
    def __call__(self, value1, value2):
        return self.function(value1, value2)
imp = Infix(lambda a, b: not a or b)
iff = Infix(lambda a, b: (not a or b) and (not b or a))
nand = Infix(lambda a, b: not (a and b))
nor = Infix(lambda a, b: not (a or b))

def createTruthTable(argc):
	a = argc
	index = []
	length = 2 ** a
	b = length / 2
	for i in range(a):
		index.append(b)
		b = b / 2
	res = []
	temp = []
	for i in range(len(index)):
		switch = False
		templength = length
		ind = index[i]
		newarray = []
		while templength != 0:
			newarray.append(1 if switch else 0)
			ind = ind - 1
			if ind == 0:
				ind = index[i]
				switch = not switch
			templength = templength - 1
		res.append(newarray)
	npres = np.array(res).T
	return npres

# Example: expr = "(q or not((q ^ r) and (q <= r))) and s"

# Check Arguments
if (len(sys.argv) != 2):
	sys.exit("Usage: python3 truthTable.ty logical_expression")

# Help/Usage Command
if (sys.argv[1].lower() == "help" or sys.argv[1].lower() == "usage"):
	sys.exit("Usage: python3 truthTable.ty logical_expression\
		\nSupported logical operations: and (\"and\"), or (\"or\"), implies (\"|imp|\"), not (\"not\"), xor (\"^\"), iff (\"|iff|\"), nand (\"|nand|\"), nor (\"|nor|\")\
		\nVariables names can only be one single uncapitalized alphabet!")

# Create Parameters
expr = sys.argv[1]
expr_analysis_arr = expr.replace("(", " ").replace(")", " ").split()
expr_vars = []
for i in expr_analysis_arr:
	if (len(i) == 1 and ord(i) >= 97 and ord(i) <= 122):
		expr_vars.append(i)
expr_vars = list(set(expr_vars))
expr_vars.sort()

# Create Truth Table
npres = createTruthTable(len(expr_vars))

# Calculation
try:
	resarr = []
	for i in range(len(npres)):
		for j in range(len(expr_vars)):
			assign = "False" if npres[i][j] == 1 else "True"
			exec(str(expr_vars[j]) + " = " + assign)
		exec("result = " + expr)
		resarr.append(result)
	npresarr = np.array(resarr)[np.newaxis]
	npresarr = np.flipud(npresarr.T)
	ret = np.hstack([npres, npresarr])
except NameError:
	sys.exit("Usage: python3 truthTable.ty logical_expression\
		\nSupported logical operations: and (\"and\"), or (\"or\"), implies (\"|imp|\"), not (\"not\"), xor (\"^\")\
		\nVariables names can only be one single uncapitalized alphabet!")

# Stringify
output = "\nTruth Table of\n"
output = output + expr.replace("or", "|").replace("and", "&").replace("|imp|", "->").replace("|iff|", "<->").replace("not", "!") + "\n"
covers = "--------" * (len(expr_vars) + 1) + "-\n"
output = output + covers
for i in expr_vars:
	output = output + "|" + i + "\t"
output = output + "|expr\t|\n"
output = output + covers
for i in range(len(ret)):
	output = output + "|"
	for j in range(len(ret[i])):
		output = output + str(ret[i][j]) + "\t|"
	output = output + "\n"
output = output + covers
print(output)