<template>
	<view class="center">
		<view class="center_top">
			<view class="mask"></view>
		</view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header">

					</view>
					<view :style="{display:id !==''?'block':'none'}">
						<text >欢迎您：小顾客</text>
						<image @click="loginout" src="../../static/fumou-center-template/setting.png"></image>
						<uni-drawer :visible="visible" mode="right" @close="close">
							<view class="drawer_container">
								<view class="view">设置</view>
								<view class="view">联系我们</view>
								<view class="view">关于我们</view>
								<view class="view">版本更新</view>
								
								<view class="view" @click="outlogin" style="background: #F37B1D;">退出登录</view>
							</view>
						</uni-drawer>
					</view>
					<view :style="{display:id==''?'block':'none'}">
						<text @click="tologin">请登录</text>
						<image src="../../static/fumou-center-template/setting.png"></image>
					</view>
					
				</view>
				<view class="order_status">
					<view class="status" v-for="item in status" @click="gourl(item.tourl)">
						<image class="icon" :src="item.url" mode="aspectFill"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="baiban">

			</view>
			<view class="center_menu">
				<view class="menu_item" v-for="item in menus" @click="tourl(item.url)">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	export default {
		data() {
			return {
				id:'',
				visible:false,
				status: [{
						key: 1,
						name: '待发货',
						url: '../../static/fumou-center-template/one.png'
					},
					{
						key: 2,
						name: '待收货',
						url: '../../static/fumou-center-template/2.png'
					},
					{
						key: 3,
						name: '待评价',
						url: '../../static/fumou-center-template/3.png'
					},
					{
						key: 4,
						name: '全部订单',
						url: '../../static/fumou-center-template/4.png',
						tourl:"../orderlist/orderlist"
					}
				],
				menus: [{
						name: '我的收藏',
						icon: '../../static/fumou-center-template/5.png',
						key: 1,
					},
					{
						name: '地址管理',
						icon: '../../static/fumou-center-template/6.png',
						key: 2,
						url:"../address/address"
					},
					{
						name: '帮助中心',
						icon: '../../static/fumou-center-template/8.png',
						key: 3,
					},
					{
						name: '意见反馈',
						icon: '../../static/fumou-center-template/9.png',
						key: 4,
					},
					{
						name: '关于我们',
						icon: '../../static/fumou-center-template/10.png',
						key:5,
					}

				],
			};
		},
		components:{uniDrawer},
		methods: {
			tologin(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			loginout(){
				this.visible=true
			},
			outlogin(){
				this.id=""
				try {
				    uni.removeStorageSync('token');
				} catch (e) {
				    // error
				}
				uni.showToast({
					title:"已退出"
				})
			},
			close(){
				console.log(111)
				this.visible=false
			},
			tourl(url){
				uni.navigateTo({
					url:url
				})
			},
			gourl(url){
				uni.navigateTo({
					url:url
				})
			}
		},
		onShow() {
			try {
			    const value = uni.getStorageSync('token');
			    if (value) {
			        this.id=value; 
			    }
			} catch (e) {
			    // error
			}
		},
		computed: {

		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.profily,
	.profily_header {
		border-radius: 8px;
	}

	.center {
		height: 100%;

		&_top {
			height: 18%;
			background: url('../../static/fumou-center-template/header.jpg') no-repeat 0% 50%;
			background-size: cover;

			// background: #E6E6E6;
			.mask {
				background: rgba(0, 0, 0, .4);
				height: 100%;
			}
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				// border:1px solid #F7F7F7;
				margin: 0 auto;
				top: -100upx;
				left: 5%;
				background: #FEFEFE;
				padding: 35upx;
				box-sizing: border-box;
				box-shadow: 0px 2px 5px #EDEDED;
			}
		}
	}

	.base {
		display: flex;
		align-items: center;
		border-bottom: 2px solid #F6F6F6;
		padding-bottom: 35upx;
		position: relative;
		.profily_header {
			height: 120upx;
			width: 120upx;
			background-image: url('../../static/fumou-center-template/header.jpg');
			background-size: 100%;
		}

		text {
			margin-left: 20px;
			font-size: 30upx;
		}
		
		image{
			position: absolute;
			height: 40upx;
			width: 40upx;
			right: 0px;
			top:0px;
		}
	}

	.order_status {
		display: flex;
		justify-content: space-between;
		margin-top: 35upx;

		.status {
			width: 140upx;
			font-size: 24upx;
			text-align: center;
			letter-spacing: .5px;
			display: flex;
			flex-direction: column;
			.icon {
				width: 50upx;
				height: 50upx;
				margin: 0 auto;
				margin-bottom: 5px;
				
			}
		}
	}

	.baiban {
		background: #FEFEFE;
		height: 300upx;
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 28upx;
			letter-spacing: 1px;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&:hover {
				background: #F6F6F6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('../../static/fumou-center-template/right.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
.drawer_container{
	background: #f0f0f0;
	padding: 30upx;
	.view{
		line-height: 80upx;
		border-radius: 20upx;
		font-size: 18px;
		height: 80upx;
		text-align: center;
		background: #FFFFFF;
		margin-bottom: 40upx;
	}
}
</style>
