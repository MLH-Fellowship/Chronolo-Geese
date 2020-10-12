import { database } from 'firebase/app';
import { QueryChange } from 'rxfire/database';
import { ReactFireOptions } from '..';
export declare function useDatabaseObject<T = unknown>(ref: database.Reference, options?: ReactFireOptions<T>): QueryChange | T;
export declare function useDatabaseObjectData<T>(ref: database.Reference, options?: ReactFireOptions<T>): T;
export declare function useDatabaseList<T = {
    [key: string]: unknown;
}>(ref: database.Reference | database.Query, options?: ReactFireOptions<T[]>): QueryChange[] | T[];
export declare function useDatabaseListData<T = {
    [key: string]: unknown;
}>(ref: database.Reference | database.Query, options?: ReactFireOptions<T[]>): T[];
