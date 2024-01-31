import { Inject, Injectable } from '@angular/core';
import { ApiHttpService } from '../api-http/api-http.service';
import { CRUD_RESOURCE_URL } from './crud-resource-url';
import { Observable } from 'rxjs';

@Injectable()
export class CRUDService {
  constructor(
    protected apiHttp: ApiHttpService,
    @Inject(CRUD_RESOURCE_URL) protected crudResourceUrl: string
  ) {}

  create(data: any) {
    console.log(data);

    // id: uuidv4() - WE DO NOT NEED THIS BECAUSE JSON SERVER IS DOING IT BY DEFAULT
    return this.apiHttp.post(this.crudResourceUrl, data);
  }

  read<TResponse>() {
    return this.apiHttp.get(this.crudResourceUrl) as Observable<TResponse[]>;
  }

  readById<TResponse>(id: number | string) {
    return this.apiHttp.get(
      `${this.crudResourceUrl}/${id}`
    ) as Observable<TResponse>;
  }

  update(id: number | string, data: any) {
    return this.apiHttp.put(`${this.crudResourceUrl}/${id}`, data);
  }

  delete<T>(id: number | string) {
    return this.apiHttp.delete<T>(`${this.crudResourceUrl}/${id}`);
  }
}
