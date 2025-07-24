export interface CreateRoutineFolderRequest {
    title: string;
}

export interface CreateRoutineFolderResponse {
    routine_folder: RoutineFolder;
}

export interface RoutineFolder {
    id: number;
    index: number;
    title: string;
    updated_at: string;
    created_at: string;
}

export interface GetRoutineFoldersResponse {
    page: number;
    page_count: number;
    routine_folders: RoutineFolder[];
}
