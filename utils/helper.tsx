import { create, all } from "mathjs";

const math = create(all);

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

type Bound = {
  xLower: number,
  xUpper: number,
  yLower: number,
  yUpper: number,
  zLower: number,
  zUpper: number
}

type Variable = 'x' | 'y' | 'z';

// Menghitung integral satu
const calculateIntegral = (
  operations: string,
  lower: number,
  upper: number,
  variable: Variable
  ) => 
{
  const operationsArray = splitOperations(operations);
  console.log(variable);
  console.log(operationsArray);

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
        const simplified = math
          .simplify(func)
          .evaluate({ [variable]: typeBound })
          .toString();
        return `${simplified}`;
      }
  
      return `${exp.replaceAll(variable, `${typeBound}`)}`;
    });
  }

  const upperSubs = substitution(upper).join('');
  console.log('Batas atas: ', upperSubs);
  const lowerSubs = substitution(lower).join('');
  console.log('Batas bawah', lowerSubs);

  const countIntegral = `(${upperSubs})-(${lowerSubs})`;
  console.log('count integral: ', countIntegral);
  return math.simplify(countIntegral).toString().replaceAll(/\s+/gi, '');
}

export const calculateTripleIntegral = (func: string, lowerUpperBond: Bound, partitions: number) => {
  const { xLower, xUpper, yLower, yUpper, zLower, zUpper } = lowerUpperBond;
  let expressions = splitOperations(func);
  
  ['x', 'y'].forEach((variable) => {
    expressions = expressions.map((exp) => {
      
      const regex = new RegExp(`([^\^])${variable}|${variable}(?=[^\^])|^${variable}`, 'gi');
      if (regex.test(exp)) {
        let simplified = math.simplify(exp);
        const regex = /(\^[^()])$|(\^\(.+\))$/gm;
        
        // Ambil nilai pangkat terakhir
        let squareArray = simplified
          .toString()
          .replaceAll(/\s+/gi, '')
          .match(regex);

        const constants = simplified.toString();
        console.log(expressions);
  
        // Jika ada pangkat
        if (squareArray) {
          let square = squareArray[0];
          square = square.slice(1);
          let integralResult = exp.replace(regex, '');
          integralResult = `(${integralResult})^(${square}+1)/(${square}+1)`;
  
          return integralResult;
        }

        return `${simplified.toString()}^(2)/2`;
      }
  
      return exp.concat(`*${variable}`);
    });

    let lowerBound = xLower;
    let upperBound = xUpper;

    switch (variable) {
      case 'y':
        lowerBound = yLower;
        upperBound = xUpper;
        break;
      case 'z':
        lowerBound = zLower;
        upperBound = zUpper;
      case 'x':
      default:
        lowerBound = xLower;
        upperBound = xUpper;
        break;
    }

    expressions = splitOperations(
      calculateIntegral(expressions.join(''), lowerBound, upperBound, variable as Variable)
    );
  });

  console.log('Hasilnya: ', Number(expressions[0]).toFixed(2));
};

export const convertSemiLatexToAlgebra = (operations: string): string => {
  operations = operations.trim().replaceAll(/\s+/gi, '');
  const sqrt = /sqrt\{(.+)\}/gi;
  const includesSqrt = operations.match(sqrt);
  if (includesSqrt) {
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
  if (countSameChar(string, '(') !== countSameChar(string, ')')) return 'Salah satu pasangan tanda kurung kurang.';
  if (countSameChar(string, '{') !== countSameChar(string, '}')) return 'Salah satu pasangan tanda kurung kurawal kurang.';
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