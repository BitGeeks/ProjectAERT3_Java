## Endpoints
### Đăng ký
Method: ```POST```  
```/api/users/register```  
- Request: [account.service.ts#L22](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L22)
- Response: [UsersController.cs#L166](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L166)
### Đăng nhập
Method: ```POST```  
```/api/users/authenticate```  
- Request: [account.service.ts#L33](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L33)
- Response: [UsersController.cs#L40](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L40)
### Nhận thông tin người dùng
Method: ```POST```  
```/api/users/:id```  
- Request: [account.service.ts#L49](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L49)
- Response: [UsersController.cs#L122](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L122)
### Cập nhật thông tin người dùng
Method: ```PUT```  
```/api/users/update```  
- Request: [account.service.ts#L69](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L69)
- Response: [UsersController.cs#L128](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L128)
### Toggle Subscription
Method: ```PUT```  
```/api/users/subscription```  
- Request: [account.service.ts#L73](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L73)
- Response: [UsersController.cs#L149](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L149)
