import { BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts';
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
	{
		path: '/',
		name: 'Home',
		component: BasicLayout,
		redirect: '/Dashboard',
		children: [
			{
				path: '/Dashboard',
				name: 'Dashboard',
				component: () => import('@/views/Dashboard/Workplace'),
				meta: {
					title: '首页',
					keepAlive: true,
					icon: 'home',
				},
			},
		],
	},
	{
		path: '/Article',
		name: 'Article',
		component: BasicLayout,
		menuFolderOpen: false,
		childrenLen: 2,
		redirect: '/Article/List',
		meta: { title: '文章管理', icon: 'profile' },
		children: [
			{
				path: '/Article/List',
				name: 'ArticleList',
				component: () => import('@/views/Article/List'),
				meta: { title: '文章列表' },
			},
			{
				path: '/Article/Edit',
				name: 'ArticleEdit',
				hidden: true,
				component: () => import('@/views/Article/Edit'),
				meta: { title: '编辑文章' },
			},
			{
				path: '/Tag/list',
				name: 'TagList',
				component: () => import('@/views/Tag/List'),
				meta: { title: '标签列表' },
			},
		],
	},
	{
		path: '/Color',
		name: 'Color',
		component: BasicLayout,
		children: [
			{
				path: '/Color',
				name: 'Color',
				component: () => import('@/views/Color'),
				meta: {
					title: '图库',
					keepAlive: true,
					icon: 'experiment',
				},
			},
		],
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "user" */ '@/views/Login/index'),
		hidden: true,
	},
	{
		path: '/403',
		component: () => import('@/views/Exception/403'),
		hidden: true,
	},
	{
		path: '/404',
		component: () => import('@/views/Exception/404'),
		hidden: true,
	},
	{
		path: '/500',
		component: () => import('@/views/Exception/500'),
		hidden: true,
	},
];
