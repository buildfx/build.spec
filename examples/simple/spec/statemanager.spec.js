describe('statemanager', function() {

  it('starts with the "home" state', function() {
    var stateName = MyApp.getPath('statemanager.currentState.name');
    expect(stateName).toEqual('.home');
  });


});