import classNames from 'classnames/bind';
import {
    faArrowLeft,
    faArrowRight,
    faArrowUpFromBracket,
    faAngleRight,
    faBan,
    faSquareH,
    faCirclePlay,
    faCircleInfo,
    faSquarePhone,
    faRectangleAd,
    faShield,
    faCheck,
    faGear,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessQueen, faFileLines, faFlag, faGem } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import Button from '@/layouts/component/Button';
import styles from './Header.module.scss';
import images from '@/assets/images';
import Image from '@/components/Images';
import Search from '@/layouts/component/Search';
import Menu from '@/components/Menu';
import { ToggleOnIcon, ToggleOffIcon } from '@/components/Icon';

const cx = classNames.bind(styles);

function Header() {
    const currentUser = true;

    const SETTING_ITEMS = [
        {
            title: 'Danh sách chặn',
            leftIcon: <FontAwesomeIcon icon={faBan} />,
            to: '/blocked',
        },
        {
            title: 'Chất lượng nhạc',
            leftIcon: <FontAwesomeIcon icon={faSquareH} />,
            rightIcon: <FontAwesomeIcon icon={faAngleRight} />,
            children: {
                title: 'Chất lượng nhạc',
                data: [
                    {
                        title: 'SQ • 128',
                        subTitle: 'Giảm sử dụng dữ liệu cho các kết nối chậm hơn.',
                        toggle: {
                            on: <FontAwesomeIcon icon={faCheck} />,
                            off: null,
                        },
                    },
                    {
                        title: 'HQ • 320',
                        subTitle: 'Kết hợp tốt nhất giữa việc sử dụng dữ liệu và chất lượng âm thanh.',
                        toggle: {
                            on: <FontAwesomeIcon icon={faCheck} />,
                            off: null,
                        },
                    },
                ],
            },
        },
        {
            title: 'Giao diện',
            leftIcon: <FontAwesomeIcon icon={faCirclePlay} />,
            rightIcon: <FontAwesomeIcon icon={faAngleRight} />,
            children: {
                title: 'Giao diện',
                data: [
                    {
                        title: 'Luôn phát nhạc toàn màn hình',
                        toggle: {
                            on: <ToggleOnIcon height="1.5rem" />,
                            off: <ToggleOffIcon height="1.5rem" />,
                        },
                    },
                    {
                        title: 'Hiệu ứng',
                        toggle: {
                            on: <ToggleOnIcon height="1.5rem" />,
                            off: <ToggleOffIcon height="1.5rem" />,
                        },
                    },
                ],
            },
        },
        {
            title: 'Giới thiệu',
            leftIcon: <FontAwesomeIcon icon={faCircleInfo} />,
            separate: true,
            isModal: true,
        },
        {
            title: 'Góp ý',
            leftIcon: <FontAwesomeIcon icon={faFlag} />,
            href: 'https://docs.google.com/forms/d/e/1FAIpQLSdZSuA1N0y7XgvXyIxlwVL0LPiwR9mqm3YSANM6sGpBFnihzw/viewform',
        },
        {
            title: 'Liên hệ',
            leftIcon: <FontAwesomeIcon icon={faSquarePhone} />,
            to: '/contact',
        },
        {
            title: 'Quảng cáo',
            leftIcon: <FontAwesomeIcon icon={faRectangleAd} />,
            href: 'https://adtima.vn/lien-he?utm_source=zingmp3&utm_medium=footer',
        },
        {
            title: 'Thoả thuận sử dụng',
            leftIcon: <FontAwesomeIcon icon={faFileLines} />,
            href: 'https://mp3.zing.vn/tnc',
        },
        {
            title: 'Chính sách bảo mật',
            leftIcon: <FontAwesomeIcon icon={faShield} />,
            href: 'https://zingmp3.vn/privacy.html',
        },
    ];

    const USER_SETTING_ITEMS = [
        {
            title: 'Nâng cấp VIP',
            leftIcon: <FontAwesomeIcon icon={faGem} />,
            href: 'https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=%s',
        },

        {
            title: 'Mua code VIP',
            leftIcon: <FontAwesomeIcon icon={faChessQueen} />,
            href: 'https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=%s',
        },

        {
            title: 'Đăng xuất',
            leftIcon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            to: '/logout',
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-content')}>
                <div className={cx('header-controls')}>
                    <div className={cx('control-nav')}>
                        <Button className={cx('btn-controls')} aloneContent={<FontAwesomeIcon icon={faArrowLeft} />} />
                        <Button className={cx('btn-controls')} aloneContent={<FontAwesomeIcon icon={faArrowRight} />} />
                    </div>
                    {/* Search */}
                    <Search />
                    {/* end Search */}
                </div>
            </div>
            <div className={cx('actions')}>
                <Tippy content="Chủ đề" placement="bottom">
                    <button className={cx('btn-action')}>
                        <div className={cx('topic-icon')} style={{ backgroundImage: `url(${images.topicIcon})` }}></div>
                    </button>
                </Tippy>
                <Tippy content="Nâng cấp VIP" placement="bottom">
                    <button className={cx('btn-action')}>
                        <FontAwesomeIcon className={cx('actions-icon')} icon={faGem} />
                    </button>
                </Tippy>
                <Tippy content="Tải lên" placement="bottom">
                    <button className={cx('btn-action')}>
                        <FontAwesomeIcon className={cx('actions-icon')} icon={faArrowUpFromBracket} />
                    </button>
                </Tippy>

                <Menu items={SETTING_ITEMS}>
                    <Tippy content="Cài đặt" placement="bottom">
                        <button className={cx('btn-action')}>
                            <FontAwesomeIcon className={cx('actions-icon')} icon={faGear} />
                        </button>
                    </Tippy>
                </Menu>

                <Menu items={currentUser ? USER_SETTING_ITEMS : []}>
                    <div className={cx('user-action')}>
                        <Image
                            className={cx('user-avatar')}
                            src={currentUser ? images.myImage : images.noImage}
                            alt="default-user"
                        />
                    </div>
                </Menu>
            </div>
        </header>
    );
}
export default Header;
