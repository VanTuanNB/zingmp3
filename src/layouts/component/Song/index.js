import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { faCalendarPlus, faHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './Song.module.scss';
import Button from '@/layouts/component/Button';
import Image from '@/components/Images';

const cx = classNames.bind(styles);

function Song({ suggestions = false, active, title, image, singer }) {
    return (
        <div className={cx(active ? 'song-active' : 'song-item')}>
            <div className={cx('song')}>
                <div className={cx('song-box-left')}>
                    <div className={cx('song-image')}>
                        <Image className={cx('image')} src={image} alt={'anh loi'} />
                        <div className={cx('song-play')}>
                            <Button className={cx('btn-play-song')} aloneContent={<FontAwesomeIcon icon={faPlay} />} />
                        </div>
                    </div>
                    <div className={cx('song-information')}>
                        <h4 className={cx('song-title')}>{title}</h4>
                        <div className={cx('singer')}>
                            <Button className={cx('singer-link')} to={'./nghe-si/Sasha-Alex-Sloan-IW7U6UWC'}>
                                {singer}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx(suggestions ? 'song-box-suggestions' : 'song-box-right')}>
                    <div className={cx('media-actions')}>
                        <Tippy content={'Thêm vào thư viện'}>
                            <button className={cx('btn-action', 'favourite')}>
                                <FontAwesomeIcon
                                    className={cx('btn-icon')}
                                    icon={suggestions ? faCalendarPlus : faHeart}
                                />
                            </button>
                        </Tippy>
                        <Tippy content={'Khác'}>
                            <button className={cx('btn-action', 'see-more')}>
                                <FontAwesomeIcon className={cx('btn-icon')} icon={faEllipsis} />
                            </button>
                        </Tippy>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Song;
