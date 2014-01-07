clients = new Meteor.Collection("clients");
projects = new Meteor.Collection("projects");

//Clients Selector
if(Meteor.isClient){
    Template.clientList.client = function(){
        return clients.find({});
    }
    
    //On Change & On Load Set Session Var
    Meteor.startup(function(){
       $("#clientSelect").change(function(){
          Session.set("selectedClientId",$("#clientSelect").val());
       });
       
        Session.set("selectedClientId",$("#clientSelect").val()); 
    });
    
    Template.clientOpt.rendered = function(){
        Session.set("selectedClientId",$("#clientSelect").val());
    }
}


//Clients Insertion
if(Meteor.isClient){
    Template.addClient.events({
        'click .add':function(event){
            var formdata = {};
            $("#addClientForm").find(".formdata").each(function(){
                var fieldtype = $(this).attr('data-field');
                formdata[fieldtype] = $(this).val();
                $(this).val("");
                
            });
            clients.insert(formdata);
        }
    });
}


//Clients Remover
if(Meteor.isClient){
    Template.removeClient.cliname = function(){
        var thisclient = clients.findOne(Session.get("selectedClientId"));
        if(typeof thisclient != "undefined"){
            return thisclient.name;
        }
    }
    Template.removeClient.events({
       'click .remove':function(){
           var clientId = Session.get("selectedClientId");
           clients.remove(clientId);
            $.each(projects.find({clientId:clientId}).fetch(),function(){
                projects.remove(this._id);
            })
       } 
    });
}

//Projects Selector
if(Meteor.isClient){
    Template.projectList.project = function(){
        var clientId = Session.get("selectedClientId");
        return projects.find({clientId:clientId});
    }
    Template.projOpt.rendered = function(){
        Session.set("selectedProjectId", $("#projectSelect").val());
    }
    Meteor.startup(function(){
        $("#projectSelect").change(function(){
            Session.set("selectedProjectId", $("#projectSelect").val()); 
        });
    });
}


//Projects Insertion
if(Meteor.isClient){
    Template.addProject.events({
        'click .add':function(){
            var clientId = $("#clientSelect").val();
            projects.insert({clientId:clientId,name:$("#addProjectForm .formdata").val()});
        }
    })
}













