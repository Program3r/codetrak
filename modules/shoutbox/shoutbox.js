shouts = new Meteor.Collection("shouts");
if (Meteor.isClient) {
    Template.shoutentry.events({
        'click .submit': function(event) {
            var sformdata = {};
            sformdata["name"] = Meteor.user().username;
            $("#shoutform").find(".sformdata").each(function() {
                var fieldtype = $(this).attr('data-field');
                sformdata[fieldtype] = $(this).val();
            });
            shouts.insert(sformdata);
            $("#message").val("");
        }
    })
    Template.shoutboard.shouts=function(){
        return shouts.find({});
    }
    Template.shoutboard.events({
        'click .remove': function() {shouts.remove (this._id)}
    })
}