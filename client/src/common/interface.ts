export interface TaskCardProps {
    task_id: number;
    category_id: number;
    title: string;
    description:string;
    task_status: string;
    time_stamp: string;
}

export interface CatCardProps {
    category_id: number;
    category_name: string;
    color:string;
}

export interface SidebarProps {
    setChosenID: React.Dispatch<React.SetStateAction<string>>;
}