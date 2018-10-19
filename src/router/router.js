import Main from '@/views/Main.vue';

//title properties are localization keys.

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
      title: 'LogIn'
  },
  component: () => import('@/views/login.vue')
};

// A route which is not displayed in the left menu
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    { path: 'home', title: 'HomePage', name: 'home_index', component: () => import('@/views/home/home.vue') }
  ]
};

// Left menu items
export const appRouter = [
  {
    path: '/admin',
    icon: 'settings',
    title: 'Administration',
    name: 'administration',
    component: Main,
    children: [
      { path: 'home', title: 'HomePage', name: 'home_index', component: () => import('@/views/home/home.vue') },
      { path: 'tenants', title: 'Tenants', name: 'tenants',permission:'Pages.Tenants', component: () => import('@/views/admin/tenants/tenants.vue') },
      { path: 'users', title: 'Users', name: 'users',permission:'Pages.Users', component: () => import('@/views/admin/users/users.vue') },
      { path: 'roles', title: 'Roles', name: 'roles',permission:'Pages.Roles', component: () => import('@/views/admin/roles/roles.vue') },
      // { path: 'about', title: 'About', name:'about',component:()=>import('@/views/admin/about/about.vue')}
    ]
  }
];

export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter
];
