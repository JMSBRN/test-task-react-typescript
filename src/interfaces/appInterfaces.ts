export interface Task {
    id: string;
    text: string;
    update: boolean
}
export type TaskFunction = (text: string, id: string) => void; 