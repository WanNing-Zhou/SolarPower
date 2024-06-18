# 光伏电站系统

## 开发环境部署说明

1. 使用 git 工具将仓库clone到本地
2. 下载pnpm 

```text
npm install pnpm
```

3, 进入项目根目录, 运行

```
pnpm run dev
```

## 生产环境打包

```text
# 开发环境打包
pnpm run build_dev
# 生产环境打包
pnpm run build_pro 
```


## TODOS

目前项目基础功能已经构建完成，更多的功能需要进一步进行扩展。
在前端架构方面需要继续完善。

若以后页面访问过慢， 可以添加element-ui的自动引入；

需要注意的是，在自动引入后也需要使用element-ui的国际化服务，

