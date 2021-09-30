/**
 *
 * User: wuliang (garcia.wul@alibaba-inc.com)
 * Date: 2021/09/30
 * Time: 15:10
 *
 */
import fecha from "fecha";
import IResolver from "./IResolver";
import DefaultResolver from "./DefaultResolver";
import GithubBlobResolver from "./GithubBlobResolver";
import RawGithubUserContentResolver from "./RawGithubUserContentResolver";

const resolvers: Array<IResolver> = [
    new GithubBlobResolver(),
    new RawGithubUserContentResolver(),
    new DefaultResolver()
];

async function handleRequest(request: Request): Promise<Response> {
    let matchedResolver:IResolver = resolvers.find((resolver: IResolver) => {
        return resolver.match(request);
    });
    const newRequest: Request = matchedResolver.resolve(request);
    console.info(`${fecha.format(new Date(), "YYYY-MM-DD hh:mm:ss")} ${request.url} => ${newRequest.url}`);
    return matchedResolver.fetch(newRequest);
}

addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(handleRequest(event.request));
});
