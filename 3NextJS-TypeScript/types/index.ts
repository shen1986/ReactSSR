/**
 * @description: 用户接口
 */
export interface IUser {
    isLogin: boolean;
    info: any;
    detail: {
        syncing: boolean;
        recent_topics: any[];
        recent_replies: any[];
    };
    collections: {
        syncing: boolean,
        list: any[],
    };
}
