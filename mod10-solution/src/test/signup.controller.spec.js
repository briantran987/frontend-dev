(function () {
  "use strict";
  
  describe('SignUpController', function () {
    var $controller, $httpBackend, ApiPath, AccountServiceMock, ctrl;
  
    beforeEach(module('public'));
  
    beforeEach(module(function ($provide) {
      AccountServiceMock = {
        registerUser: jasmine.createSpy('registerUser')
      };
      $provide.value('AccountService', AccountServiceMock);
    }));
  
    beforeEach(inject(function (_$controller_, _$httpBackend_, _ApiPath_) {
      $controller = _$controller_;
      $httpBackend = _$httpBackend_;
      ApiPath = _ApiPath_;
  
      ctrl = $controller('SignUpController', {
        ApiPath: ApiPath,
        AccountService: AccountServiceMock
      });
    }));
  
    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    it('Valid dish test', function () {
      var mockDish = {
        $valid: true,
        $viewValue: 'L1'
      };
  
      var mockResponse = {
        id: 1,
        name: 'Lo Mein',
        short_name: 'L1'
      };
  
      var url = ApiPath + '/menu_items/L/menu_items/1.json';
  
      $httpBackend.expectGET(url).respond(200, mockResponse);
  
      ctrl.checkDish(mockDish);
      $httpBackend.flush();
  
      expect(ctrl.validDish).toBe(true);
      expect(ctrl.user.dishInfo).toEqual(mockResponse);
      expect(AccountServiceMock.registerUser).toHaveBeenCalledWith(ctrl.user);
    });
  
    it('Invalid dish test', function () {
      var mockDish = {
        $valid: true,
        $viewValue: 'Z9'
      };
  
      var url = ApiPath + '/menu_items/Z/menu_items/9.json';
  
      $httpBackend.expectGET(url).respond(200, null);
  
      ctrl.checkDish(mockDish);
      $httpBackend.flush();
  
      expect(ctrl.validDish).toBe(false);
      expect(ctrl.user.dishInfo).toBeUndefined();
      expect(AccountServiceMock.registerUser).not.toHaveBeenCalled();
    });
  
  });
})();
