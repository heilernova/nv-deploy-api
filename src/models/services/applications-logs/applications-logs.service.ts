import { ConnectionDbService } from '@app/common/connection-db';
import { OmitBy } from '@app/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationsLogsService {
    constructor(
        private readonly _db: ConnectionDbService
    ){}

    async register(appId: string, data: IApplicationLogCreate): Promise<IApplicationLog> {
        return (await this._db.insert('apps_log', data, '*')).rows[0];
    }

    async getAll(filter?: { userId?: string, appId?: string }): Promise<IApplicationLog[]> {
        let params: any[] | undefined = [];
        let conditions: string[] = [];
        let sql: string = 'select * from users';

        if (filter?.appId) conditions.push(`app_id = $${filter.appId}`);
        if (filter?.userId) conditions.push(`user_id = $${filter.userId}`);

        if (conditions.length > 0){
            sql += ' where ' + conditions.join(' and ');
        } else {
            params = undefined;
        }

        return (await this._db.query(sql, params)).rows;
    }
}

export type AppLogType = 'error' | 'update' | 'reload' | 'reset' | 'deploy' | 'stop' | 'start';
export interface IApplicationLog {
    id: string;
    create_at: Date;
    app_id: string;
    user_id: string;
    type: AppLogType;
    detail: string;
    data: { [key: string]: any } | null
}

export interface IApplicationLogCreate extends OmitBy<IApplicationLog, 'id' | 'create_at'> {}
