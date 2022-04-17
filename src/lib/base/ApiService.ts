
import { makeAutoObservable } from "mobx";

import SessionService from "./SessionService";
import ErrorService, { OfflineError } from "./ErrorService";

import { NF_API_ORIGIN } from "../../config";

import TYPES from "../types";
import { inject } from "react-declarative";

type JSON = Record<string, unknown>;


export class ApiService {

  readonly sessionService = inject<SessionService>(TYPES.sessionService);
  readonly errorService = inject<ErrorService>(TYPES.errorService);

  constructor() {
    makeAutoObservable(this);
  };

  handleSearchParams = <D = JSON>(url: URL, params?: D) => {
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (typeof value === 'object') {
          url.searchParams.set(key, JSON.stringify(value));
        } else if (typeof value === 'number') {
          url.searchParams.set(key, value.toString());
        } else if (typeof value === 'string') {
          url.searchParams.set(key, value.toString());
        } else {
          throw new Error(`Unknown param type ${key}`);
        }
      }
    }
  };
  
  handleJSON = <T = JSON>(data: string): T => {
    try {
      return JSON.parse(data) as T;
    } catch {
      return {} as T;
    }
  };

  
  public request = <T = JSON, D = JSON>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: URL,
    data?: D,
  ) => new Promise<T>(async (res, rej) => {
    try {
      const request = await fetch(url.toString(), {
        method,
        headers: {
          /*...(this.sessionService.sessionId && ({
            'x-token': this.sessionService.sessionId,
          })),
          'x-app-id': '8',
          'x-beta': '1',*/
          'Content-type': 'application/json',
        },
        ...(data && {
          body: JSON.stringify(data),
        }),
      });
      const text = await request.text();
      const json = this.handleJSON<T>(text);
      this.errorService.processStatusCode(request.status);
      if ('error' in json) {
        rej(json);
      } else {
        res(json);
      }
      if (!window.navigator.onLine) {
        throw new OfflineError();
      }
    } catch (e) {
      this.errorService.handleError(e as Error);
      rej(e);
    }
  });


  public get = <T = JSON, D = JSON>(url: URL | string, data?: D): Promise<T> => {
    const targetUrl = typeof url === 'string' ? new URL(url, NF_API_ORIGIN) : url;
    this.handleSearchParams<D>(targetUrl, data);
    return this.request<T>('GET', targetUrl);
  };


  public delete = <T = JSON, D = JSON>(url: URL | string, data?: D): Promise<T> => {
    const targetUrl = typeof url === 'string' ? new URL(url, NF_API_ORIGIN) : url;
    this.handleSearchParams<D>(targetUrl, data);
    return this.request<T, D>('DELETE', targetUrl);
  };


  public post = <T = JSON, D = JSON>(url: URL | string, data?: D): Promise<T> => {
    if (typeof url === 'string') {
      return this.request<T, D>('POST', new URL(url, NF_API_ORIGIN), data);
    }
    return this.request<T, D>('POST', url, data);
  };

  
  public put = <T = JSON, D = JSON>(url: URL | string, data?: D): Promise<T> => {
    if (typeof url === 'string') {
      return this.request<T, D>('PUT', new URL(url, NF_API_ORIGIN), data);
    }
    return this.request<T, D>('PUT', url, data);
  };

 
  public patch = <T = JSON, D = JSON>(url: URL | string, data?: D): Promise<T> => {
    if (typeof url === 'string') {
      return this.request<T, D>('PATCH', new URL(url, NF_API_ORIGIN), data);
    }
    return this.request<T, D>('PATCH', url, data);
  };

  
  public uploadFile = <T = JSON, D = JSON>(url: URL | string, file: File | Blob, data?: D): Promise<T> => new Promise<T>((res) => {
    const formData = new FormData();
    formData.append('file', file);
    data && Object.entries(data).forEach(([k, v]) => {
      formData.append(k, v.toString());
    });
    const xhr = new XMLHttpRequest();
    if (typeof url === 'string') {
      xhr.open('POST', new URL(url, NF_API_ORIGIN).toString(), true);
    } else {
      xhr.open('POST', url.toString(), true);
    }
    // this.sessionService.sessionId && xhr.setRequestHeader('x-token', this.sessionService.sessionId);
    // xhr.setRequestHeader('x-app-id', '8');
    // xhr.setRequestHeader('x-beta', '1');
    xhr.onload = () => {
      try {
        const json = this.handleJSON<T>(xhr.responseText);
        this.errorService.processStatusCode(xhr.status);
        if ('error' in json) {
          throw new Error(JSON.stringify(json));
        }
        res(json);
      } catch (e) {
        this.errorService.handleError(e as Error);
        throw e;
      }
    };
    xhr.send(formData);
  });

};

export default ApiService;
