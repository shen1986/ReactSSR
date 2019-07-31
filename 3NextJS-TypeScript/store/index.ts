import AppState from './app-state';
import Topic from './topic';

export const createStoreMap = (initialState?: any) => ({
    appState: new AppState(initialState ? initialState.appState : undefined),
    topicStore: new Topic(initialState ? initialState.appState : undefined),
});
