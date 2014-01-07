tasks = new Meteor.Collection("tasks");
if(Meteor.isClient){
    Template.taskform.events({
        'click .submit':function(){
            var selectedProjectId = $("#projectSelect").val();
            tasks.insert({projectId:selectedProjectId,name:$($("#taskentry .tformdata")[0]).val()});
        }
    })

    Template.tasklist.tasks = function(){
        var projectId = Session.get("selectedProjectId");
        return tasks.find({projectId:projectId});
    }
    Template.task.rendered = function(){
        var taskdata = this;
        
        $(this.firstNode).find('.editable').editable({
            type: 'textarea',
            title: 'Enter username',
            mode:   'inline',
            success: function(response, newValue) {
                var field = $(this).attr('data-field');
                var value = newValue;
                var update = {};
                update[field] = value;
                tasks.update({_id:taskdata.data._id}, {$set:update});
            }
        });
       $(this.firstNode).find('.editable').css({'display':'inline'});
    }
}