import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ApiRoute } from "../common/enums/routes";

export default class HttpService {
  private readonly API_URL = "";

  private static _instance: HttpService;
  private static get instance(): HttpService {
    if (!HttpService._instance) {
      HttpService._instance = new HttpService();
    }
    return HttpService._instance;
  }

  private _client: AxiosInstance;
  public static get client(): AxiosInstance {
    const { instance } = HttpService;
    return instance._client;
  }

  private constructor() {
    this._client = axios.create({
      baseURL: this.API_URL,
      withCredentials: true,
    });
  }

  public static post(url: ApiRoute, data?: any): Promise<AxiosResponse<any>> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await HttpService.client.post(url, data);
        return resolve(response);
      } catch (error) {
        return reject(error);
      }
    });
  }

  public static get(url: ApiRoute) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await HttpService.client.get(url);
        return resolve(response);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
