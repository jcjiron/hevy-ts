import axios, { AxiosInstance } from 'axios';
import { HttpClient } from '../datasource/HttpClient.interface';

export class AxiosHttpClient implements HttpClient {
    private client: AxiosInstance;
    private apiKey: string;
    private baseURL: string;

    constructor(apiKey: string, baseURL: string = 'https://api.hevyapp.com/v1') {
        this.apiKey = apiKey;
        this.baseURL = baseURL;
        this.client = axios.create({ baseURL });
    }

    private withApiKey(config: any = {}): any {
        return {
            ...config,
            headers: {
                ...(config.headers || {}),
                'api-key': this.apiKey,
            },
        };
    }

    async get<T>(url: string, config?: any): Promise<T> {
        const response = await this.client.get<T>(url, this.withApiKey(config));
        return response.data;
    }

    async post<T>(url: string, data: any, config?: any): Promise<T> {
        const response = await this.client.post<T>(url, data, this.withApiKey(config));
        return response.data;
    }

    async put<T>(url: string, data: any, config?: any): Promise<T> {
        const response = await this.client.put<T>(url, data, this.withApiKey(config));
        return response.data;
    }

    async delete<T>(url: string, config?: any): Promise<T> {
        const response = await this.client.delete<T>(url, this.withApiKey(config));
        return response.data;
    }
}
