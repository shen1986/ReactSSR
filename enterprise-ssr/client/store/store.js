import AppStateClass from './app-state';


export const AppState = AppStateClass;


export default {
    AppState,
};

export const createStoreMap = () => {
    const result = {
        appState: new AppState(),
    };
    return result;
};
