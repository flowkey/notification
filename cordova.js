class FlowAlert {
    alert({message, callback, title, buttonLabel}) {
        if (!navigator.notification) throw new Meteor.Error('Cordova Plugin for dialogs is not installed correctly');
        if (!callback) callback = function() {}

        navigator.notification.alert(message, callback, title, buttonLabel);
    }

    confirm({message, callback, title, buttonLabels}) {
        if (!navigator.notification) throw new Meteor.Error('Cordova Plugin for dialogs is not installed correctly');
        if (!_(buttonLabels).isArray()) throw new Meteor.Error('Button Label has to be an array');
        if (!callback) callback = function(buttonIndex) {}

        navigator.notification.confirm(message, callback, title, buttonLabels);
    }
}

export const notification = new FlowAlert();
