MyApp = Ember.Application.create({

  first: null,
  last: null,

  fullname: function() {
    var f = this.get('first');
    var l = this.get('last');
    
    if (f && l) {
      return '%@ %@'.fmt(this.get('first'), this.get('last'));
    } else {
      return null;
    }
      
  }.property('first', 'last')
  

});