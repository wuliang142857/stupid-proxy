/**
 *
 * User: wuliang (garcia.wul@alibaba-inc.com)
 * Date: 2021/09/30
 * Time: 15:38
 *
 */

export default interface IResolver {

    match(request: Request): boolean;

    resolve(request: Request): Request;

    fetch(request: Request): Response | PromiseLike<Response>;

    getQueryUrl(request: Request):string;
}
