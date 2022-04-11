import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../../config/local';
import { ProductDetail, ProductCategory, Algorithm } from '../store/model';
import { HTTP_OPTIONS } from '../configs/header.config';

@Injectable()
export class ProductService {

  publicUrl = `${config.apiUrl}/api/products`;
  categoryUrl = `${config.apiUrl}/api/products/category`;
  pCategoryUrl = `${config.apiUrl}/api/productcategories`;
  algorithmUrl = `${config.apiUrl}/api/algorithms`;
  mmWAApi = `https://cors.bridged.cc/https://maxmines.com/api/v1`; // temporary bypass

  browsePageSize = 20;
  searchPageSize = 10;

  constructor(private httpClient: HttpClient) {
  }

  getProducts(page: number, sort: string, category: string, algorithm: string, minPrice: string, maxPrice: string, minHashrate: string, maxHashrate: string, searchString: string) {
    if (page === undefined && page === null && page < 0) {
      return;
    }
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.browsePageSize.toString());
    if (sort !== undefined && sort !== null && sort !== 'any') {
      params = params.set('sort', sort);
    }

    if (category && category !== 'any') {
      params = params.set('category', category);
    }

    if (algorithm && algorithm !== 'any') {
      params = params.set('algorithm', algorithm);
    }

    if (minPrice && minPrice !== '0') {
      params = params.set('minPrice', minPrice);
    }

    if (maxPrice && maxPrice !== '0') {
      params = params.set('maxPrice', maxPrice);
    }

    if (minHashrate && minHashrate !== '0') {
      params = params.set('minHashrate', minHashrate);
    }

    if (maxHashrate && maxHashrate !== '0') {
      params = params.set('maxHashrate', maxHashrate);
    }

    if (searchString && searchString !== '') {
      params = params.set('searchString', searchString);
    }

    return this.httpClient.get<Array<ProductDetail>>(`${this.publicUrl}/all`,
      {
        params
      });
  }

  getProductsCount(category: string, algorithm: string, minPrice: string, maxPrice: string, minHashrate: string, maxHashrate: string, searchString: string) {
    let params = new HttpParams();
    if (category && category !== 'any') {
      params = params.set('category', category);
    }

    if (algorithm && algorithm !== 'any') {
      params = params.set('algorithm', algorithm);
    }

    if (minPrice && minPrice !== '0') {
      params = params.set('minPrice', minPrice);
    }

    if (maxPrice && maxPrice !== '0') {
      params = params.set('maxPrice', maxPrice);
    }

    if (minHashrate && minHashrate !== '0') {
      params = params.set('minHashrate', minHashrate);
    }

    if (maxHashrate && maxHashrate !== '0') {
      params = params.set('maxHashrate', maxHashrate);
    }

    if (searchString && searchString !== '') {
      params = params.set('searchString', searchString);
    }

    return this.httpClient.get<number>(`${this.publicUrl}/count`,
      {
        params
      });
  }

  getFullProduct(productUrl: string) {
    return this.httpClient.get<ProductDetail>(`${this.publicUrl}/miner/${productUrl}`);
  }

  getRelatedProducts(productUrl: string) {
    return this.httpClient.get<Array<ProductDetail>>(`${this.publicUrl}/related/${productUrl}`);
  }

  getNewMiner() {
    return this.httpClient.get<Array<ProductDetail>>(this.publicUrl + '/newminer');
  }

  getBestMiner() {
    return this.httpClient.get<Array<ProductDetail>>(this.publicUrl + '/bestminer');
  }

  getInterested() {
    return this.httpClient.get<Array<ProductDetail>>(this.publicUrl + '/interested');
  }

  searchProduct(page: number, keyword: string) {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('keyword', keyword);
    params = params.set('size', this.searchPageSize.toString());
    return this.httpClient.get<Array<ProductDetail>>(this.publicUrl + '/search', {
      params
    });
  }

  getCategory() {
    return this.httpClient.get<Array<ProductCategory>>(`${this.pCategoryUrl}/all`);
  }

  getAlgorithm() {
    return this.httpClient.get<Array<Algorithm>>(`${this.algorithmUrl}/all`);
  }

  getExchangeRate() {
    return this.httpClient.get<any>(`${this.mmWAApi}/exchange/rates`, HTTP_OPTIONS);
  }

}
