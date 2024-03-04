import { TaskData } from '@/stores/types';

export type AddEditTaskPayload = { task?: TaskData; taskData: TaskData };

export type SetTaskStatusPayload = { checkedStatus: boolean; task: TaskData };

export enum SortTypesValues {
    COMPLETED = 'сначала выполненные',
    INORDER = 'в порядке добавления',
    UNFULFILLED = 'сначала не выполненные',
}
