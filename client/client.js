// relocated client code

 console.log("Hello Client.js here");
  Meteor.subscribe('thePlayers');
  
  Template.leaderboard.helpers({
  
    'player': function(){
      var currentUserId = Meteor.userId();
      return PlayersList.find({}, {sort: {score: -1, name: 1}});
    },
  
    'otherHelperFunction': function(){
      return "Some other function"
    },
  
    'selectedClass' : function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer){
        return 'selected';  
      }
    },

    'showSelectedPlayer' : function(){
        return PlayersList.findOne(Session.get('selectedPlayer'))
    }

  });

    Template.leaderboard.events({
    'click .player' : function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer = Session.get('selectedPlayer');
      console.log("You clicked " + selectedPlayer);
    },
    'mouseover .player' : function(){
      console.log("mouseover on " + this.name)
    },
    'click .increment' : function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call( 'modifyPlayerScore', selectedPlayer, 5 );
    },
    'click .decrement' : function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call( 'modifyPlayerScore', selectedPlayer, -5 );
    },
    'click .remove' : function(){
      Meteor.call('removePlayerData', Session.get('selectedPlayer'));
    }
  });

  Template.addPlayerForm.events({
    'submit form' : function(event){
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      Meteor.call('insertPlayerData', playerNameVar );
      event.target.playerName.value = "";
    }
  });

