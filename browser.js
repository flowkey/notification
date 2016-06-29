import { CallbackList } from 'meteor/flowkey:callback-list';
import { Blaze } from 'meteor/blaze';

import './flow-notification.html';

class Notification{
	constructor(){
		this.running = false;
		this.callbacks = new CallbackList();
	}

	alert({message, callback, title = 'Alert', buttonLabel = 'Ok'}){
		if (!this.running){
			this.callback = callback;
			this.view = Blaze.renderWithData(Template.__FlowAlert, {title, message, buttonLabel}, document.body);
			this.running = true;
		}else{
			// delay other alerts till running one is closed
			this.callbacks.add(()=>{
				this.alert.apply(this, arguments);
			})
		}
	}


	confirm({message, callback, title = 'Confirm', buttonLabels = ['Ok', 'Cancel']}) {
		if (!_(buttonLabels).isArray()) throw new Meteor.Error('Button Label has to be an array');
		if (!this.running){
			this.callback = callback;
			this.view = Blaze.renderWithData(Template.__FlowAlert, {title, message, buttonLabels}, document.body);
			this.running = true;
		}else{
			// delay other alerts till running one is closed
			this.callbacks.add(()=>{
				this.confirm.apply(this, arguments);
			})
		}
	}

	close(callbackArgs = 0){
		if(this.view) Blaze.remove(this.view);
		if(this.callback) this.callback(callbackArgs);
		this.running = false;
		this.callbacks.run();
		this.callbacks.clear();
	}
}

export const notification = new Notification();


Template.__FlowAlert.events({
	'click .flow-alert-button': function () {
		notification.close(1);
	},
	'click .flow-confirm-button': function (e) {
		var buttonIndex = $(e.currentTarget).attr('data-index');
		notification.close(buttonIndex);
	}
});

Template.__FlowAlert.onRendered(function(){
	var $buttons = this.$('.flow-confirm-button');
	if($buttons.length > 1 && $buttons.first().width() > 200 ){
		this.$('.flow-alert-buttons').addClass('wrapped');
	}

})

Template.__FlowAlert.helpers({
	buttonLabelsIndexed: function () {
		var buttonLabels = Template.currentData().buttonLabels;
		if(buttonLabels){
			// to align with native API this is not zero indexed
			return _.map(buttonLabels, (text, index) => {return {text, index: index + 1}})
		}
	}
});