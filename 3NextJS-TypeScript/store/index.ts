import AppState from './app-state';
import Topic from './topic-store';

export const createStoreMap = (initialState?: any) => ({
    appState: new AppState().init(initialState ? initialState.appState : undefined),
    topicStore: new Topic(initialState ? initialState.topicStore : undefined),
});
