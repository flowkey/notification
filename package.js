Package.describe({
    name: 'flowkey:notification',
    version: '0.1.1',

    // Brief, one-line summary of the package.
    summary: 'Simple Alert Messages for Cordova and Web',

    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Cordova.depends({
    'org.apache.cordova.dialogs': '0.3.0'
});

Package.onUse(function(api) {
    api.versionsFrom('1.3');
    api.use(['ecmascript', 'templating', 'less']);

    api.use(['flowkey:callback-list@1.1.1', 'blaze'], 'web.browser');

    api.addFiles('flow-notification.less', 'web.browser');

    api.mainModule('browser.js', 'web.browser');
    api.mainModule('cordova.js', 'web.cordova');
});

