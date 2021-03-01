export default {
    path: '/mine',
    component: ()=>import('@/views/mine'),
    children: [
        {
            path: 'registered',
            component: ()=>import('@/views/mine/Registered')
        },
        {
            path: 'login',
            component: ()=>import('@/views/mine/Login')
        },
        {
            path: 'userinfo',
            component: ()=>import('@/views/mine/Userinfo'),
            meta: {// 访问这个页面时，才会有istoken这个属性并且为true（调用：to.meta.istoken）
                istoken: true
            }
        },
        {
            path: 'edit',
            component: ()=>import('@/views/mine/Edit'),
            meta: {
                istoken: true
            }
        },
        {
            path: '',
            redirect: 'userinfo'
        }
    ], 
}
