export default interface ErrorInterface {
    status: number;
    apiPath: string;
    message?: string;
    timestamp: string;
}