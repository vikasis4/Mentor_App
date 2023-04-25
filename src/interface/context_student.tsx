export type datas = {
    chatId: string,
    roomId: string,
    studentId: string,
    name: string
    status: string
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
    name: '',
    status:''
}
export interface int_context {
    pending: datas[],
    completed: datas[],
    newuser: datas[],
    state: boolean,
    setData: (arg0: data2) => void
}