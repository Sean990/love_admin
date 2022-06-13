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
		redirect: '/dashboard',
		children: [
			{
				path: '/dashboard',
				name: 'Dashboard',
				component: () => import('@/views/dashboard/Workplace'),
				meta: {
					title: '首页',
					keepAlive: true,
					icon: 'home',
				},
			},
		],
	},
	{
		path: '/article',
		name: 'Article',
		component: BasicLayout,
		menuFolderOpen: false,
		redirect: '/article-list',
		meta: { title: '文章管理', icon: 'profile' },
		children: [
			{
				path: '/article-list',
				name: 'ArticleList',
				component: () => import('@/views/article/article-list'),
				meta: { title: '文章列表' },
			},
			{
				path: '/article-edit',
				name: 'ArticleEdit',
				hidden: true,
				component: () => import('@/views/article/article-edit'),
				meta: { title: '编辑文章' },
			},
			{
				path: '/tag-list',
				name: 'TagList',
				component: () => import('@/views/article/tag-list'),
				meta: { title: '标签列表' },
			},
		],
	},
	{
		path: '/color',
		name: 'color',
		component: BasicLayout,
		children: [
			{
				path: '/color',
				name: 'color',
				component: () => import('@/views/color'),
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
		component: () => import('@/views/exception/403'),
		hidden: true,
	},
	{
		path: '/404',
		component: () => import('@/views/exception/404'),
		hidden: true,
	},
	{
		path: '/500',
		component: () => import('@/views/exception/500'),
		hidden: true,
	},
];
