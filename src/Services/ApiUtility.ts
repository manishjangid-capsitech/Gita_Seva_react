import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { stringify } from "qs";
// import { DomainName } from "../Contexts/UserContext";

export interface IApiResponse<T = any> {
  json(): any;
  status: boolean;
  result: T;
  message?: string;
  errors?: {
    number: number;
    message: string;
    suggestion: string;
    exception: any;
  }[];
}
export interface IApiListResult<T = any> {
  totalRecords: number;
  items: T[];
  moreRecords?: boolean;
  continuationToken?: string;
}

export enum HttpMethods {
  get = "get",
  post = "post",
}

export interface IAxiosRequestConfigWithoutParams
  extends Omit<AxiosRequestConfig, "params" | "paramsSerializer"> {}
class ApiUtilityBase {
  private getParams = (params?: any) => {
    if (params) {
      for (const key in params) {
        if (
          params[key] == null ||
          params[key] === undefined ||
          params[key] === ""
        )
          delete params[key];
      }
    }
    return params;
  };

  getResponse = async <T = any>(
    endpoint: string,
    params?: any,
    config?: IAxiosRequestConfigWithoutParams
  ) => {
    return await Axios.get<T>(endpoint, {
      params: params,
      paramsSerializer: (p) => {
        return stringify(params, {
          arrayFormat: "indices",
          allowDots: true,
          skipNulls: true,
        });
      },
      ...this._axiosOptions(),
      ...(config || {}),
    });
  };

  get = async <T = IApiResponse>(
    endpoint: string,
    params?: any,
    throwErrorOn401?: boolean
  ) => {
    const response = await this.getResponse<T>(endpoint, params);

    const data = this.handleResponse<T>(response, throwErrorOn401);
    return data;
  };
  
  getResult = async <T = any>(
    endpoint: string,
    params?: any,
    throwErrorOn401?: boolean
  ) => {
    try {
      const data = await this.get<IApiResponse<T>>(endpoint, params);

      if (data.status) {
        return data.result;
      } else {
        this.handleErrorResponse(data.message, data.errors);
      }
    } catch (error: any) {
      if (error!.isAxiosError) this.handleAxiosError(error, throwErrorOn401);
      else this.handleResponse(error, throwErrorOn401);
    }

    return null;
  };

  post = async <T = IApiResponse>(
    endpoint: string,
    body: any,
    contentType?: string
  ): Promise<T> => {
    try {
      const response = await Axios.post<T>(
        endpoint,
        body,
        this._axiosOptions({ contentType })
      );
      const data = this.handleResponse<T>(response);
      return data;
    } catch (ex: any) {
      if (ex?.isAxiosError) {
        return this.handleAxiosError(ex);
      }
    }
    return {} as T;
  };

  postForm = async <T = IApiResponse>(endpoint: string, params: any) => {
    const formData = new FormData();
    const fAddValues = (obj: any, preFix: string) => {
      if (!preFix || preFix.length <= 0) preFix = "";

      //check if given object is a string/number/boolean then add directly to the list with prefix
      if (
        (typeof obj !== "function" &&
          typeof obj !== "object" &&
          typeof obj !== "symbol") ||
        obj instanceof File
      ) {
        if (obj && preFix) {
          formData.append(preFix, obj);
        }
        return;
      }

      for (const key in obj) {
        //prepare a field name
        const fieldName = `${preFix}${
          preFix && !preFix.endsWith(".") ? "." : ""
        }${key}`;

        if (obj[key] instanceof FileList) {
          for (let fIndex = 0; fIndex < obj[key].length; fIndex++) {
            formData.append(`${fieldName}[${fIndex}]`, obj[key].item(fIndex));
          }
        } else {
          if (Array.isArray(obj[key])) {
            obj[key].forEach((el: any, idx: number) => {
              fAddValues(el, `${fieldName}[${idx}]`);
            });
          } else {
            if (typeof obj[key] === "object") {
              fAddValues(obj[key], fieldName);
            } else if (obj[key]) {
              formData.append(fieldName, obj[key]);
            }
          }
        }
      }
    };
    fAddValues(params, "");

    try {
      const response = await Axios.post<T>(
        endpoint,
        formData,
        this._axiosOptions({ contentType: "multipart/form-data" })
      );
      const data = this.handleResponse(response);
      return data;
    } catch (ex: any) {
      if (ex?.isAxiosError) {
        return this.handleAxiosError(ex);
      }
    }
    return {} as T;
  };

  delete = async <T = IApiResponse>(endpoint: string, contentType?: string) => {
    const response = await Axios.delete<T>(
      endpoint,
      this._axiosOptions({ contentType })
    );
    const data = this.handleResponse<T>(response);
    return data;
  };

  getAuthHeader = (contentType?: string) => {
    // const headers: any = {
    //   "Content-Type": contentType || "application/json",
    //   Accept: "application/json",
    // };

    // // return authorization header with jwt token
    // const token = AuthService.getAuthToken();
    // if (token) {
    //   headers['Authorization'] = `Bearer ${token}`;
    // }

    const token = localStorage.getItem("Token");
    const headers: any = {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType || "application/json",
      Accept: "application/json",
    };
    return headers;
  };

  handleResponse = <T = IApiResponse>(
    response: AxiosResponse<T>,
    throwErrorOn401?: boolean
  ) => {
    if (!response) {
      console.error("No response from the server, please try after some time.");
    } else if ([401, 403].indexOf(response.status) !== -1) {
      if (throwErrorOn401) {
        throw response;
      } else {
        // // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        // AuthService.logout();

        window.location.reload();
      }
    }
    return response?.data;
  };

  handleAxiosError = <T = IApiResponse>(
    error: AxiosError,
    throwErrorOn401?: boolean
  ): T => {
    if (throwErrorOn401 && error.response?.status === 401) throw error;
    else if (error.response?.status === 400) {
      const data: any = error.response.data;
      if (data && data.error) {
        const arr: any[] = [];
        for (const key in data.errors) {
          if (data.errors[key] && data.errors[key].length > 0) {
            arr.push(data.errors[key][0]);
          }
        }
        return {
          result: null,
          status: false,
          message: arr.length > 0 ? arr[0] : "",
          errors: arr,
        } as unknown as T;
      }
    }
    return {} as T;
  };
  handleErrorResponse = (message: any, errors?: any) => {
    console.error(message);
  };

  _axiosOptions = (
    options?: IAxiosOptionsRequestConfig
  ): AxiosRequestConfig => {
    const { contentType, headers, ...rest } = options || {};
    return {
      headers: headers || this.getAuthHeader(contentType),
      baseURL: this.getBaseUrl(),
      ...rest,
    };
  };
  getBaseUrl = () =>  process.env.REACT_APP_API_URL;
  // getBaseUrl =  () => DomainName;
}
interface IAxiosOptionsRequestConfig extends AxiosRequestConfig {
  contentType?: string;
}

export const ApiUtility = new ApiUtilityBase();
