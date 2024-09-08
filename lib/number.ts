export const lowerCase = "abcdefghijklmnopqrstuvwxyz";
export const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const numbers = "0123456789";
export const specials = "&é(§è!çà)-_°@#ù%`£$^¨€¥?./+,;:=<>";

export interface CodeGeneratorOptions {
  length?: number;
  lowerCase?: boolean;
  upperCase?: boolean;
  numbers?: boolean;
  specials?: boolean;
}

export function generateCode(options: CodeGeneratorOptions): string {
  const _options = stringifyOptions(options);
  let code = "";
  for (let i = 0; i < (options.length ?? 6); i++) code += _options[Math.floor(Math.random() * _options.length)];
  return code;
}

function stringifyOptions(options: CodeGeneratorOptions): string {
  return `${options.lowerCase ? lowerCase : ""}${options.upperCase ? upperCase : ""}${options.numbers ? numbers : ""}${options.specials ? specials : ""}`;
}
