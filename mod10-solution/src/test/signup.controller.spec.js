(function () {
  "use strict";
  
  describe('SignUpController', function () {
    var $controller, $http, $httpBackend, ApiPath, AccountServiceMock, ctrl;
  
    beforeEach(module('public'));
  
    beforeEach(module(function ($provide) {
      AccountServiceMock = {
        registerUser: jasmine.createSpy('registerUser')
      };
      $provide.value('AccountService', AccountServiceMock);
    }));
  
    beforeEach(inject(function (_$controller_, _$http_, _$httpBackend_, _ApiPath_) {
      $controller = _$controller_;
      $http = _$http_;  // Inject the actual $http service
      $httpBackend = _$httpBackend_;  // Inject $httpBackend for mocking responses
      ApiPath = _ApiPath_;
  
      ctrl = $controller('SignUpController', {
        $http: $http,  // Pass the actual $http service
        ApiPath: ApiPath,
        AccountService: AccountServiceMock
      });
    }));
  
    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    it('should validate dish and register user when dish is valid', function () {
      var mockDish = {
        $valid: true,
        $viewValue: 'L1'
      };
  
      var mockResponse = {
        id: 1,
        name: 'Lo Mein',
        short_name: 'L1'
      };
  
      var category = 'L';
      var num = '1';
      var url = ApiPath + '/menu_items/' + category + '/menu_items/' + num + '.json';
  
      $httpBackend.expectGET(url).respond(200, mockResponse);
  
      ctrl.checkDish(mockDish);
      $httpBackend.flush();
  
      expect(ctrl.validDish).toBe(true);
      expect(ctrl.user.dishInfo).toEqual(mockResponse);
      expect(AccountServiceMock.registerUser).toHaveBeenCalledWith(ctrl.user);
    });
  
    it('should not user when dish is invalid', function () {
      var mockDish = {
        $valid: true,
        $viewValue: 'Z9'
      };
  
      var category = 'Z';
      var num = '9';
      var url = ApiPath + '/menu_items/' + category + '/menu_items/' + num + '.json';
  
      // Simulating 404 error for invalid dish
      $httpBackend.expectGET(url).respond(200, null);
  
      ctrl.checkDish(mockDish);
      $httpBackend.flush();
  
      expect(ctrl.validDish).toBe(false); // Dish should be invalid
      expect(ctrl.user.dishInfo).toBeUndefined(); // No dish info should be assigned
      expect(AccountServiceMock.registerUser).not.toHaveBeenCalled(); // User should not be registered
    });
  
  });
})();
