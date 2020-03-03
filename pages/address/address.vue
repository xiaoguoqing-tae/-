<template>
	<view class="container">
		<view :style="{display:msg=='暂无数据'?'block':'none'}" class="text">当前暂无收获地址</view>
		<view class="card" v-for="(item,index) in infolist" :key="index">
			<view class="line">
				<view>收件人&#12288：</view>
				<view>{{item.linkMan}}</view>
			</view>
			<view class="line">
				<view>地址&#12288&#12288：</view>
				<view>{{item.address}}</view>
			</view>
			<view class="line">
				<view>联系电话：</view>
				<view>{{item.mobile}}</view>
			</view>
		</view>
		<view class="button" @click="addarress">添加地址</view>
	</view>
</template>

<script>
	import {getaddress} from "../../apis"
	export default {
		data() {
			return {
				token:"",
				msg:"",
				infolist:""
			}
		},
		onLoad() {
			try {
			    const value = uni.getStorageSync('token');
			    if (value) {
			        this.token=value.token
					console.log(this.token)
					getaddress({
						token:this.token
					}).then(res=>{
						let [err,data]=res
						this.msg=data.data.msg
						this.infolist=data.data.data
						console.log(this.infolist)
					})	
			    }
			} catch (e) {
			    // error
			}
		},
		methods: {
			addarress(){
				uni.navigateTo({
					url:"../addaddress/addaddress"
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #EEEEEE;
}
.container{
	.text{
		text-align: center;
		font-size: 18px;
		height: 500upx;
		line-height: 500upx;
	}
	.card{
		text-align: center;
		margin-top: 20upx;
		padding: 20upx;
		height: 180upx;
		background: #FFFFFF;
		border-radius: 20upx;
		.line{
			display: flex;
		}
	}
	.button{
		margin-top: 80upx;
		width: 80%;
		margin-left: 10%;
		text-align: center;
		line-height: 80upx;
		height: 80upx;
		background: #F37B1D;
		border-radius: 30upx;
	}
}
</style>
