import { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { faCalendarPlus, faClock, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faDownload, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Aside.module.scss';
import TimerSong from '@/components/TimerSong';
import Menu from '@/components/Menu';
import { PlusIcon } from '@/components/Icon';
import Song from '@/layouts/component/Song';
import { GlobalContext } from '@/components/Context';
import { AudioContext } from '@/components/Context';

const cx = classNames.bind(styles);

function Aside() {
    const [playlist, setPlaylist] = useState(true);
    const [listHere, setListHere] = useState(false);
    const [showTimerSong, setShowTimerSong] = useState(false);

    const { fakeApi } = useContext(GlobalContext);
    const { sourceSong } = useContext(AudioContext);

    const handlePlaylist = () => {
        setPlaylist(true);
        setListHere(false);
    };

    const handleListHere = () => {
        setPlaylist(false);
        setListHere(true);
    };

    const handleShowTimerSong = () => {
        setShowTimerSong(true);
    };

    const OTHER_SETTING = [
        {
            title: 'Xoá danh sách phát',
            leftIcon: <FontAwesomeIcon icon={faTrashCan} />,
            href: 'https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=%s',
        },

        {
            title: 'Tải danh sách phát',
            leftIcon: <FontAwesomeIcon icon={faDownload} />,
            href: 'https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=%s',
        },

        {
            title: 'Thêm vào playlist',
            leftIcon: <FontAwesomeIcon icon={faCalendarPlus} />,
            rightIcon: <FontAwesomeIcon icon={faAngleRight} />,
            children: {
                title: 'Thêm vào playlist',
                data: [
                    {
                        title: 'Tạo playlist mới',
                        leftIcon: <PlusIcon />,
                        isPlaylist: true,
                    },
                ],
            },
        },
    ];

    return (
        <div className={cx('content')}>
            <div className={cx('player-header')}>
                <div className={cx('player-wrapper')}>
                    <button onClick={handlePlaylist} className={cx('playlist-btn', playlist && 'active')}>
                        Danh sách phát
                    </button>
                    <button onClick={handleListHere} className={cx('playlist-btn', listHere && 'active')}>
                        Nghe gần đây
                    </button>
                </div>
                <Tippy content="Hẹn giờ dừng phát nhạc" placement="bottom">
                    <button className={cx('actions')} onClick={handleShowTimerSong}>
                        <FontAwesomeIcon className={cx('playlist-header-icon')} icon={faClock} />
                    </button>
                </Tippy>
                <Menu items={OTHER_SETTING} playlist>
                    <Tippy content="Khác" placement="bottom">
                        <button className={cx('actions')}>
                            <FontAwesomeIcon className={cx('playlist-header-icon')} icon={faEllipsis} />
                        </button>
                    </Tippy>
                </Menu>
            </div>

            {/* list song */}
            <div className={cx('list-songs')}>
                {playlist &&
                    fakeApi.map((data) => (
                        <Song
                            key={data.id}
                            active={sourceSong.id === data.id ? true : false}
                            image={data.imageSong}
                            title={data.title}
                            singer={data.singer}
                        ></Song>
                    ))}
                {listHere && <h5>Nghe gần đây</h5>}
            </div>

            {showTimerSong && <TimerSong state={setShowTimerSong} />}
        </div>
    );
}

export default Aside;
