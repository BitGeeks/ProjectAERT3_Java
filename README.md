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
### Nhận thông tin người dùng (Authorize)
Method: ```POST```  
```/api/users/:id```  
- Request: [account.service.ts#L49](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L49)
- Response: [UsersController.cs#L122](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L122)
### Cập nhật thông tin người dùng (Authorize)
Method: ```PUT```  
```/api/users/update```  
- Request: [account.service.ts#L69](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L69)
- Response: [UsersController.cs#L128](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L128)
### Toggle Subscription (Authorize)
Method: ```PUT```  
```/api/users/subscription```  
- Request: [account.service.ts#L73](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L73)
- Response: [UsersController.cs#L149](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L149)
### Xóa tài khoản người dùng (Authorize, Option)
Method: ```DELETE```  
```/api/users/delete/:id```  
- Request: ```None```
- Response: [UsersController.cs#L182](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L182)
### Lấy bản ghi (Authorize)
Method: ```GET```  
```/api/users/records/all```  
- Request: [account.service.ts#L57](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L57)
- Response: [UsersController.cs#L190](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L190)
### Đếm bản ghi (Authorize)
Method: ```GET```  
```/api/users/records/count```  
- Request: [account.service.ts#L207](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L207)
- Response: [UsersController.cs#L199](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L199)
### Xác thực email (Authorize)
Method: ```POST```   
```/api/users/register/validate```  
- Request: [account.service.ts#L77](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L77)
- Response: [UsersController.cs#L208](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L208)
### Tạo referral (Authorize)
Method: ```POST```  
```/api/users/referrals/create```
- Request: [account.service.ts#L187](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopApp/src/app/services/account.service.ts#L187)
- Response: [UsersController.cs#L217](https://github.com/lesongvi/ViMinerShop/blob/main/ViMinerShopAPI/ViMinerShopAPI/Controllers/UsersController.cs#L217)
