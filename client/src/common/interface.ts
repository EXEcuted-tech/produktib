export interface TaskProps {
    task_id: number;
    category_id: number;
    title: string;
    description:string;
    task_status: string;
    time_stamp: string;
}
/*Ty pwede rani nimo gamiton ^^*/

export interface TaskCardProps {
    task_id: number;
    category_id: number;
    title: string;
    description:string;
    task_status: string;
    time_stamp: string;
    isActive: boolean;
    handleOptionsClick: (taskId: number) => void;
    setShowView: React.Dispatch<React.SetStateAction<boolean>>
    setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
    setShowDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export interface CatCardProps {
    category_id: number;
    category_name: string;
    color:string;
}

export interface SidebarProps {
    setChosenID: React.Dispatch<React.SetStateAction<string | null>>;
}