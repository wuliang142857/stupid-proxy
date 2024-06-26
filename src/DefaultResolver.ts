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
    async fetch(request: Request): Promise<Response> {
        const response: Response = await fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: request.body,
            redirect: 'follow',
        });
        const responseHeaders: Headers = response.headers;
        const rewriteResponseHeaders  = new Headers(responseHeaders);
        rewriteResponseHeaders.set('access-control-expose-headers', '*')
        rewriteResponseHeaders.set('access-control-allow-origin', '*')
        rewriteResponseHeaders.delete('content-security-policy')
        rewriteResponseHeaders.delete('content-security-policy-report-only')
        rewriteResponseHeaders.delete('clear-site-data')

        return new Response(response.body, {
            status: response.status,
            headers: response.headers,
        });
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
            resolvedUrl = `${uri.path().substring(1)}${uri.query()}`;
        }
        return resolvedUrl;
    }

}
