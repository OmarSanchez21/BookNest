import clc from 'cli-color';

export function logSuccess(message: string): void {
    console.log(clc.green(`SUCCESS: ${message}`));
}

export function logError(message: string): void {
    console.log(clc.red(`ERROR: ${message}`));
}

export function logWarning(message: string): void {
    console.log(clc.yellow(`WARNING: ${message}`));
}

export function logInfo(message: string): void {
    console.log(clc.cyan(`INFO: ${message}`));
}
