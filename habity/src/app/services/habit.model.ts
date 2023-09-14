export interface Habit {
    id: string;
    done: boolean;

    displayName?: string;
    points?: number;
    active?: boolean;
    doneDates?: string[];
    historyPoints?: any;


}