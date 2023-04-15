export type data = {
    chatId: string,
    roomId: string,
    studentId: string,
    name: string
}
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
    fetchData: () => void
}