import JsonResponse from "../common/typings/api/json-response";

interface CreateJsonResponseParameters {
  success: boolean;
  msg?: string | null;
  error?: any | null;
  errors?: any | null;
  extraParams?: { name: string; value: any }[] | null;
}

export default class JsonService {
  private constructor() {}

  public static createJsonResponse(
    params: CreateJsonResponseParameters
  ): JsonResponse {
    const { success, msg, error, errors, extraParams } = params;

    let result: JsonResponse = {
      success,
      msg: msg ?? error,
      errors,
    };

    if (extraParams !== null && extraParams !== undefined) {
      extraParams.forEach((extraParam) => {
        result[extraParam.name] = extraParam.value;
      });
    }

    return result;
  }
}
