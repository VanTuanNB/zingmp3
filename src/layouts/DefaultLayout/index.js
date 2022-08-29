import classNames from 'classnames/bind';

import images from '@/assets/images';
import styles from './DefaultLayout.module.scss';
import Header from '@/layouts/component/Header';
import Aside from './Aside';
import Sidebar from './Sidebar';
import PlayerControls from './PlayerControls';
import { AudioProvider } from '@/components/Context';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <div className={cx('default-layout')} style={{ backgroundImage: `url(${images.background})` }}>
                <Sidebar />
                <div className={cx('main-content')}>
                    <Header />
                    <div className={cx('content')}>{children}</div>
                </div>
                <AudioProvider>
                    <Aside />
                    <div className={cx('default-player')}>
                        <PlayerControls />
                    </div>
                </AudioProvider>
            </div>
        </>
    );
}

export default DefaultLayout;
