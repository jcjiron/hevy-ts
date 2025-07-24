

export interface ExerciseTemplate {
    id: string;
    title: string;
    type: string;
    primary_muscle_group: string;
    secondary_muscle_groups: string[];
    equipment: string;
    is_custom: boolean;
}

export interface GetExerciseTemplatesResponse {
    page: number;
    page_count: number;
    exercise_templates: ExerciseTemplate[];
}


