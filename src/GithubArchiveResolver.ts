/**
 *
 * User: wuliang (garcia.wul@alibaba-inc.com)
 * Date: 2021/09/30
 * Time: 16:23
 * 针对github发布的/归档的解析器
 */

import Uri from "jsuri";
import DefaultResolver from "./DefaultResolver";

export default class GithubArchiveResolver extends DefaultResolver {

    match(request: Request): boolean {
        const resolvedUrl:string = this.getQueryUrl(request);
        const uri:Uri = new Uri(resolvedUrl);
        return uri.host() === "github.com" && (uri.path().includes("/archive/") || uri.path().includes("/releases/"));
    }

    resolve(request: Request): Request {
        return super.resolve(request);
    }
}
