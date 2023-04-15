export type data = {
    chatId: string,
    roomId: string,
    studentId: string,
    name: string
}
/////////////////////////
export type std = {
    name:  string,
    studentId:  string ,
    chatId: string,
    roomId: string
}
export type data2 = {
    name:  string, required: true ,
    phone:  number,
    students: std[],
    address:  string, 
    password:  string,
    token:  string ,
}
////////////////////////////
export const data_sample = {
    chatId: '',
    roomId: '',
    studentId: '',
    name: ''
}
export interface int_context {
    pending: data[],
    completed: data[],
    newuser: data[],
    state: boolean,
    setData: (arg0: data2) => void
}