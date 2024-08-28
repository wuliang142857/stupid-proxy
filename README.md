# stupid-proxy：简单粗暴的基于Cloudflare Worker的代理

# 使用手册

## 发布到Cloudflare Worker

```bash
npm run deploy
```

然后通过Cloudflare 提供的二级域名来访问，类似：

```
https://stupid-proxy.wuliang142857.workers.dev/https://ifconfig.me/
```

- `https://stupid-proxy.wuliang142857.workers.dev/`替换成自己对应的域名
- 也可以在Cloudflare Worker绑定上自己的域名
-  

