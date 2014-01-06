tasks = new Meteor.Collection("tasks");
if(Meteor.isClient){
    Template.taskform.events({
        'click .submit':function(){
            var selectedProjectId = $("#projectSelect").val();
            tasks.insert({selectedProjectId:selectedProjectId,name:$("#taskform .tformdata").val()});
        }
    })

    Template.tasklist.tasks = function(){
        var projectId = Session.get("selectedProjectId");
        return tasks.find({projectId:projectId});
    }
}