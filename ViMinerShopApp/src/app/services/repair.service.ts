import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/local';
import { Repair, repairItemT, RepairOrder, RepairSite } from '../store/model';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  browsePageSize = 20;
  searchPageSize = 10;

  repairUrl = `${config.apiUrl}/api/repairs`;
  repairOrderUrl = `${config.apiUrl}/api/repairorder`;

  constructor(private httpClient: HttpClient) { }

  getRepairList(page: number) {
    if (page === undefined && page === null && page < 0) {
      return;
    }
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.browsePageSize.toString());

    return this.httpClient.get<Object[]>(`${this.repairUrl}/all`,
      {
        params
      });
  }

  getRepairOrderByType(page: number, type: number) {
    if (page === undefined && page === null && page < 0) {
      return;
    }
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.browsePageSize.toString());
    params = params.set('type', type.toString());

    return this.httpClient.get<Array<RepairOrder>>(`${this.repairOrderUrl}/all`,
    {
      params
    });
  }

  searchByTxt(page: number, type: number, txtSearch: string) {
    if (page === undefined && page === null && page < 0) {
      return;
    }
    let params = new HttpParams();
    params = params.set('type', type.toString());
    params = params.set('page', page.toString());
    params = params.set('size', this.browsePageSize.toString());

    return this.httpClient.get<Object[]>(`${this.repairUrl}/search/${txtSearch}`,
      {
        params
      });

  }

  getRepairListByTab(page: number, type: number) {
    if (page === undefined && page === null && page < 0) {
      return;
    }
    let params = new HttpParams();
    params = params.set('type', type.toString());
    params = params.set('page', page.toString());
    params = params.set('size', this.browsePageSize.toString());

    return this.httpClient.get<Object[]>(`${this.repairUrl}/type`,
      {
        params
      });
  }

  getRepairSite() {
    return this.httpClient.get<Array<RepairSite>>(`${this.repairUrl}/site/all`);
  }

  getRepairTicket(id: number) {
    return this.httpClient.get<Repair>(`${this.repairUrl}/ticket/${id}`);
  }

  cancelRepairTicket(id: number) {
    return this.httpClient.delete(`${this.repairUrl}/remove/${id}`);
  }

  submitRepairTicket(reasonFlag: string, listItem: Array<repairItemT>, shippingId: number, userAddress: string, repairSiteCode: string, returnShippingId: number, remark: string, trackingNo: string) {
    return this.httpClient.post(`${this.repairUrl}/submitTicket`, {
      reasonFlag,
      listItem,
      shippingId,
      userAddress,
      repairSiteCode,
      returnShippingId,
      remark,
      trackingNo
    });
  }

  updateRepairTicket(id: number, reasonFlag: string, listItem: Array<repairItemT>, shippingId: number, userAddress: string, repairSiteCode: string, returnShippingId: number, remark: string, trackingNo: string) {
    return this.httpClient.post(`${this.repairUrl}/updateTicket/${id}`, {
      id,
      reasonFlag,
      listItem,
      shippingId,
      userAddress,
      repairSiteCode,
      returnShippingId,
      remark,
      trackingNo
    });
  }

  getRepairOrderCount(type: number) {
    return this.httpClient.get<number>(`${this.repairUrl}/count/${type}`);
  }

  getRepairOrdersCount(type: number) {
    return this.httpClient.get<number>(`${this.repairOrderUrl}/count/${type}`);
  }

  getPageSize() {
    return this.searchPageSize;
  }

  onRepairPaypalOrderSuccess(idPayment: string, status: string, payerMail: string, payerId: string, repairOrderId: number) {
    return this.httpClient.post(`${this.repairOrderUrl}/onPaymentPaypal`, {
      repairOrderId,
      idPayment,
      status,
      payerMail,
      payerId
    });
  }
}
