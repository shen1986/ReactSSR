import AppState from './app-state';

export const createStoreMap = (initialState?: any) => ({
    appState: new AppState(initialState ? initialState.appState : undefined),
});
