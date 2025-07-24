// Workout-related interfaces for Hevy API

export interface WorkoutSet {
    type: string;
    weight_kg: number | null;
    reps: number | null;
    distance_meters: number | null;
    duration_seconds: number | null;
    custom_metric: any;
    rpe: number | null;
}

export interface WorkoutExercise {
    exercise_template_id: string;
    superset_id: number | null;
    notes: string;
    sets: WorkoutSet[];
}

export interface CreateWorkoutRequest {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    is_private: boolean;
    exercises: WorkoutExercise[];
}
