import { HevyClient } from '../src/domain/usecases/HevyClient';
import { CreateWorkoutRequest } from '../src/domain/models/Workout';
import { HttpClient } from '../src/datasource/HttpClient.interface';

describe('HevyClient', () => {
    let mockHttpClient: jest.Mocked<HttpClient>;
    let client: HevyClient;

    beforeEach(() => {
        mockHttpClient = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        };
        client = new HevyClient(mockHttpClient);
    });

    it('should get workouts', async () => {
        const mockResponse = { page: 1, page_count: 1, workouts: [] };
        mockHttpClient.get.mockResolvedValueOnce(mockResponse);
        const result = await client.getWorkouts();
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            '/workouts',
            expect.objectContaining({ params: { page: 1, pageSize: 5 }, headers: expect.any(Object) })
        );
    });

    it('should handle API error', async () => {
        const error = { isAxiosError: true, response: { status: 500, data: 'error' } };
        mockHttpClient.get.mockRejectedValueOnce(error);
        await expect(client.getWorkouts()).rejects.toThrow('API Error: 500 - "error"');
    });

    it('should create a workout', async () => {
        const workout: CreateWorkoutRequest = {
            title: 'Test',
            description: 'desc',
            start_time: '2025-07-23T00:00:00Z',
            end_time: '2025-07-23T01:00:00Z',
            is_private: false,
            exercises: [],
        };
        const mockResponse = { id: '123', ...workout };
        mockHttpClient.post.mockResolvedValueOnce(mockResponse);
        const result = await client.createWorkout(workout);
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.post).toHaveBeenCalledWith(
            '/workouts',
            { workout },
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should get workout by id', async () => {
        const mockResponse = { id: 'abc', title: 'Workout' };
        mockHttpClient.get.mockResolvedValueOnce(mockResponse);
        const result = await client.getWorkoutById('abc');
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            '/workouts/abc',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should get workout events', async () => {
        const mockResponse = { events: [] };
        mockHttpClient.get.mockResolvedValueOnce(mockResponse);
        const result = await client.getWorkoutEvents(2, 10, '2025-01-01T00:00:00Z');
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            '/workouts/events',
            expect.objectContaining({ params: { page: 2, pageSize: 10, since: '2025-01-01T00:00:00Z' }, headers: expect.any(Object) })
        );
    });

    it('should get workout count', async () => {
        const mockResponse = { workout_count: 42 };
        mockHttpClient.get.mockResolvedValueOnce(mockResponse);
        const result = await client.getWorkoutCount();
        expect(result).toBe(42);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            '/workouts/count',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should update a workout', async () => {
        const workout: CreateWorkoutRequest = {
            title: 'Updated',
            description: 'desc',
            start_time: '2025-07-23T00:00:00Z',
            end_time: '2025-07-23T01:00:00Z',
            is_private: false,
            exercises: [],
        };
        const mockResponse = { id: 'abc', ...workout };
        mockHttpClient.put.mockResolvedValueOnce(mockResponse);
        const result = await client.updateWorkout('abc', workout);
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.put).toHaveBeenCalledWith(
            '/workouts/abc',
            { workout },
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    // Routine Folders
    it('should get routine folder by id', async () => {
        const mockResponse = { id: 1, title: 'Folder' };
        mockHttpClient.get.mockResolvedValueOnce(mockResponse);
        const result = await client.getRoutineFolderById(1);
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            '/routine_folders/1',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should create a routine folder', async () => {
        const folder = { title: 'New Folder' };
        const mockResponse = { routine_folder: { id: 2, title: 'New Folder' } };
        mockHttpClient.post.mockResolvedValueOnce(mockResponse);
        const result = await client.createRoutineFolder(folder);
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.post).toHaveBeenCalledWith(
            '/routine_folders',
            { routine_folder: folder },
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should get routine folders', async () => {
        const mockResponse = { page: 1, page_count: 1, routine_folders: [] };
        mockHttpClient.get.mockResolvedValueOnce(mockResponse);
        const result = await client.getRoutineFolders(1, 5);
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            '/routine_folders',
            expect.objectContaining({ params: { page: 1, pageSize: 5 }, headers: expect.any(Object) })
        );
    });

    // Exercise Templates
    it('should get exercise template by id', async () => {
        const mockResponse = { id: 'et1', title: 'Bench Press' };
        mockHttpClient.get.mockResolvedValueOnce(mockResponse);
        const result = await client.getExerciseTemplateById('et1');
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            '/exercise_templates/et1',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should get exercise templates', async () => {
        const mockResponse = { page: 1, page_count: 1, exercise_templates: [] };
        mockHttpClient.get.mockResolvedValueOnce(mockResponse);
        const result = await client.getExerciseTemplates(1, 5);
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            '/exercise_templates',
            expect.objectContaining({ params: { page: 1, pageSize: 5 }, headers: expect.any(Object) })
        );
    });

    // Webhook
    it('should get webhook subscription', async () => {
        const mockResponse = { url: 'https://webhook.site' };
        mockHttpClient.get.mockResolvedValueOnce(mockResponse);
        const result = await client.getWebhookSubscription();
        expect(result).toEqual(mockResponse);
        expect(mockHttpClient.get).toHaveBeenCalledWith(
            '/webhook-subscription',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should return null if webhook subscription not found', async () => {
        const error = { isAxiosError: true, response: { status: 404, data: 'not found' } };
        mockHttpClient.get.mockRejectedValueOnce(error);
        const result = await client.getWebhookSubscription();
        expect(result).toBeNull();
    });

    it('should delete webhook subscription', async () => {
        mockHttpClient.delete.mockResolvedValueOnce(undefined);
        await client.deleteWebhookSubscription();
        expect(mockHttpClient.delete).toHaveBeenCalledWith(
            '/webhook-subscription',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should create webhook subscription', async () => {
        const data = { authToken: 'token', url: 'https://webhook.site' };
        mockHttpClient.post.mockResolvedValueOnce(undefined);
        await client.createWebhookSubscription(data);
        expect(mockHttpClient.post).toHaveBeenCalledWith(
            '/webhook-subscription',
            data,
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });
});
