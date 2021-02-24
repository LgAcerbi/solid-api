export interface User {
    id: string,
    name: string,
    age: number,
    nickname: string,
    position: string
}

export enum Positions{
    TOPLANER = 'TOPLANER',
    JUNGLER = 'JUNGLER',
    MIDLANER = 'MIDLANER',
    ADCARRY = 'ADCARRY',
    SUPPORT = 'SUPPORT'
}