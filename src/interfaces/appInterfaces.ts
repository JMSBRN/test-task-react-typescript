export interface Task {
    id: string;
    text: string;
    update: boolean
    hidden?: boolean;
}
export type TaskFunction = (text: string, id: string) => void; 