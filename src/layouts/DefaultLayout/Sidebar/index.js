import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompactDisc,
    faCreditCard,
    faIcons,
    faMusic,
    faPlay,
    faPlus,
    faPodcast,
    faRadio,
    faRecordVinyl,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import images from '@/assets/images';
import Button from '@/layouts/component/Button';
import { faGgCircle } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Advertisement from '@/components/Advertisement';
import { PlaylistIcon, RecentlyIcon, SongIcon } from '@/components/Icon';
import Playlist from '@/layouts/component/Playlist';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const navItem = [
        {
            id: 1,
            title: 'Cá Nhân',
            to: '/mymusic',
            leftIcon: <FontAwesomeIcon icon={faRadio} />,
            rightIcon: <FontAwesomeIcon icon={faPlay} />,
        },
        {
            id: 2,
            title: 'Khám Phá',
            active: true,
            to: '/',
            leftIcon: <FontAwesomeIcon icon={faRecordVinyl} />,
            rightIcon: <FontAwesomeIcon icon={faPlay} />,
        },
        {
            id: 3,
            title: '#zingchart',
            to: '/zing-chart',
            leftIcon: <FontAwesomeIcon icon={faGgCircle} />,
            rightIcon: <FontAwesomeIcon icon={faPlay} />,
        },
        {
            id: 4,
            title: 'Radio',
            live: true,
            to: '/radio',
            leftIcon: <FontAwesomeIcon icon={faPodcast} />,
            rightIcon: <FontAwesomeIcon icon={faPlay} />,
        },
        {
            id: 5,
            title: 'Theo Dõi',
            to: '/following',
            leftIcon: <FontAwesomeIcon icon={faCreditCard} />,
            rightIcon: <FontAwesomeIcon icon={faPlay} />,
        },
    ];

    const navbarScrollbar = [
        {
            id: 1,
            title: 'Nhạc Mới',
            to: '/moi-phat-hanh',
            leftIcon: <FontAwesomeIcon icon={faMusic} />,
            rightIcon: <FontAwesomeIcon icon={faPlay} />,
        },
        {
            id: 2,
            title: 'Thể Loại',
            to: '/hub',
            leftIcon: <FontAwesomeIcon icon={faIcons} />,
            rightIcon: <FontAwesomeIcon icon={faPlay} />,
        },
        {
            id: 3,
            title: 'Top 100',
            to: '/top100',
            leftIcon: <FontAwesomeIcon icon={faStar} />,
            rightIcon: <FontAwesomeIcon icon={faPlay} />,
        },
        {
            id: 4,
            title: 'MV',
            to: '/mv',
            leftIcon: <FontAwesomeIcon icon={faCompactDisc} />,
            rightIcon: <FontAwesomeIcon icon={faPlay} />,
        },
    ];

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <div className={cx('sidebar-content')}>
                <div className={cx('zing-logo')}>
                    <div className={cx('logo')} style={{ backgroundImage: `url(${images.logo})` }}></div>
                </div>
                <div className={cx('sidebar-list')}>
                    {navItem.map((item) => (
                        <Button
                            key={item.id}
                            to={item.to}
                            live={item.live}
                            active={item.active}
                            leftIcon={item.leftIcon}
                            rightIcon={item.rightIcon}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
                <div className={cx('separate')}></div>
                <div className={cx('sidebar-scrollbar')}>
                    {navbarScrollbar.map((scrollbarItem) => (
                        <Button
                            key={scrollbarItem.id}
                            to={scrollbarItem.to}
                            active={scrollbarItem.active}
                            leftIcon={scrollbarItem.leftIcon}
                            rightIcon={scrollbarItem.rightIcon}
                        >
                            {scrollbarItem.title}
                        </Button>
                    ))}
                    <div className={cx('vip-banner')}>
                        <Advertisement></Advertisement>
                    </div>
                    <div className={cx('library')}>
                        <h1 className={cx('library-title')}>Thư viện</h1>
                        <Button
                            to={'/mymusic/song/favorite'}
                            leftIcon={<SongIcon />}
                            rightIcon={<FontAwesomeIcon icon={faPlay} />}
                        >
                            <span className={cx('library-name')}>Bài hát</span>
                        </Button>
                        <Button
                            to={'/mymusic/library/playlist'}
                            leftIcon={<PlaylistIcon />}
                            rightIcon={<FontAwesomeIcon icon={faPlay} />}
                        >
                            <span className={cx('library-name')}>Playlist</span>
                        </Button>
                        <Button
                            to={'/mymusic/history'}
                            leftIcon={<RecentlyIcon />}
                            rightIcon={<FontAwesomeIcon icon={faPlay} />}
                        >
                            <span className={cx('library-name')}>Gần đây</span>
                        </Button>
                    </div>
                </div>
                <div className={cx('create-playlist')}>
                    <Button
                        className={cx('create-btn')}
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={handleOpenModal}
                    >
                        <span className={cx('create-title')}>Tạo playlist mới</span>
                    </Button>
                </div>
            </div>
            {/* modal create playlist */}
            {showModal ? <Playlist setShowModal={setShowModal} /> : <></>}
        </>
    );
}

export default Sidebar;
