import { enhanceWithPromiseSupport } from "./enhanceWithPromiseSupport";

class FlowAlert {
    alert({ message, callback, title, buttonLabel }) {
        if (!navigator.notification)
            throw new Meteor.Error("Cordova Plugin for dialogs is not installed correctly");
        if (!callback) callback = function() {};

        navigator.notification.alert(message, callback, title, buttonLabel);
    }

    confirm({ message, callback, title, buttonLabels }) {
        if (!navigator.notification)
            throw new Meteor.Error("Cordova Plugin for dialogs is not installed correctly");
        if (!_(buttonLabels).isArray()) throw new Meteor.Error("Button Label has to be an array");
        const wrappedCallback = function(buttonIndex) {
            if (callback) callback(parseInt(buttonIndex));
        };

        navigator.notification.confirm(message, wrappedCallback, title, buttonLabels);
    }
}

export const notification = enhanceWithPromiseSupport(new FlowAlert());
