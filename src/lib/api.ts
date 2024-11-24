import { API_SERVER } from "@/types/url";

export type Response<T> = {
  data?: T,
  status: boolean
};

const ApiFetchPost = (url: string, json: Object) => {
  return fetch(API_SERVER + url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(json),
  });
};

const ApiFetchGet = (url: string) => {
  return fetch(API_SERVER + url, {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
  });
};

export async function ApiResponse<T>(url: string, json: Object): Promise<Response<T>> {
  return await ApiFetchPost(url, json)
    .then(res => res.json())
    .then((json: Response<T>) => json);
}

export async function GetApiResponse<T>(url: string): Promise<Response<T>> {
  return await ApiFetchGet(url)
    .then(res => res.json())
    .then((json: Response<T>) => json);
}
