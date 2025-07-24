import { CreateWebhookRequest } from '../models/webhook';
import {
    ExerciseTemplate,
    GetExerciseTemplatesResponse
} from '../models/exerciseTemplates';
import {
    RoutineFolder,
    CreateRoutineFolderRequest,
    CreateRoutineFolderResponse,
    GetRoutineFoldersResponse
} from '../models/routineFolders';
import { HttpClient } from '../../datasource/HttpClient.interface';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error('API_KEY is not set in the .env file');
}

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

export class HevyClient {
    // Webhook
    async getWebhookSubscription(): Promise<any | null> {
        try {
            const response = await this.httpClient.get(`/webhook-subscription`, {
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                },
            });
            return response.data ?? response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                if (error.response.status === 404) {
                    return null;
                }
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    async deleteWebhookSubscription(): Promise<void> {
        try {
            await this.httpClient.delete(`/webhook-subscription`, {
                headers: {
                    'accept': '*/*',
                    'api-key': API_KEY,
                },
            });
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    async createWebhookSubscription(data: CreateWebhookRequest): Promise<void> {
        try {
            await this.httpClient.post(
                `/webhook-subscription`,
                data,
                {
                    headers: {
                        'accept': '*/*',
                        'api-key': API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }
    // Exercise Templates
    async getExerciseTemplateById(exerciseTemplateId: string): Promise<ExerciseTemplate> {
        try {
            const response = await this.httpClient.get(`/exercise_templates/${exerciseTemplateId}`, {
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                },
            });
            return response.data ?? response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    async getExerciseTemplates(page = 1, pageSize = 5): Promise<GetExerciseTemplatesResponse> {
        try {
            const response = await this.httpClient.get(`/exercise_templates`, {
                params: { page, pageSize },
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                },
            });
            return response.data ?? response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }
    // Routine Folders
    async getRoutineFolderById(folderId: number): Promise<RoutineFolder> {
        try {
            const response = await this.httpClient.get(`/routine_folders/${folderId}`, {
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                },
            });
            return response.data ?? response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    async createRoutineFolder(folder: CreateRoutineFolderRequest): Promise<CreateRoutineFolderResponse> {
        try {
            const response = await this.httpClient.post(
                `/routine_folders`,
                { routine_folder: folder },
                {
                    headers: {
                        'accept': 'application/json',
                        'api-key': API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data ?? response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    async getRoutineFolders(page = 1, pageSize = 5): Promise<GetRoutineFoldersResponse> {
        try {
            const response = await this.httpClient.get(`/routine_folders`, {
                params: { page, pageSize },
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                },
            });
            return response.data ?? response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }
    private httpClient: HttpClient;
    private baseUrl: string;

    constructor(httpClient: HttpClient, baseUrl: string = 'https://api.hevyapp.com/v1') {
        this.httpClient = httpClient;
        this.baseUrl = baseUrl;
    }

    async updateWorkout(workoutId: string, workout: CreateWorkoutRequest): Promise<any> {
        try {
            const response = await this.httpClient.put(
                `/workouts/${workoutId}`,
                { workout },
                {
                    headers: {
                        'accept': 'application/json',
                        'api-key': API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    async getWorkoutById(workoutId: string): Promise<any> {
        try {
            const response = await this.httpClient.get(`/workouts/${workoutId}`, {
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                },
            });
            return response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    async getWorkoutEvents(page = 1, pageSize = 5, since = '1970-01-01T00:00:00Z'): Promise<any> {
        try {
            const response = await this.httpClient.get(`/workouts/events`, {
                params: { page, pageSize, since },
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                },
            });
            return response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    async getWorkoutCount(): Promise<number> {
        try {
            const response = await this.httpClient.get(`/workouts/count`, {
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                },
            });
            return response.workout_count;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    async getWorkouts(page = 1, pageSize = 5): Promise<any> {
        try {
            const response = await this.httpClient.get(`/workouts`, {
                params: { page, pageSize },
                headers: {
                    'accept': 'application/json',
                    'api-key': API_KEY,
                },
            });
            return response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    async createWorkout(workout: CreateWorkoutRequest) {
        try {
            const response = await this.httpClient.post(
                `/workouts`,
                { workout },
                {
                    headers: {
                        'accept': 'application/json',
                        'api-key': API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response;
        } catch (error: any) {
            if (error.isAxiosError && error.response) {
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }
}
