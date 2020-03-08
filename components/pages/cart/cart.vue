<template>
	<view>
		<view :style="{display:token==''?'block':'none'}">
			<view class="wz">你还未登录，请前往登录</view>
			<view class="btn" @click="gologin">去登录</view>
		</view >
		<checkbox-group :style="{display:token!==''?'block':'none'}">
		<view class="container" v-for="(item,index) in infolist" :key="index">
				<view class="xz" @click="checkboxChange(item)">
					<checkbox :value="[item.price*item.number]" :checked="item.checked" ></checkbox>
				</view>
				<view class="container2">
					<image :src="item.pic"></image>
					<view class="container3">
						<view>{{item.name}}</view>
						<view style="background: #007AFF;width: 60upx;border-radius: 20upx;" @click="del(item.key,index)">删除</view>
						<view class="container4">
							<view class="price">￥{{item.price}}</view>
							<div class="goods-compute">
							  <span class="goods-reduce" @click="goodsReduce(index,item)">-</span>
							      <input readonly v-model="item.number" />
							  <span class="goods-add" @click="goodsAdd(index,item)">+</span>
							</div>                      
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
				atotal:0,
				changeprice:0,
				key:"",
				navData:"",
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
				})
			},
			goodsReduce(i,item){
				if(item.checked){
					if(this.infolist[i].number>1){
						this.infolist[i].number--
						this.totalprice=this.totalprice-item.price
					}
				}
				
			},
			goodsAdd(i,item){
				if(item.checked){
					this.infolist[i].number++
					this.totalprice=this.totalprice+item.price
				}
			},
			checkboxChange(item){
				item.checked = !item.checked
				console.log(item.checked)
				if(item.checked) {
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
				.goods-compute{
					display: flex;
					position: relative;
					bottom: 0;
					align-items:flex-end;
					.goods-reduce{
						width: 40upx;
						height: 50upx;
						border: 1px solid #2C405A;
						border-radius: 20upx;
						text-align: center;
					}
					.goods-add{
						width: 40upx;
						height: 50upx;
						border: 1px solid #2C405A;
						border-radius: 20upx;
						text-align: center;
					}
					input{
						width: 80upx;
						height: 50upx;
						border: 1px solid #2C405A;
						border-radius: 20upx;
						text-align: center;
						margin: 0 20upx 0 20upx;
					}
				}
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
