


export const initialTotal: EmployeeInfo[] = [
    {id: 1, name: "Jone", age: 35, job: "frontend", language: "react", pay: 1},
    {id: 2, name: "Jannie", age: 30, job: "frontend", language: "next", pay: 120},
    {id: 3, name: "Sue", age: 29, job: "backend", language: "react", pay: 130},
    {id: 4, name: "Susan", age: 28, job: "frontend", language: "react", pay: 17},
]

export type Mode = "" | "register" | "upgrade" | "delete" | "reset"

const test = ["Jone", "Sue", "Peter"];

export  const initialEmployeeInfo: EmployeeInfo =
    {id: 1, name: "Jone", age: 35, job: "frontend", language: "react", pay: 1}

interface  ModeItem {
    id: Mode;
    label: string;
}

export type EmployeeInfo = {
    id: number;
    name: string;
    age: number | string;
    job: string;
    language: string;
    pay: number | string;
}
interface EmployeeStateType {
    mode: Mode;
    modes: ModeItem[];
    infos: EmployeeInfo[];
    upInfo: EmployeeInfo;
    selectedId: number;
    handleMode: (mode: Mode) => void;
    handleSelectedId: (id: number) => void;
    handleRegister: (obj: EmployeeInfo) => void;
    handleUpgrade: (obj: EmployeeInfo) => void;
}