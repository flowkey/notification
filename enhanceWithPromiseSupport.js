// if a callback is provided then don't resolve but use provided callback
export const enhanceWithPromiseSupport = notification => ({
    confirm: args =>
        new Promise((resolve, reject) => {
            try {
                notification.confirm({ callback: resolve, ...args });
            } catch (e) {
                reject(e);
            }
        }),
    alert: args =>
        new Promise((resolve, reject) => {
            try {
                notification.alert({ callback: resolve, ...args });
            } catch (e) {
                reject(e);
            }
        }),
    close: args => notification.close(args),
});
