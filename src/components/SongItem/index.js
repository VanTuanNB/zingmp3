import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import Image from '@/components/Images';
import styles from './SongItem.module.scss';

const cx = classNames.bind(styles);

function SongItem({ data, onClick }) {
    const to = `/@${data.nickname}`;
    const props = {
        onClick,
    };

    let Component;

    if (data.tick) {
        Component = 'div';
    } else {
        Component = Link;
        props.to = to;
    }

    return (
        <Component {...props} className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <Image className={data.tick ? cx('avatar-song') : cx('avatar-singer')} src={data.avatar} />
                {data.tick ? (
                    <div className={cx('avatar-hover')}>
                        <div className={cx('overlay')}></div>
                        <div className={cx('play-icon')}>
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className={cx('text')}>
                {data.tick ? (
                    <Link to={'/albums'}>
                        <h4 className={cx('song-title', 'hover')}>{data.full_name}</h4>
                    </Link>
                ) : (
                    <h4 className={cx('song-title')}>{data.full_name}</h4>
                )}
                <p className={cx('singer')}>{data.nickname}</p>
            </div>
        </Component>
    );
}

export default SongItem;

// Xử lý phần heaight của search result để co giãn khi chiều cao thấp giống tiktok
// Tối ưu phần kiểm tra isSong và isSinger
// Làm ToolTip cho actions
// Xử lý logic khi user nhập vào input
