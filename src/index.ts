/**
 *
 * User: wuliang142857 (wuliang142857@gmail.com)
 * Date: 2021/09/30
 * Time: 15:10
 *
 */
import IResolver from "./IResolver";
import DefaultResolver from "./DefaultResolver";
import CorsOptionResolver from "./CorsOptionResolver";

const resolvers: Array<IResolver> = [
    new CorsOptionResolver(),
    new DefaultResolver()
];

function formatDateTime(date) {
    const pad = (number) => (number < 10 ? `0${number}` : number);

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // getMonth() 返回的是 0-11，所以需要 +1
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function handleRequest(request: Request): Promise<Response> {
    let matchedResolver:IResolver = resolvers.find((resolver: IResolver) => {
        return resolver.match(request);
    });
    const newRequest: Request = matchedResolver.resolve(request);
    console.info(`${formatDateTime(new Date())} ${request.url} => ${newRequest.url}`);
    return matchedResolver.fetch(newRequest);
}

addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(handleRequest(event.request));
});
