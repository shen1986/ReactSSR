import AppState from './app-state';
import Topic from './topic';
import User from './user';

export const createStoreMap = (initialState?: any) => ({
    appState: new AppState(initialState ? initialState.appState : undefined),
    topicStore: new Topic(initialState ? initialState.topicStore : undefined),
    userStore: new User(),
});
