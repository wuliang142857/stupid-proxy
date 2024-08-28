/**
 *
 * User: wuliang142857 (wuliang142857@gmail.com)
 * Date: 2021/09/30
 * Time: 15:38
 *
 */

export default interface IResolver {

    match(request: Request): boolean;

    resolve(request: Request): Request;

    fetch(request: Request): Promise<Response>;
}
