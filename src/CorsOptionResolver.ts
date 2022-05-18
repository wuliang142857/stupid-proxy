// -*- coding: utf-8 -*-
// vim: tabstop=4 expandtab shiftwidth=4 softtabstop=4 fileencoding=utf-8 ff=unix
// author: wuliang
// contact: garcia.wul@alibaba-inc.com
// date 2022/5/18 12:23:21

import IResolver from "./IResolver";

export default class CorsOptionResolver implements IResolver {
    async fetch(request: Request): Promise<Response> {
        return new Response(null, {
            status: 204,
            headers: new Headers({
                'Access-Control-Allow-Origin': request.headers.has("origin") ? request.headers.get("origin") : "*",
                'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
                'Access-Control-Max-Age': '172800',
                "Access-Control-Allow-Headers": "Authorization, Content-Length, X-CSRF-Token,Token,token,session,organization",
                "Access-Control-Expose-Headers": "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers",
                "Access-Control-Allow-Credentials": "true"
            }),
        })
    }

    match(request: Request): boolean {
        return request.method === "OPTIONS" && request.headers.has("access-control-request-headers");
    }

    resolve(request: Request): Request {
        return request;
    }

}
