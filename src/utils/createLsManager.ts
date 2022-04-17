export const createLsManager = (STORADE_KEY: string) => new class {
    getValue(): string {
        return localStorage.getItem(STORADE_KEY) || '';
    }
    setValue(sessionId: string | number = '') {
        if (sessionId) {
            localStorage.setItem(STORADE_KEY, sessionId.toString());
        } else {
            localStorage.removeItem(STORADE_KEY);
        }
    }
}();

export default createLsManager;
