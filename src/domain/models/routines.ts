// Routine-related interfaces for Hevy API
//
// A "routine" is a reusable workout template (what you build in the Hevy
// app and start a session from), distinct from a "routine folder" (a
// container that groups routines) and from a "workout" (a logged session).

export interface RoutineSetRepRange {
    start: number | null;
    end: number | null;
}

export interface RoutineSet {
    index: number;
    type: string;
    weight_kg: number | null;
    reps: number | null;
    rep_range: RoutineSetRepRange | null;
    distance_meters: number | null;
    duration_seconds: number | null;
    rpe: number | null;
    custom_metric: number | null;
}

export interface RoutineExercise {
    index: number;
    title: string;
    rest_seconds: number | null;
    notes: string;
    exercise_template_id: string;
    // Exercises sharing the same non-null supersets_id are performed back
    // to back as a superset; null means the exercise stands on its own.
    supersets_id: number | null;
    sets: RoutineSet[];
}

export interface Routine {
    id: string;
    title: string;
    folder_id: number | null;
    updated_at: string;
    created_at: string;
    exercises: RoutineExercise[];
}

export interface GetRoutinesResponse {
    page: number;
    page_count: number;
    routines: Routine[];
}

export interface GetRoutineByIdResponse {
    routine: Routine;
}

export interface RoutineSetRequest {
    type: string;
    weight_kg?: number | null;
    reps?: number | null;
    rep_range?: RoutineSetRepRange | null;
    distance_meters?: number | null;
    duration_seconds?: number | null;
    rpe?: number | null;
    custom_metric?: number | null;
}

export interface RoutineExerciseRequest {
    exercise_template_id: string;
    // Note: the request body field is "superset_id" (no plural "s"),
    // while the API's own Routine/response shape returns "supersets_id"
    // for the same concept — this mismatch is in Hevy's API, not here.
    superset_id?: number | null;
    rest_seconds?: number | null;
    notes?: string | null;
    sets: RoutineSetRequest[];
}

export interface CreateRoutineRequest {
    title: string;
    folder_id?: number | null;
    notes?: string;
    exercises: RoutineExerciseRequest[];
}

export interface UpdateRoutineRequest {
    title: string;
    notes?: string | null;
    exercises: RoutineExerciseRequest[];
}
