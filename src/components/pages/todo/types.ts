import { TaskData } from '@/stores/types';

export type AddEditTaskPayload = { task?: TaskData; taskData: TaskData };

export type SetTaskStatusPayload = { checkedStatus: boolean; task: TaskData };
