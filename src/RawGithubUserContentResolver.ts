/**
 *
 * User: wuliang (garcia.wul@alibaba-inc.com)
 * Date: 2021/09/30
 * Time: 17:57
 * 类似将：https://raw.githubusercontent.com/boostorg/boost/boost-1.75.0/boostcpp.jam 替换成 https://cdn.jsdelivr.net/gh/boostorg/boost@boost-1.75.0/boostcpp.jam
 */
import DefaultResolver from "./DefaultResolver";
import Uri from "jsuri";
import {
    CDN_JSDELIVR_GITHUB_PREFIX,
    CDN_JSDELIVR_HOST,
    CDN_JSDELIVR_PROTOCOL,
    RAW_GITHUB_CONTENT_HOST
} from "./Constants";

const BRANCH_INDEX:number = 3;

export default class RawGithubUserContentResolver extends DefaultResolver {
    match(request: Request): boolean {
        const resolvedUrl:string = this.getQueryUrl(request);
        const uri:Uri = new Uri(resolvedUrl);
        return uri.host() === RAW_GITHUB_CONTENT_HOST;
    }

    resolve(request: Request): Request {
        const resolvedUrl:string = this.getQueryUrl(request);
        const uri:Uri = new Uri(resolvedUrl);
        uri.setProtocol(CDN_JSDELIVR_PROTOCOL);
        uri.setHost(CDN_JSDELIVR_HOST);
        let fields:string[] = uri.path().split("/");
        let branchName:string = fields[BRANCH_INDEX];
        fields[BRANCH_INDEX - 1] = `${fields[BRANCH_INDEX - 1]}@${branchName}`;
        fields.splice(BRANCH_INDEX, 1);
        uri.setPath(`${CDN_JSDELIVR_GITHUB_PREFIX}${fields.join("/")}`);
        return new Request(uri.toString(), {});
    }

    async fetch(request: Request): Promise<Response> {
        return Response.redirect(request.url, 302);
    }
}
