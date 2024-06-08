import { APP_CONFIG } from "./init";

const links = [
    "https://www.novah.dev",
    "https://www.novah.dev/tools/nv-deploy",
    "https://github.com/heilernova/nv-deploy-api",
];

export const parseBody = (data: any, statusCode: number): IResponseAPI => {
    return {
        version: APP_CONFIG.version,
        status_code: statusCode,
        data,
        links,
    }
}

export const parseErrorBody = (message: string, detail: any, statusCode: number): IResponseErrorAPI => {
    return {
        version: APP_CONFIG.version,
        status_code: statusCode,
        message,
        detail,
        links
    }
}

export interface IResponseAPI {
    version: string;
    status_code: number;
    data: any;
    links: string[];
}

export interface IResponseErrorAPI {
    version: string;
    status_code: number;
    message: string;
    detail: any;
    links: string[];
}