
// import { getDefaultEmulatorHost } from "@firebase/util";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    base: process.env.BASE_URL,
    routes: [
        { path: "/", name: "home", component: () => import("../views/HomePage.vue")},
        { path: "/register", name: "register", component: () => import("../views/RegisterPage.vue")},
        { path: "/about", name: "about", component: () => import("../views/AboutPage.vue")},
        { path: "/sign-in", name: "sign-in", component: () => import("../views/SignInPage.vue")},
        { path: "/library", name: "library", component: () => import("../views/LibraryPage.vue"), meta: {requiresAuth: true}},
        { path: "/stats", name: "stats", component: () => import("../views/StatsPage.vue"), meta: {requiresAuth: true}},
        // { path: "/library", name: "library", component: () => import("../views/LibraryPage.vue")},
    ],
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth) {
        if (await getCurrentUser()) {
            next();
        } else {
            console.log("nice try dumbas, no access")
            next("/")
        }
    }
    else {
        next()
    }
});

export default router;