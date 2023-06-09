import { create, all } from "mathjs";

const math = create(all);

type Bound = {
  xLower: number,
  xUpper: number,
  yLower: number,
  yUpper: number,
  zLower: number,
  zUpper: number
}

type Variable = 'x' | 'y' | 'z';

export type ResolveResult = {
  steps: string[];
  result: string;
  func: string;
  lowerUpperBond: Bound;
  createdAt: Date,
  id: string
}

function splitOperations(expression: string) {
  let result = [];
  let level = 0;
  let current = '';

  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];

    if (char === '(') {
      level++;
    } else if (char === ')') {
      level--;
    }

    if ((char === '+' || char === '-') && level === 0) {
      result.push(current.trim());
      current = '';
    }

    current += char;
  }

  result.push(current.trim());

  return result;
}

// Filter substitutions
const filterSubstitutions = (arr: string[]) => {
  return arr.map((exp) => {
    // Cek jika ada nilai dengan pola n1 * (a + b)
    const regexSubstitution1 = /(\d+\*)\(([xyz0-9]+)([+-])([xyz0-9]+)\)(\^\(\d+\))?(\/\(\d+\))?/gi;
    exp = exp
      .replaceAll(/\s+/gi, '')
      .replaceAll(regexSubstitution1, '$1$2$5$6$3$1$4$5$6');

    return exp;
  })
}

// Menghitung integral satu
const calculateIntegral = (
  operations: string,
  lower: number,
  upper: number,
  variable: Variable,
  lowerUpperBond: Bound
  ) => 
{
  const { xLower, xUpper, yLower, yUpper, zLower, zUpper } = lowerUpperBond;
  const saveStep: string[] = [];
  const dxdydzSymbols = variable === 'x' ? 'dydz' : variable === 'y' ? 'dz' : '';
  let operationsArray = splitOperations(operations);
  // save step
  saveStep.push(`--> d${variable} = $\\int_{${lower}}^{${upper}}${math.simplify(operationsArray.join('')).toTex()}$ ${dxdydzSymbols}`);

  // Pengecekan kembali untuk beberapa pola variabel yang kompleks
  operationsArray = filterSubstitutions(operationsArray);

  const substitution = (typeBound: number) => {
    return operationsArray.map((exp) => {
      let includesVariableNotUsed: boolean = true;
      
      switch (variable) {
        case 'x':
          includesVariableNotUsed = exp.includes('y') || exp.includes('z');
          break;
        case 'y':
          includesVariableNotUsed = exp.includes('x') || exp.includes('z');
          break;
        case 'z':
        default:
          includesVariableNotUsed = exp.includes('x') || exp.includes('y');
          break;
      }
  
      if (!includesVariableNotUsed) {
        const func = math.parse(exp);
        let simplified = math
          .simplify(func)
          .evaluate({ [variable]: typeBound })
          .toString();

        if (!/^(\-)(?=\d+)/.test(simplified)) {
          simplified = `+${simplified}`;
        }
        
        return `${simplified}`;
      }
  
      return `${exp.replaceAll(variable, `${typeBound}`)}`;
    })
    .join('')
    .replace(/^00$/gi, '0');
  }

  // save step
  saveStep.push('b. Hitung hasil integral:')
  saveStep.push(`--> d${variable} = $\\int_{${lower}}^{${upper}}$ batas atas - batas bawah ${dxdydzSymbols}`); 
  const lowerBoundLatex = `\\left[${math.parse(operationsArray.join('')).toTex()}\\right]`;
  const upperBoundLatex = `\\int_{${lower}}^{${upper}} \\left[${math.parse(operationsArray.join('')).toTex()}\\right]`;
  saveStep.push(`--> d${variable} = $${upperBoundLatex} - ${lowerBoundLatex} $ ${dxdydzSymbols}`);
  saveStep.push('c. Substitusikan:')
  saveStep.push(`--> d${variable} = $${upperBoundLatex.replaceAll(variable, `${upper}`)} - ${lowerBoundLatex.replaceAll(variable, `${lower}`)} $ ${dxdydzSymbols}`);
  
  const upperSubs = substitution(upper);
  const lowerSubs = substitution(lower);
  const countIntegral = math.simplify(`(${upperSubs})-(${lowerSubs})`);
  
  // untuk menentukan simbol integral di depan
  let integralSymbol = '';
  switch(variable) {
    case 'x':
      integralSymbol = `\\int_{${zLower}}^{${zUpper}}\\int_{${yLower}}^{${yUpper}}`;
      break;
    case 'y':
      integralSymbol = `\\int_{${zLower}}^{${zUpper}}`;
      break;
    case 'z':
    default:
      integralSymbol = '';
      break;
  }

  // Pengecekan kembali untuk beberapa pola variabel yang kompleks
  const filterResult = filterSubstitutions(splitOperations(countIntegral.toString().replaceAll(/\s+/gi, ''))).join('');

  // save step
  saveStep.push(`--> = $${integralSymbol}${math.parse(filterResult).toTex()}$ ${dxdydzSymbols}`);
  saveStep.push('------------------------------');

  return {
    steps: saveStep,
    result: filterResult
  };
}

const calculateNestedIntegral = (operations: string, variable: string): string => {
  operations = operations.replace(/^\(/gi, '').replace(/\)$/gi, '');
  let expressions = splitOperations(operations);

  expressions = expressions.map((exp, index) => {
    const regex = new RegExp(`([^\^])${variable}|${variable}(?=[^\^])|^${variable}`, 'gi');
    if (regex.test(exp)) {
      let simplified = math.simplify(exp);
      const regexSquare = /(\^[^()]+)$|(\^\(.+\))$/gm;
      
      // Ambil nilai pangkat terakhir
      let squareArray = simplified
        .toString()
        .replaceAll(/\s+/gi, '')
        .match(regexSquare);

      // Jika ada pangkat
      if (squareArray) {
        let square = squareArray[0];
        const [newSquare, backExpression] = `${square.replace(/^\^\(?([0-9xyz]+)\)?(.*)$/gi, '$1delimiter$2')}`.split('delimiter');
        square = newSquare;
        let integralResult = simplified.toString().replaceAll(regexSquare, '');

        if (!/[xyz]/gi.test(square)) {
          square = math.simplify(`(${square}+1)`).toString();
        }

        integralResult = `${integralResult}^${square}/${square}`;
        return integralResult;
      }

      return `${simplified.toString()}^(2)/(2)`;
    }

    return exp.concat(`*${variable}`);
  });

  return `(${expressions.join('')})`;
}

export const calculateTripleIntegral = (func: string, lowerUpperBond: Bound) => {
  return new Promise((resolve, reject) => {
    let stepArray: string[] = [];
    const { xLower, xUpper, yLower, yUpper, zLower, zUpper } = lowerUpperBond;
    let expressions = splitOperations(func);
    
    ['x', 'y', 'z'].forEach((variable, index) => {
      const dxdydzSymbols = variable === 'x' ? 'dxdydz' : variable === 'y' ? 'dydz' : 'dz';
      // untuk menentukan simbol integral di depan
      let integralSymbol = '';
      switch(variable) {
        case 'x':
          integralSymbol = `\\int_{${zLower}}^{${zUpper}}\\int_{${yLower}}^{${yUpper}}\\int_{${xLower}}^{${xUpper}}`;
          break;
        case 'y':
          integralSymbol = `\\int_{${zLower}}^{${zUpper}}\\int_{${yLower}}^{${yUpper}}`;
          break;
        case 'z':
        default:
          integralSymbol = `\\int_{${zLower}}^{${zUpper}}`;
          break;
      }

      // save step
      stepArray.push(`Langkah ${index + 1}:`);
      stepArray.push(`$${integralSymbol}${math.parse(expressions.join('')).toTex()}$ ${dxdydzSymbols}`);
      stepArray.push(`a. Integralkan fungsi dari d${variable}`);
      let stepThree: string[] = [];

      expressions = expressions.map((exp, index) => {
        const regex = new RegExp(`([^\^])${variable}|${variable}(?=[^\^])|^${variable}`, 'gi');
        if (regex.test(exp)) {
          let simplified = math.simplify(exp);
          const regexSquare = /(\^[^()]+)$|(\^\(.+\))$/gm;
          
          // Ambil nilai pangkat terakhir
          let squareArray = simplified
            .toString()
            .replaceAll(/\s+/gi, '')
            .match(regexSquare);
    
          // Jika ada pangkat
          if (squareArray) {
            let square = squareArray[0];
            const [newSquare, backExpression] = `${square.replace(/^\^\(?([0-9xyz]+)\)?(.*)$/gi, '$1delimiter$2')}`.split('delimiter');
            square = newSquare;
            let integralResult = simplified.toString().replaceAll(regexSquare, '');
            let isMinusInFront = /^\-/gi.test(integralResult);
          
            // save step three
            stepThree.push(`${isMinusInFront ? '-' : ''}\\frac{${integralResult.replace(/^\-/gi, '')}^{${square} + 1}${backExpression}}{${square}+1}`);

            if (!/[xyz]/gi.test(square)) {
              square = math.simplify(`(${square}+1)`).toString();
            }

            integralResult = `${integralResult}^${square}/${square}`;
            return integralResult;
          }

          let expRemoveSpace: string = simplified.toString().replaceAll(/\s+/gi, '');
          const integrateInBracketsRegex = /(?!\^)\([xyz0-9+\-*]+\)/gi;
          const nestedIntegral = expRemoveSpace.match(integrateInBracketsRegex);

          // Jika ada kurung
          if (nestedIntegral) {
            const result = nestedIntegral.map((exp) => calculateNestedIntegral(exp, variable));
            let countIndex = 0;

            expRemoveSpace =  expRemoveSpace.split(integrateInBracketsRegex).map((exp) => {
              if (exp === '') {
                countIndex += 1;
                return result[countIndex - 1];
              }

              return exp;
            })
            .filter((exp) => exp !== undefined)
            .join('');

          } else expRemoveSpace = '';

          if (expRemoveSpace !== '') {
            // Save step
            stepThree.push(math.parse(`${expRemoveSpace}`).toTex());
            return expRemoveSpace;
          }

          expRemoveSpace = simplified.toString().replaceAll(/\s+/gi, '');

          // Jika ada operasi dengan perkalian variable tanpa pangkat
          const regexVariable = new RegExp(`${variable}`, 'gi');
          if (regexVariable.test(expRemoveSpace)) {
            const variableMatch = expRemoveSpace.match(regexVariable);
            if (variableMatch) {
              expRemoveSpace = expRemoveSpace.replace(regexVariable, `${variableMatch}^2/2`);

              // save step
              stepThree.push(math.parse(`${expRemoveSpace}`).toTex());
              return `${expRemoveSpace}`;
            }
          }

          // save step three
          stepThree.push(`\\frac{${simplified.toTex()}^2}{2}`);
          return `${simplified.toString()}^(2)/(2)`;
        }
    
        // save step three
        stepThree.push(exp.concat(`*${variable}`));
        return exp.concat(`*${variable}`);
      });

      // combine step three
      stepArray.push(`--> $${integralSymbol}${stepThree.join('')}$ ${dxdydzSymbols}`);
      stepThree = [''];

      let lowerBound = xLower;
      let upperBound = xUpper;

      switch (variable) {
        case 'y':
          lowerBound = yLower;
          upperBound = yUpper;
          break;
        case 'z':
          lowerBound = zLower;
          upperBound = zUpper;
          break;
        case 'x':
        default:
          lowerBound = xLower;
          upperBound = xUpper;
          break;
      }

      const { steps, result } = calculateIntegral(expressions.join(''), lowerBound, upperBound, variable as Variable, lowerUpperBond);

      // save steps
      stepArray = [...stepArray, ...steps];
      expressions = splitOperations(result);
    });

    const expressionToLatex = math.parse(expressions.join('')).toTex();

    // save step
    const symbolIntegrals = `\\int_{${zLower}}^{${zUpper}}\\int_{${yLower}}^{${yUpper}}\\int_{${xLower}}^{${xUpper}}`;
    stepArray.push(`Jadi,`);
    stepArray.push(`$${symbolIntegrals} ${math.parse(func).toTex()} = ${expressionToLatex}$`);
    stepArray.unshift(`$${symbolIntegrals} ${math.parse(func).toTex()} = ${expressionToLatex}$`);
    stepArray.unshift(`Penyelesaian:`);

    const resolveResult: ResolveResult = {
      steps: stepArray,
      result: expressionToLatex,
      func: math.parse(func).toString(),
      lowerUpperBond,
      createdAt: new Date(),
      id: crypto.randomUUID()
    }

    setTimeout(() => { 
      resolve(resolveResult);
    }, 3000);
  });
};

export const convertSemiLatexToAlgebra = (operations: string): string => {
  operations = operations.trim().replaceAll(/\s+/gi, '');
  const sqrt = /sqrt\{(.+)\}/gi;
  const includesSqrt = operations.match(sqrt);
  if (includesSqrt !== null) {
    operations = operations.replace(sqrt, '$1^(1/2)');
  }

  return operations
    .replaceAll('{', '(')
    .replaceAll('}', ')')
    .replaceAll('.', '*')
    .replaceAll(/([xyz]+)\(/gi, '$1*(')
    .replaceAll(/\)([xyz]+)/gi, ')*$1')
    .replaceAll(/([xyz])((?=[xyz]))+/gi, '$1*$2')
    .replaceAll(/\^(\d+)/gi, '^($1)');
}

export function countSameChar(string: string, char: string) {
  const regex = new RegExp(`[^${char}]`, 'gi');
  
  return string.replace(regex, '').length;
}

export function isValidFormGenerate(string: string): string {
  const regexStackRoundBruckets = /^(?!.*\(\))(?=.*\(.+\))?.*$/gi;
  const regexStackCurlyBruckets = /^(?!.*\{\})(?=.*\{.+\})?.*$/gi;
  const regexAToZ = /^(x|y|z|sqrt\{.\}|\{\d+\}|[0-9+\-*/^(.){}\s]+)+$/gi;

  string = string.trim().replaceAll(/\s+/gi, '');

  if (!string) return 'Input tidak boleh kosong.';
  if (!regexAToZ.test(string)) return 'Variabel huruf hanya boleh x, y, z dan sqrt{n}';
  if (string.includes('sqrt')) {
    if (!/sqrt\{x|y|z|\d+\}/gi.test(string)) {
      return 'Sqrt yang anda masukan hanya boleh satu variabel x/y/z atau angka';
    }
  }
  if (countSameChar(string, '(') !== countSameChar(string, ')'))
    return 'Salah satu pasangan tanda kurung kurang.';
  if (countSameChar(string, '{') !== countSameChar(string, '}'))
    return 'Salah satu pasangan tanda kurung kurawal kurang.';
  if (!regexStackRoundBruckets.test(string)) return 'Tidak boleh ada tumpukan tanda kurung kosong';
  if (!regexStackCurlyBruckets.test(string)) return 'Tidak boleh ada tumpukan tanda kurung kurawal kosong';

  return 'ok';
}

export function convertOperationsToLatex(string: string): string {
  string = string
    .replaceAll(/sqrt\{(.)\}/gi, '\\sqrt[]{$1}')
    .replaceAll(/\./gi, ' \\cdot ');
  return `$${string}$`;
}

export function formatDate(date: Date): string {
  const formattedDate = new Intl
    .DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric'
    })
    .format(date);

  return formattedDate;
}