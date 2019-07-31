// if a callback is provided then don't resolve but use provided callback
export const enhanceWithPromiseSupport = notification => ({
    confirm: args =>
        new Promise(resolve => {
            notification.confirm({ callback: resolve, ...args });
        }),
    alert: args =>
        new Promise(resolve => {
            notification.alert({ callback: resolve, ...args });
        }),
    close: args => notification.close(args),
});
