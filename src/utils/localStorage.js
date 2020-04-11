export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('hfh:reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('hfh:reduxState', serializedState);
    } catch (error) {
        // ignore errors so app won't crash
    }
}