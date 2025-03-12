import { v4 as uuidv4 } from 'uuid';

export function generateRandomData(): string {
    return 'TestID:' + uuidv4();
}

export function getCurrentDateTime(): string {
    const date = new Date();
    return `${date.getFullYear()}
    -${date.getMonth() + 1}-
    ${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

}

export function generateStringWithLenght(length: number, baseString?: string): string {
    let newString = baseString ?? '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = newString.length; i < length; i++) {
        newString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return newString;
}