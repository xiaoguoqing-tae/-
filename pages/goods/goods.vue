<template>
		<view class="container">
			<view>
				<image style="height: 800upx;width: 100%;" :src="datalist.basicInfo.pic"></image>
			</view>
			<view class="info">
				<view class="name">名称:{{datalist.basicInfo.name}}</view><view>标签:{{datalist.basicInfo.tags}}</view>
			</view>
			<view class="price">
				<view class="minfont">￥{{datalist.basicInfo.minPrice}}</view><view class="maxfont">￥{{datalist.basicInfo.originalPrice}}</view>
			</view>
			<view class="num">
				<view>销量:500</view><view>库存:{{datalist.basicInfo.stores}}</view><view>浏览量:{{datalist.basicInfo.views}}</view>
			</view>
			<view class="choose">
				<view class="c1">
					<view>购买类型：</view>
					<view>{{state}}+{{color}}</view>
				</view>
				<uni-popup ref="popup" type="bottom">
					<view  class="popup_info">
						<view class="info_top">
							<image :src="datalist.basicInfo.pic"></image>
							<view class="info">
								<view class="price">￥{{datalist.basicInfo.minPrice}}</view>
								<view class="num">库存:{{datalist.basicInfo.stores}}</view>
								<view class="num">已选:{{state}}+{{color}}</view>
							</view>
						</view>
						<view class="size">
							<view style="margin:20upx;">尺寸：</view>
							<view class="choose_size">
								<view class="size_detail"  v-for="(item,index) in size" :key="index" @click="pick1({item,index})">{{item}}</view>
							</view>
						</view>
						<view class="color">
							<view style="margin:20upx;">颜色：</view>
							<view class="choose_size">
								<view class="size_detail"  v-for="(item,index) in colorlist" :key="index" @click="pick2({item,index})">{{item}}</view>
							</view>
						</view>
						<view class="c1">
							<view>数量：</view>
							<uni-number-box @change="bindChange"></uni-number-box>
						</view> 
						<button :style="{display:pd==true?'none':'block'}" @click="topay">完成</button>
						<button :style="{display:pd==false?'none':'block'}" @click="tocart">完成</button>
					</view>
				</uni-popup>
				<view class="c1">
					<view>优惠券&#12288：</view>
					<view>领取优惠券</view>
				</view>
				<view class="c1">
					<view>促销活动：</view>
					<view>
						<view>新人收单送20元无门槛优惠券</view>
						<view>享满80减30</view>
						<view>享满499减100</view>
						<view>单笔购买满两件免邮费</view>
					</view>
				</view>
				<view class="c1">
					<view>服务&#12288&#12288：</view>
					<view>七天无理由退换货，假一赔十</view>
				</view>
				<view>
					<view class="c2">
						<view>评价</view>
						<view>好评率100%</view>
					</view>
				</view>
				<view class="c3">
					<view>图文详情</view>
					<image src="../../static/list1.jpg"></image>
					<image src="../../static/list1.jpg"></image>
				</view>
			</view>		
			<uni-goods-nav :fill="true"  :options="options" :button-group="buttonGroup"  @click="onClick" @buttonClick="buttonClick" ></uni-goods-nav>
		</view>
</template>

<script>
	import {detail,joincart} from "../../apis";
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components:{uniPopup,uniGoodsNav,uniNumberBox},
		data() {
			return {
				size:["m","s",'xs','l','xl','xxl'],
				colorlist:["天蓝色","红珊瑚","白珊瑚","草木绿"],
				datalist:{},
				state:"",
				color:"",
				num:0,
				pd:true,
				id:"",
				token:"",
				options: [{
				          icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
				          text: '客服'
				        }, {
				          icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
				          text: '店铺'
				        }, {
				          icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
				          text: '购物车',
				          info: 0
				        }],
				        buttonGroup: [{
				          text: '加入购物车',
				          backgroundColor: '#ff0000',
				          color: '#fff'
				        },
				        {
				          text: '立即购买',
				          backgroundColor: '#ffa200',
				          color: '#fff'
				        }
				        ]
			}
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中'
			});
			detail(option.id).then(res=>{
				let [err,data]=res;
				this.datalist=data.data.data
				this.id=this.datalist.basicInfo.id
				uni.hideLoading();
				console.log(this.datalist)
			})
		},
		onShow() {
			try {
			    const value = uni.getStorageSync('token');
			    if (value) {
			        this.token=value.token
			    }
			} catch (e) {
			    // error
			}
		},
		methods: {
			pick1(option){
				this.state=option.item;
			},
			pick2(option){
				this.color=option.item;
			},
			tocart(){
				this.$refs.popup.close()
				joincart({
					goodsId:this.id,
					number:this.num,
					token:this.token
				}).then(res=>{
					let [err,data]=res;
					console.log(data.data.msg)
				})
				uni.showToast({
					title:"已添加到购物车"
				})
			},
			topay(){
				this.$refs.popup.close()
				console.log("去付款")
			},
			onClick (e) {
			    uni.showToast({
			    title: `点击${e.content.text}`,
			    icon: 'none',
			})
			 },
			 buttonClick (e) {
			    if(e.index==0){
					 this.$refs.popup.open()
					 this.pd=true
					console.log("加入购物车")
				}else{
					this.$refs.popup.open()
					this.pd=false
					console.log("立即购买")
				}
			},
			bindChange(value){
				this.num=value; 
			}
		  }
		}
</script>

<style lang="scss" scoped>
	.box{
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}
.container{
	flex: 1;
	.info{
		padding: 20upx;
		display: flex;
		flex-direction: row;
		.name{
			margin-right: 5px;
		}
	}
	.price{
		padding-left: 20upx;
		display: flex;
		flex-direction: row;
		.minfont{
			font-size: 16px;
			color: #FA436A;
		}
		.maxfont{
			text-decoration: line-through;
			font-size: 16px;
			color: #909399;
		}
	}
	.num{
		font-size: 12px;
		color:#909399 ;
		display: flex;
		flex-direction: row;
		justify-content:space-between;
		padding: 0 100upx 0 20upx;
	}
	.choose{
		background: #F0F0F0;
		.c1{
			background: #FFFFFF;
			font-size: 12px;
			display: flex;
			margin-bottom: 20upx;
			padding: 20upx;
		}
		.c2{
			background: #FFFFFF;
			font-size: 12px;
			display: flex;
			justify-content: space-between;
			padding:0 20upx 0 20upx ;
		}
		.c3{
			background: #FFFFFF;
			font-size: 12px;
			text-align: center;
			margin-top: 20upx;
		}
		.popup_info{
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			button{
				margin: 30upx;
				height: 50upx;
				line-height: normal;
				font-size: 12px;
				background: #DD524D;
			}
			.info_top{
				display: flex;
				image{
					padding: 20upx;
					width: 200upx;
					height: 200upx;
				}
				.info{
					display: flex;
					flex-direction: column;
					.price{
						color:  #FA436A;
					}
				}
			}
			.size{
				.choose_size{
					display: flex;
					.size_detail{
						margin-left: 40upx;
						width: 80upx;
						height: 60upx;
						border-radius: 50%;
						background: #eee8ee;
						text-align: center;
					}
				}
			}
			.color{
				.choose_size{
					display: flex;
					.size_detail{
						margin-left: 40upx;
						width: 130upx;
						height: 60upx;
						border-radius: 50%;
						background: #eee8ee;
						text-align: center;
					}
				}
			}
		}
	}
}
</style>
