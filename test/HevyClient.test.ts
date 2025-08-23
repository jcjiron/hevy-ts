import { HevyClient } from '../src/domain/usecases/HevyClient';
import { CreateWorkoutRequest } from '../src/domain/models/Workout';
import { HttpClient } from '../src/datasource/HttpClient.interface';

describe('HevyClient', () => {
    let client: HevyClient;

    beforeEach(() => {
        client = new HevyClient("api key");
    });

    it('should get workouts', async () => {
        const mockResponse = { page: 1, page_count: 1, workouts: [] };
        const getSpy = jest.spyOn(client['httpClient'], 'get').mockResolvedValueOnce(mockResponse);
        const result = await client.getWorkouts();
        expect(result).toEqual(mockResponse);
        expect(getSpy).toHaveBeenCalledWith(
            '/workouts',
            expect.objectContaining({ params: { page: 1, pageSize: 5 }, headers: expect.any(Object) })
        );
    });

    it('should handle API error', async () => {
        const error = { isAxiosError: true, response: { status: 500, data: 'error' } };
        jest.spyOn(client['httpClient'], 'get').mockRejectedValueOnce(error);
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
        const postSpy = jest.spyOn(client['httpClient'], 'post').mockResolvedValueOnce(mockResponse);
        const result = await client.createWorkout(workout);
        expect(result).toEqual(mockResponse);
        expect(postSpy).toHaveBeenCalledWith(
            '/workouts',
            { workout },
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should get workout by id', async () => {
        const mockResponse = { id: 'abc', title: 'Workout' };
        const getSpy = jest.spyOn(client['httpClient'], 'get').mockResolvedValueOnce(mockResponse);
        const result = await client.getWorkoutById('abc');
        expect(result).toEqual(mockResponse);
        expect(getSpy).toHaveBeenCalledWith(
            '/workouts/abc',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should get workout events', async () => {
        const mockResponse = { events: [] };
        const getSpy = jest.spyOn(client['httpClient'], 'get').mockResolvedValueOnce(mockResponse);
        const result = await client.getWorkoutEvents(2, 10, '2025-01-01T00:00:00Z');
        expect(result).toEqual(mockResponse);
        expect(getSpy).toHaveBeenCalledWith(
            '/workouts/events',
            expect.objectContaining({ params: { page: 2, pageSize: 10, since: '2025-01-01T00:00:00Z' }, headers: expect.any(Object) })
        );
    });

    it('should get workout count', async () => {
        const mockResponse = { workout_count: 42 };
        const getSpy = jest.spyOn(client['httpClient'], 'get').mockResolvedValueOnce(mockResponse);
        const result = await client.getWorkoutCount();
        expect(result).toBe(42);
        expect(getSpy).toHaveBeenCalledWith(
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
        const putSpy = jest.spyOn(client['httpClient'], 'put').mockResolvedValueOnce(mockResponse);
        const result = await client.updateWorkout('abc', workout);
        expect(result).toEqual(mockResponse);
        expect(putSpy).toHaveBeenCalledWith(
            '/workouts/abc',
            { workout },
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    // Routine Folders
    it('should get routine folder by id', async () => {
        const mockResponse = { id: 1, title: 'Folder' };
        const getSpy = jest.spyOn(client['httpClient'], 'get').mockResolvedValueOnce(mockResponse);
        const result = await client.getRoutineFolderById(1);
        expect(result).toEqual(mockResponse);
        expect(getSpy).toHaveBeenCalledWith(
            '/routine_folders/1',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should create a routine folder', async () => {
        const folder = { title: 'New Folder' };
        const mockResponse = { routine_folder: { id: 2, title: 'New Folder' } };
        const postSpy = jest.spyOn(client['httpClient'], 'post').mockResolvedValueOnce(mockResponse);
        const result = await client.createRoutineFolder(folder);
        expect(result).toEqual(mockResponse);
        expect(postSpy).toHaveBeenCalledWith(
            '/routine_folders',
            { routine_folder: folder },
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should get routine folders', async () => {
        const mockResponse = { page: 1, page_count: 1, routine_folders: [] };
        const getSpy = jest.spyOn(client['httpClient'], 'get').mockResolvedValueOnce(mockResponse);
        const result = await client.getRoutineFolders(1, 5);
        expect(result).toEqual(mockResponse);
        expect(getSpy).toHaveBeenCalledWith(
            '/routine_folders',
            expect.objectContaining({ params: { page: 1, pageSize: 5 }, headers: expect.any(Object) })
        );
    });

    // Exercise Templates
    it('should get exercise template by id', async () => {
        const mockResponse = { id: 'et1', title: 'Bench Press' };
        const getSpy = jest.spyOn(client['httpClient'], 'get').mockResolvedValueOnce(mockResponse);
        const result = await client.getExerciseTemplateById('et1');
        expect(result).toEqual(mockResponse);
        expect(getSpy).toHaveBeenCalledWith(
            '/exercise_templates/et1',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should get exercise templates', async () => {
        const mockResponse = { page: 1, page_count: 1, exercise_templates: [] };
        const getSpy = jest.spyOn(client['httpClient'], 'get').mockResolvedValueOnce(mockResponse);
        const result = await client.getExerciseTemplates(1, 5);
        expect(result).toEqual(mockResponse);
        expect(getSpy).toHaveBeenCalledWith(
            '/exercise_templates',
            expect.objectContaining({ params: { page: 1, pageSize: 5 }, headers: expect.any(Object) })
        );
    });

    // Webhook
    it('should get webhook subscription', async () => {
        const mockResponse = { url: 'https://webhook.site' };
        const getSpy = jest.spyOn(client['httpClient'], 'get').mockResolvedValueOnce(mockResponse);
        const result = await client.getWebhookSubscription();
        expect(result).toEqual(mockResponse);
        expect(getSpy).toHaveBeenCalledWith(
            '/webhook-subscription',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should return null if webhook subscription not found', async () => {
        const error = { isAxiosError: true, response: { status: 404, data: 'not found' } };
        jest.spyOn(client['httpClient'], 'get').mockRejectedValueOnce(error);
        const result = await client.getWebhookSubscription();
        expect(result).toBeNull();
    });

    it('should delete webhook subscription', async () => {
        const deleteSpy = jest.spyOn(client['httpClient'], 'delete').mockResolvedValueOnce(undefined);
        await client.deleteWebhookSubscription();
        expect(deleteSpy).toHaveBeenCalledWith(
            '/webhook-subscription',
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });

    it('should create webhook subscription', async () => {
        const data = { authToken: 'token', url: 'https://webhook.site' };
        const postSpy = jest.spyOn(client['httpClient'], 'post').mockResolvedValueOnce(undefined);
        await client.createWebhookSubscription(data);
        expect(postSpy).toHaveBeenCalledWith(
            '/webhook-subscription',
            data,
            expect.objectContaining({ headers: expect.any(Object) })
        );
    });
});
