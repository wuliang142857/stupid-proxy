/**
 *
 * User: wuliang (garcia.wul@alibaba-inc.com)
 * Date: 2021/09/30
 * Time: 15:10
 *
 */
import IResolver from "./IResolver";
import DefaultResolver from "./DefaultResolver";

const resolvers: Array<IResolver> = [
    new DefaultResolver()
];

async function handleRequest(request: Request): Promise<Response> {
    let matchedResolver:IResolver = resolvers.find((resolver: IResolver) => {
        return resolver.match(request);
    });
    return matchedResolver.fetch(matchedResolver.resolve(request));
}

addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(handleRequest(event.request));
});
