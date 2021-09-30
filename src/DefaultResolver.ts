/**
 *
 * User: wuliang (garcia.wul@alibaba-inc.com)
 * Date: 2021/09/30
 * Time: 15:41
 *
 */
import IResolver from "./IResolver";
import Uri from "jsuri";

const PARAM_Q:string = "q";

export default class DefaultResolver implements IResolver {
    fetch(request: Request): Promise<Response> {
        return fetch(request.url);
    }

    match(request: Request): boolean {
        return true;
    }

    resolve(request: Request): Request {
        let resolvedUrl:string = this.getQueryUrl(request);
        let newRequest: Request = new Request(resolvedUrl, request.clone());
        return newRequest;
    }

    getQueryUrl(request: Request):string {
        let resolvedUrl:string = null;
        let uri:Uri = new Uri(request.url);
        if (uri.hasQueryParam(PARAM_Q)) {
            resolvedUrl = uri.getQueryParamValue(PARAM_Q);
        } else {
            resolvedUrl = request.url.substring(uri.host().length + 1);
        }
        return resolvedUrl;
    }

}
