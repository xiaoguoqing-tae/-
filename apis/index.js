export const getIndex=params=>(
	//首页列表
		uni.request({
		    url: `https://api.zbztb.cn/api/public/v1/home/floordata`,
			data:params,
			header:{
				"content-type":"json"
			},
		})
)
export const sorts=params=>(
	//商品类别
		uni.request({
		    url: `https://api.it120.cc/tae/shop/goods/category/all`,
			data:params,
			header:{
				"content-type":"json"
			}
		})
)
export const goods=id=>(
	//商品列表
		uni.request({
		    url: `https://api.it120.cc/tae/shop/goods/list?categoryId=`+id,
			header:{
				"content-type":"json"
			}
		})
)
export const detail=id=>(
	//商品详情
		uni.request({
		    url: `https://api.it120.cc/tae/shop/goods/detail?id=`+id,
			header:{
				"content-type":"json"
			}
		})
)
export const joincart=params=>(
	//加入购物车
		uni.request({
		    url: `https://api.it120.cc/tae/shopping-cart/add`,
			data:params,
			method:'POST',
			header:{
				"content-type":"application/x-www-form-urlencoded"
			},
		})
)
export const updatecart=params=>(
	//修改购物车数据
		uni.request({
		    url: `https://api.it120.cc/tae/shopping-cart/modifyNumber`,
			data:params,
			method:'POST',
			header:{
				"content-type":"application/x-www-form-urlencoded"
			},
		})
)
export const removecartinfo=params=>(
	//移除一条购物车数据
		uni.request({
		    url: `https://api.it120.cc/tae/shopping-cart/remove`,
			data:params,
			method:'POST',
			header:{
				"content-type":"application/x-www-form-urlencoded"
			}
		})
)
export const getcartinfo=token=>(
	//获取购物车数据
		uni.request({
		    url: `https://api.it120.cc/tae/shopping-cart/info?token=`+token,
			header:{
				"content-type":"json"
			}
		})
)
export const getaddress=params=>(
	//获取地址
		uni.request({
		    url: `https://api.it120.cc/tae/user/shipping-address/list`,
			data:params,
			header:{
				"content-type":"x-www-form-urlencoded"
			}
		})
)
export const addaddress=params=>(
	//添加地址
		uni.request({
		    url: `https://api.it120.cc/tae/user/shipping-address/add`,
			data:params,
			header:{
				"content-type":"x-www-form-urlencoded"
			}
		})
)
export const createorder=params=>(
	//创建订单
		uni.request({
		    url: ` https://api.it120.cc/tae/order/create`,
			data:params,
			header:{
				"content-type":"x-www-form-urlencoded"
			}
		})
)
export const getorder=params=>(
	//获取订单
		uni.request({
		    url: `https://api.it120.cc/tae/order/list`,
			data:params,
			header:{
				"content-type":"x-www-form-urlencoded"
			}
		})
)

