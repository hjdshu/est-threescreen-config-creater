est threescreen-config-creater, can help u for est threescreen config



```
### build only support windows

### 1. dev
```
cd app
yarn 
yarn start
```
```
set "ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/" && npm install --unsafe-perm=true --allow-root
```


### 2. build
```
cd app
yarn build
cd ../
yarn 
yarn package
```
### 3. build maybe need proxy
```
for cmd
set http_proxy=http://127.0.0.1:7890
set http_proxys=http://127.0.0.1:7890

rest cmd
set http_proxy=
set http_proxys=

gitbash/shell

export http_proxy=http://127.0.0.1:7890
export https_proxys=http://127.0.0.1:7890

reset
export http_proxy=
export http_proxys=

```
