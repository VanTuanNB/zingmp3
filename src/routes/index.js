import Home from '@/pages/Home';
import Mymusic from '@/pages/Mymusic';
import LiveRadio from '@/pages/LiveRadio';
import Profile from '@/pages/Profile';
import Albums from '@/pages/Albums';
// public Routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/mymusic',
        component: Mymusic,
    },
    {
        path: '/liveradio',
        component: LiveRadio,
        layout: null,
    },
    {
        path: '/@:nickname',
        component: Profile,
    },
    {
        path: '/albums',
        component: Albums,
    },
];

// privateRoutes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
