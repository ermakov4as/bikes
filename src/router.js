import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Main from '@/views/public/Main.vue'

Vue.use(Router)

const PUBLIC_PAGES = [{
        path: '/',
        name: 'main',
        component: Main
    },
    {
        path: '/offers/:id/',
        name: 'offer',
        component: () =>
            import ('@/views/public/Offer.vue')
    },
    {
        path: '/offers/:id/tourist',
        name: 'offerTourist',
        component: () =>
            import ('@/views/public/OfferTourist.vue')
    },
    {
        path: '*',
        redirect: '/'
    }
]

const UNAUTORIZED_PAGES = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/unauthorized/Login.vue')
    },
    {
        path: '/registration',
        name: 'registration',
        component: () =>
            import ('@/views/unauthorized/Registration.vue')
    }
]

const PRIVATE_PAGES = [{
        path: '/offers/:id/owner',
        name: 'offerOwner',
        component: () =>
            import ('@/views/private/OfferOwner.vue')
    },
    {
        path: '/offers',
        name: 'offersGarage',
        component: () =>
            import ('@/views/private/OffersGarage.vue')
    },
    {
        path: '/offers/edit/:id/',
        name: 'offerOwner',
        component: () =>
            import ('@/views/private/OfferEdit.vue')
    },
    {
        path: '/offers/new',
        name: 'offerOwner',
        component: () =>
            import ('@/views/private/OfferEdit.vue')
    },
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: _.concat(UNAUTORIZED_PAGES, PUBLIC_PAGES, PRIVATE_PAGES),
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    let privatePagesPaths = []
    let unauthorizedPagesPaths = []
    PRIVATE_PAGES.forEach((page, i, PRIVATE_PAGES) => {
        privatePagesPaths.push(page.path)
    })
    UNAUTORIZED_PAGES.forEach((page, i, UNAUTORIZED_PAGES) => {
        unauthorizedPagesPaths.push(page.path)
    })

    const authRequired = !!privatePagesPaths.includes(to.path)
    const unauthorized = !!unauthorizedPagesPaths.includes(to.path)
    const loggedIn = store.getters['user/isAutorized']

    if (authRequired && !loggedIn) {
        return next('/login')
    }
    if (unauthorized && loggedIn) {
        return next('/')
    }

    next()
})

export default router