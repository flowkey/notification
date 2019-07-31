// put this in extra file to make this independent of cordova/browser implementations

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
