import AppState from './app-state';

export {
    AppState,
};

export const createStoreMap = () => ({
    appState: new AppState(),
    // topicStore: new TopicStore(),
    // userStore: new UserStore(),
});
