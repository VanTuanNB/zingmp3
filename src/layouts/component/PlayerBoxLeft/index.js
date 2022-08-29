import { useContext } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './PlayerBoxLeft.module.scss';
import ButtonMenu from '@/components/Menu/ButtonMenu';

import { AudioContext } from '@/components/Context';

const cx = classNames.bind(styles);

function PlayerBoxLeft() {
    const { sourceSong } = useContext(AudioContext);

    return (
        <div className={cx('media-information')}>
            <div className={cx('media-avatar')}>
                <img src={sourceSong.imageSong} className={cx('media-img')} alt={'anh loi'} />
            </div>
            <div className={cx('media-text')}>
                <h4 className={cx('media-title')}>{sourceSong.title}</h4>
                <p className={cx('media-single')}>
                    <ButtonMenu className={cx('single-link')} to={'/nghe-si/Hung-Quan'}>
                        {sourceSong.singer}
                    </ButtonMenu>
                </p>
            </div>
            <div className={cx('media-actions')}>
                <Tippy content={'Thêm vào thư viện'}>
                    <button className={cx('btn-action', 'favourite')}>
                        <FontAwesomeIcon className={cx('btn-icon')} icon={faHeart} />
                    </button>
                </Tippy>
                <Tippy content={'Xem thêm'}>
                    <button className={cx('btn-action', 'see-more')}>
                        <FontAwesomeIcon className={cx('btn-icon')} icon={faEllipsis} />
                    </button>
                </Tippy>
            </div>
        </div>
    );
}

export default PlayerBoxLeft;
