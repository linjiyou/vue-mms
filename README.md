

# msm(会员管理系统)技术栈
主要使用Vue.js 全家桶和 mock 做的一个后台管理系统
##项目需求
会员管理系统采用数据化管理会员、管理商品进销、供应商信息维护、员工管理等加快对店铺运营效率。
项目涉及功能模块：会员管理、供应商管理、商品管理、员工管理。
## 效果图(登录)
开发登录页面，当输入帐号和密码验证通过后，才允许进行到首页。效果图如下
![技术栈](https://7465-test-qr1px-1300643720.tcb.qcloud.la/mms/%E7%99%BB%E5%BD%95.png?sign=2ea2defbb28cd25d9536bf98331df310&t=1592811896)

##首页
登录成功后，后台验证成功才返回数据，并通过localStorage保存用户信息
![技术栈](https://7465-test-qr1px-1300643720.tcb.qcloud.la/mms/%E9%A6%96%E9%A1%B5.png?sign=390e37a462c4e359ff14dff7986bd3d2&t=1592811912)
##会员管理
会员管理主要针对充值会员进行管理，首先开发会员管理模块中的列表功能，包含条件查询、下拉框、日期功能、 数据列表、分页。 
![技术栈](https://7465-test-qr1px-1300643720.tcb.qcloud.la/mms/%E4%BC%9A%E5%91%98%E7%AE%A1%E7%90%86.png?sign=476082ae1a5e7fece9a856937f1e816f&t=1592811928)
####新增
![技术栈](https://7465-test-qr1px-1300643720.tcb.qcloud.la/mms/%E6%96%B0%E5%A2%9E.png?sign=71eaadc7c6346c3dcd8376280ab534b6&t=1592811940)
####编辑
![技术栈](https://7465-test-qr1px-1300643720.tcb.qcloud.la/mms/%E7%BC%96%E8%BE%91.png?sign=023036ec8164ef35a05e90c7ac02bcee&t=1592811961)
##供应商管理
![技术栈](https://7465-test-qr1px-1300643720.tcb.qcloud.la/mms/%E5%95%86%E5%93%81%E7%AE%A1%E7%90%86.png?sign=138c3cf51c71409dc16553002ef8765e&t=1592811983)
##商品管理
![技术栈](https://7465-test-qr1px-1300643720.tcb.qcloud.la/mms/%E5%95%86%E5%93%81%E7%AE%A1%E7%90%86.png?sign=9b762e2340a935774bf704f52b30ee48&t=1592812061)
##员工管理
![技术栈](https://7465-test-qr1px-1300643720.tcb.qcloud.la/mms/%E5%91%98%E5%B7%A5%E7%AE%A1%E7%90%86.png?sign=c6774f239e32135c221623017b57f2be&t=1592812074)
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
