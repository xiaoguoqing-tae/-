<template>
	<view>
		<view :style="{display:token==''?'block':'none'}">
			<view class="wz">你还未登录，请前往登录</view>
			<view class="btn" @click="gologin">去登录</view>
		</view >
		<checkbox-group :style="{display:token!==''?'block':'none'}">
		<view class="container" v-for="(item,index) in infolist" :key="index">
				<view class="xz">
					<checkbox :value="[item.price*item.number]" :checked="item.checked" @click="checkboxChange($event,item)"></checkbox>
				</view>
				<view class="container2">
					<image :src="item.pic"></image>
					<view class="container3">
						<view>{{item.name}}</view>
						<view style="background: #007AFF;width: 60upx;border-radius: 20upx;" @click="del(item.key,index)">删除</view>
						<view class="container4">
							<view class="price">￥{{item.price}}</view>
							<uni-number-box :value="item.number" @change="bindChange($event,item)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</checkbox-group>
		<view style="height: 130upx;"></view>
		<view class="cart_pay">
			<view class="left"></view>
			<view class="right">
				<view class="total">合计：￥{{totalprice}}</view>
				<button @click="topaymoney">结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {getcartinfo,updatecart,removecartinfo} from "../../apis"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components:{uniNumberBox},
		data() {
			return {
				token:"",
				infolist:{},
				totalprice:0,
				key:"",
				navData:""
			}
		},
		onShow() {
			try {
				const value = uni.getStorageSync('token');
				if(value!==""){
					this.token=value.token
					console.log(this.token)
					this.getmore()
				}else{
					this.token=""
				}
			} catch (e) {
			    // error
			}
			
		},
		onLoad() {
				
		},
		methods: {
			getmore(){
				getcartinfo(this.token).then(res=>{
					let [err,data]=res;
					this.infolist=data.data.data.items
					this.infolist.forEach(item=>{
						item.checked=false;
					})
					console.log(this.infolist)
				})
			},
			bindChange(value,item){
				console.log(value)
				for(let i=0;i<this.infolist.length;i++){
					if(item.checked == true) {
					    this.totalprice=value*item.price
					}
				}
				// updatecart({
				// 	key:item.key,
				// 	number:value,
				// 	token:this.token
				// }).then(res=>{
				// 	let [err,data]=res;
				// })
			},
			checkboxChange(e,item){
				console.log(item)
				 let box = (item.checked = !item.checked);
					 if(item.checked == true) {
					     this.totalprice+=item.number*item.price
					 }else{
						 this.totalprice=this.totalprice-item.number*item.price
					 }
			},
			del(k,index){
				this.infolist.splice(index,1)	
				removecartinfo({
					key:k,
					token:this.token
				}).then(res=>{
					let [err,data]=res;
				})
			},
			topaymoney(){
				this.serverData = [];
				  this.infolist.forEach(item => {
				   if (item.checked == true) {
				       this.serverData.push({"goodsId":item.goodsId,"number":item.number,"pic":item.pic,"name":item.name,"price":item.price});
					   this.navData = JSON.stringify(this.serverData)
				     }   
				});
				 uni.navigateTo({
				 	url:"../order/order?index="+this.navData
				 })     	                 
			},
			gologin(){
				uni.switchTab({
					url:"../user/user"
				})
			}
		},
	}
</script>

<style lang="scss">
page{
	background: #f0f0f0;
	}
.wz{
	height: 200upx;
	line-height: 200upx;
	text-align: center;
}
.btn{
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	background: #007AFF;
	width: 80%;
	margin-left: 10%;
	border-radius: 20upx;
}
.container{
	width: 84%;
	margin:20upx 0 0 20upx;
	border-radius: 20upx;
	padding: 40upx;
	background: #FFFFFF;
	display: flex;
	.xz{
		
	}
	.container2{
		display: flex;
		image{
			width: 150upx;
			height: 200upx;
		}
		.container3{
			margin-left: 30upx;
			display: flex;
			flex-direction: column;
			margin-left: 40upx;
			.container4{
				margin-top: 60upx;
				display: flex; 
				.price{
					margin: 20upx 20upx 0 0;
					font-size: 17px;
					color: #ff0000;
				}
			}
		}
	}
}
.cart_pay{
	position: fixed;
	bottom: 0;//这里换成top:0;就悬浮在头部
	width: 100%;
	height: 110upx;
	background: #FFFFFF;
	display: flex;
	justify-content: space-between;
	padding: 20upx 0 20upx 0;
	.left{}
	.right{
		display: flex;
		.total{
			color: #ff0000;
			line-height: 140upx;
			margin-right: 20upx;
		}
		button{
			background:#DD524D ;
			border-radius: 30upx;
			margin-right: 20upx;
		}
	}
}
</style>
