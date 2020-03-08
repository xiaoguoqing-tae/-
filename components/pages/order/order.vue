<template>
	<view class="container">
		<view class="my_address">收获地址：</view>
		<view class="address">
			<view>收货人：{{infolist['linkMan']}}</view>
			<view>地址：{{infolist.address}}</view>
			<view>联系方式：{{infolist.mobile}}</view>
		</view>
		<view class="goods" v-for="(item,index) in datalist" :key="index">
			<image :src="item.pic"></image>
			<view class="goodsinfo">
				<view>{{item.name}}</view>
				<view>￥{{item.price}}*{{item.number}} </view>
			</view>
		</view>
		<view class="money">实付金额：￥{{total}}</view>
		<view class="btn" @click="create">确定</view>
	</view>
</template>

<script>
	import {getaddress,createorder} from "../../apis"
	export default {
		data() {
			return {
				token:"",
				infolist:"",
				datalist:"",
				total:0,
				a:""
			}
		},
		methods: {
			create(){
				createorder({
					goodsJsonStr:this.a,
					token:this.token
				}).then(res=>{
					let [err,data]=res;
					console.log(data)
					console.log(this.a)
					uni.showToast({
						title:"创建订单成功"
					})
					uni.navigateTo({
						url:"../user/user"
					})
				})
			}
		},
		onLoad(options) {
			try {
			    const value = uni.getStorageSync('token');
			    if (value!=="") {
			        this.token=value.token
					getaddress({
						token:this.token
					}).then(res=>{
						let [err,data]=res
						this.msg=data.data.msg
						this.infolist=(data.data.data)[0]
					})	
			    }
			} catch (e) {
			    // error
			}
			this.a=options.index
			var data = JSON.parse(options.index)
			this.datalist=data;
			for(let i=0;i<this.datalist.length;i++){
				this.total+=Number(this.datalist[i].number)*Number(this.datalist[i].price)  
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #EEEEEE;
	}
.container{
	.my_address{
		background: #FFFFFF;
		padding: 10upx;
		margin-bottom: 10upx;
	}
	.address{
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		text-align: center;
		margin-bottom: 10upx;
	}
	.goods{
		background: #FFFFFF;
		display: flex;
		margin-bottom: 10upx;
		image{
			width: 200upx;
			height: 200upx;
		}
		.goodsinfo{
			color: #DD524D;
			margin:70upx 0 0 40upx;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
		}
	}
	.money{
		color: #DD524D;
		background: #FFFFFF;
		text-align: right;
		padding: 20upx;
		margin-bottom: 10upx;
	}
	.btn{
		width: 80%;
		margin-left: 10%;
		background: #DD524D;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		border-radius: 20upx;
	}
}
</style>
