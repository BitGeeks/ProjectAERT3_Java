import { ProductDetail, ShippingMethod, User, UserPoint, UserRecord } from './../store/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../../config/local';


@Injectable()
export class AccountService {

  publicUrl = `${config.apiUrl}/api/public/account`;
  url = `${config.apiUrl}/api/users`;
  addressUrl = `${config.apiUrl}/api/useraddresses`;
  shippingMUrl = `${config.apiUrl}/api/shippingmethods`;
  recoverUrl = `${config.apiUrl}/api/recover`;
  cDonateUrl = `${config.apiUrl}/api/cdonate`;

  pageSize = 10;

  constructor(private httpClient: HttpClient) {
  }

  createAccount(fname: string, lname: string, email: string, password: string, username: string, refCode: string) {
    return this.httpClient.post(this.url + '/register', {
      firstname: fname,
      lastname: lname,
      email,
      password,
      username,
      refCode
    }, { headers: { 'Content-type': 'application/json; charset=utf-8' } });
  }

  loginAccount(email: string, password: string) {
    return this.httpClient.post(this.url + '/authenticate', {
      email,
      password
    }, { headers: { 'Content-type': 'application/json; charset=utf-8' } });
  }

  loginSocialAccount(email: string, id: string, firstName: string, lastName: string) {
    return this.httpClient.post(this.url + '/socialAuthenticate', {
      email,
      id/*,
      firstName,
      lastName*/
    }, { headers: { 'Content-type': 'application/json; charset=utf-8' } });
  }

  getUser() {
    return this.httpClient.get<User>(this.url);
  }

  resendVerifyCode() {
    return this.httpClient.post<User>(`${this.url}/register/resend`, {});
  }

  getUserRecord(paginate: number) {
    let params = new HttpParams();
    if (paginate !== -1) {
      params = params.set('page', paginate.toString());
      params = params.set('size', this.pageSize.toString());
    }

    return this.httpClient.get<Array<UserRecord>>(`${this.url}/records/all`, {
      params
    });
  }

  updateUser(user) {
    return this.httpClient.put<User>(`${this.url}/update`, user);
  }

  toggleSubscription() {
    return this.httpClient.put<User>(`${this.url}/subscription`, {});
  }

  verifyEmail(verificationToken) {
    return this.httpClient.post(this.url + '/register/validate', {
      token: verificationToken
    });
  }

  forgotPasswordRequest(email) {
    return this.httpClient.post(this.recoverUrl + '/request', {
      email
    });
  }

  forgotPasswordStep1Finish(email, verifyCode) {
    return this.httpClient.post(this.recoverUrl + '/verify', {
      email,
      verifyCode
    });
  }

  forgotPasswordStep2Finish(email, verifyCode, newPassword) {
    return this.httpClient.post(this.recoverUrl + '/change', {
      email,
      verifyCode,
      newPassword
    });
  }

  forgotPasswordConfirm(passwordForgotToken) {
    return this.httpClient.post(this.publicUrl + '/password/forgot/confirm', {
      token: passwordForgotToken
    });
  }

  forgotPasswordReset(passwordForgotToken, newPassword, newPasswordConfirm) {
    return this.httpClient.post(this.publicUrl + '/password/forgot/validate', {
      token: passwordForgotToken,
      newPassword,
      newPasswordConfirm
    });
  }


  resetPassword(oldPassword, newPassword, newPasswordConfirm) {
    return this.httpClient.post(this.url + '/password/reset', {
      oldPassword,
      newPassword,
      newPasswordConfirm
    });
  }

  getVerificationStatus() {
    return this.httpClient.get(this.url + '/status');
  }

  addUserAddress(address, street_name, city, postal_code, country, telephone, mobile) {
    return this.httpClient.post(`${this.addressUrl}/add`, {
      address,
      street_name,
      city,
      postal_code,
      country,
      telephone,
      mobile
    });
  }

  getUserAddressCount() {
    return this.httpClient.get<number>(`${this.addressUrl}/count`);
  }

  updateUserAddress(id, address, street_name, city, postal_code, country, telephone, mobile) {
    return this.httpClient.put(`${this.addressUrl}/update`, {
      id,
      address,
      street_name,
      city,
      postal_code,
      country,
      telephone,
      mobile
    });
  }

  startDonateTransaction(couponId: number, receiverMail: string, couponNumber: number) {
    return this.httpClient.post(`${this.cDonateUrl}/transaction`, {
      couponId,
      receiverMail,
      couponNumber
    });
  }

  removeUserAddress(id) {
    return this.httpClient.delete(`${this.addressUrl}/remove/${id}`);
  }

  setDefaultAddress(id) {
    return this.httpClient.post(`${this.addressUrl}/setdefault`, {
      id
    });
  }

  getShippingMethods() {
    return this.httpClient.get<Array<ShippingMethod>>(`${this.shippingMUrl}/all`);
  }

  getShippingMethodsByFlag(flag: string) {
    return this.httpClient.get<Array<ShippingMethod>>(`${this.shippingMUrl}/flag/${flag}`);
  }

  generateRefCode() {
    return this.httpClient.post(`${this.url}/referrals/create`, {});
  }

  getUserRefList() {
    return this.httpClient.get<Array<User>>(`${this.url}/referrals/all`);
  }

  getUserPoint() {
    return this.httpClient.get<UserPoint>(`${this.url}/stats/point`);
  }

  setProductNotify(productId: number, quantity: number) {
    return this.httpClient.post(`${this.url}/soldoutnotify`, {
      productId,
      quantity
    });
  }

  getPageSize = () => this.pageSize;

  getRecordListCount() {
    return this.httpClient.get<number>(`${this.url}/records/count`, {});
  }
}
