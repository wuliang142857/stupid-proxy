/**
 *
 * User: wuliang (garcia.wul@alibaba-inc.com)
 * Date: 2021/09/30
 * Time: 16:42
 * 参考URL: https://github.com/celery/celery/blob/master/docs/django/first-steps-with-django.rst
 */
import DefaultResolver from "./DefaultResolver";
import Uri from "jsuri";
import {
    CDN_JSDELIVR_GITHUB_PREFIX,
    CDN_JSDELIVR_HOST,
    CDN_JSDELIVR_PROTOCOL,
    GITHUB_HOST, RAW_GITHUB_CONTENT_HOST
} from "./Constants";

const BLOB_INDEX:number = 3;

export default class GithubBlobResolver extends DefaultResolver {
    match(request: Request): boolean {
        const resolvedUrl:string = this.getQueryUrl(request);
        const uri:Uri = new Uri(resolvedUrl);
        if (uri.host() !== RAW_GITHUB_CONTENT_HOST && uri.host() !== GITHUB_HOST) {
            return false;
        }
        const fields:string[] = uri.path().split("/");
        return fields.length > (BLOB_INDEX + 1) && fields[BLOB_INDEX] == "blob";
    }

    resolve(request: Request): Request {
        const resolvedUrl:string = this.getQueryUrl(request);
        const uri:Uri = new Uri(resolvedUrl);
        uri.setProtocol(CDN_JSDELIVR_PROTOCOL);
        uri.setHost(CDN_JSDELIVR_HOST);
        let fields:string[] = uri.path().split("/");
        // 修改成类似: https://cdn.jsdelivr.net/gh/celery/celery@master/docs/django/first-steps-with-django.rst
        let branchName:string = fields[BLOB_INDEX + 1];
        fields[BLOB_INDEX - 1] = `${fields[BLOB_INDEX - 1]}@${branchName}`;
        fields.splice(BLOB_INDEX, 2);
        uri.setPath(`${CDN_JSDELIVR_GITHUB_PREFIX}/${fields.join("/")}`);
        return new Request(uri.toString(), {});
    }
}
