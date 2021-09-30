/**
 *
 * User: wuliang (garcia.wul@alibaba-inc.com)
 * Date: 2021/09/30
 * Time: 15:10
 *
 */
import signale from "signale";
import IResolver from "./IResolver";
import DefaultResolver from "./DefaultResolver";
import GithubBlobResolver from "./GithubBlobResolver";

const resolvers: Array<IResolver> = [
    new GithubBlobResolver(),
    new DefaultResolver()
];

async function handleRequest(request: Request): Promise<Response> {
    let matchedResolver:IResolver = resolvers.find((resolver: IResolver) => {
        return resolver.match(request);
    });
    const newRequest: Request = matchedResolver.resolve(request);
    signale.info(`${request.url} => ${newRequest.url}`);
    return matchedResolver.fetch(newRequest);
}

addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(handleRequest(event.request));
});
