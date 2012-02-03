describe('core', function() {

  describe('MyApp', function() {
    beforeEach(function() {
      MyApp.set('first', null);
      MyApp.set('last', null);
    });
    
    it('has a "fullname" property that depends on the "first" and "last" properties', function() {
      expect(MyApp.get('fullname')).toBeFalsy();
      MyApp.set('first', 'Joubert');
      MyApp.set('last', 'Nel');

      expect(MyApp.get('fullname')).toBe('Joubert Nel');
    });
  });  

});