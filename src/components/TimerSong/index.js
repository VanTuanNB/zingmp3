import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState } from 'react';
import 'tippy.js/dist/tippy.css'; // optional

import Button from '@/layouts/component/Button';
import styles from './TimerSong.module.scss';
import CountTimer from './CountTimer';

const cx = classNames.bind(styles);

function TimerSong({ state }) {
    const [valueHours, setValueHours] = useState('00');
    const [showHours, setShowHours] = useState(false);
    const [valueMinutes, setValueMinutes] = useState('00');
    const [showMinutes, setShowMinutes] = useState(false);
    const [submit, setSubmit] = useState(false);
    const HOUR_ITEMS = [
        {
            id: 1,
            title: '00',
            subTitle: 'giờ',
        },

        {
            id: 2,
            title: '01',
            subTitle: 'giờ',
        },

        {
            id: 3,
            title: '02',
            subTitle: 'giờ',
        },
        {
            id: 4,
            title: '03',
            subTitle: 'giờ',
        },

        {
            id: 5,
            title: '04',
            subTitle: 'giờ',
        },

        {
            id: 6,
            title: '05',
            subTitle: 'giờ',
        },

        {
            id: 7,
            title: '06',
            subTitle: 'giờ',
        },

        {
            id: 8,
            title: '07',
            subTitle: 'giờ',
        },

        {
            id: 9,
            title: '08',
            subTitle: 'giờ',
        },

        {
            id: 10,
            title: '09',
            subTitle: 'giờ',
        },

        {
            id: 11,
            title: '10',
            subTitle: 'giờ',
        },

        {
            id: 12,
            title: '11',
            subTitle: 'giờ',
        },

        {
            id: 13,
            title: '12',
            subTitle: 'giờ',
        },
    ];

    const MINUTES_ITEMS = [
        {
            id: 1,
            title: '00',
            subTitle: 'phút',
        },

        {
            id: 2,
            title: '05',
            subTitle: 'phút',
        },

        {
            id: 3,
            title: '10',
            subTitle: 'phút',
        },
        {
            id: 4,
            title: '15',
            subTitle: 'phút',
        },

        {
            id: 5,
            title: '20',
            subTitle: 'phút',
        },

        {
            id: 6,
            title: '25',
            subTitle: 'phút',
        },

        {
            id: 7,
            title: '30',
            subTitle: 'phút',
        },

        {
            id: 8,
            title: '35',
            subTitle: 'phút',
        },

        {
            id: 9,
            title: '40',
            subTitle: 'phút',
        },

        {
            id: 10,
            title: '45',
            subTitle: 'phút',
        },

        {
            id: 11,
            title: '50',
            subTitle: 'phút',
        },

        {
            id: 12,
            title: '55',
            subTitle: 'phút',
        },
    ];

    const handleClickItemHours = (value) => {
        setValueHours(value);
        setShowHours(false);
        setSubmit(true);
    };

    const handleChangeHours = (value) => {
        setValueHours(() => {
            if (isNaN(value)) {
                return '';
            } else {
                if (value.length > 2) {
                    return valueHours;
                } else {
                    return value.trim();
                }
            }
        });
        if (value === '00' || value === '' || value.length < 2 || value.length > 2) {
            setSubmit(false);
        } else {
            setSubmit(true);
        }
    };

    const handleOnChangeMinute = (value) => {
        setValueMinutes(() => {
            if (isNaN(value)) {
                return '';
            } else {
                if (value.length > 2) {
                    return valueMinutes;
                } else {
                    return value.trim();
                }
            }
        });
        if (value === '00' || value === '' || value.length < 2 || value.length > 2) {
            setSubmit(false);
        } else {
            setSubmit(true);
        }
    };

    const handleClickItemMinutes = (value) => {
        setValueMinutes(value);
        setShowMinutes(false);
        setSubmit(true);
    };

    const handleSubmit = (e) => {
        if (submit) {
            state(false);
        } else {
            state(true);
        }
    };

    return (
        <div className={cx('wrapper')} onClick={() => state(false)}>
            <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
                <h2 className={cx('modal-title')}>Hẹn giờ dừng phát nhạc</h2>
                <div className={cx('time-picker')}>
                    <div>
                        <HeadlessTippy
                            visible={showHours}
                            interactive
                            placement="bottom"
                            offset={[0, 6]}
                            render={(attrs) => (
                                <div className={cx('optional-timer')} tabIndex="-1" {...attrs}>
                                    <CountTimer>
                                        <ul className={cx('hours-list')}>
                                            {HOUR_ITEMS.map((item) => (
                                                <li
                                                    className={cx('item-hours')}
                                                    onClick={() => {
                                                        handleClickItemHours(item.title);
                                                    }}
                                                    key={item.id}
                                                >
                                                    {item.title} {item.subTitle}
                                                </li>
                                            ))}
                                        </ul>
                                    </CountTimer>
                                </div>
                            )}
                            onClickOutside={() => {
                                setShowHours(false);
                                setValueHours(() => {
                                    if (valueHours === '') {
                                        return '00';
                                    } else {
                                        return valueHours;
                                    }
                                });
                            }}
                        >
                            <div className={cx('time-box')}>
                                <input
                                    className={cx('time-input')}
                                    value={valueHours}
                                    onChange={(e) => {
                                        handleChangeHours(e.target.value);
                                    }}
                                    onFocus={() => setShowHours(true)}
                                    type="text"
                                />
                                <div className={cx('time-desc')}>Giờ</div>
                            </div>
                        </HeadlessTippy>
                    </div>
                    <div className={cx('time-dot')}>:</div>

                    <div>
                        <HeadlessTippy
                            visible={showMinutes}
                            interactive
                            placement="bottom"
                            offset={[0, 6]}
                            render={(attrs) => (
                                <div className={cx('optional-timer')} tabIndex="-1" {...attrs}>
                                    <CountTimer>
                                        <ul className={cx('hours-list')}>
                                            {MINUTES_ITEMS.map((item) => (
                                                <li
                                                    className={cx('item-hours')}
                                                    onClick={() => handleClickItemMinutes(item.title)}
                                                    key={item.id}
                                                >
                                                    {item.title} {item.subTitle}
                                                </li>
                                            ))}
                                        </ul>
                                    </CountTimer>
                                </div>
                            )}
                            onClickOutside={() => {
                                setShowMinutes(false);
                                setValueMinutes(() => {
                                    if (valueMinutes === '') {
                                        return '00';
                                    } else {
                                        return valueMinutes;
                                    }
                                });
                            }}
                        >
                            <div className={cx('time-box')}>
                                <input
                                    className={cx('time-input')}
                                    value={valueMinutes}
                                    onChange={(e) => handleOnChangeMinute(e.target.value)}
                                    onFocus={() => setShowMinutes(true)}
                                    type="text"
                                />
                                <div className={cx('time-desc')}>Phút</div>
                            </div>
                        </HeadlessTippy>
                    </div>
                </div>
                <h4 className={cx('time-information')}>Chọn thời gian để dùng phát nhạc</h4>
                <Button className={cx(submit ? 'time-btn' : 'time-btn-disable')} aloneContent onClick={handleSubmit}>
                    Lưu Lại
                </Button>
                <Button className={cx('time-btn', 'cancel')} aloneContent onClick={() => state(false)}>
                    Huỷ
                </Button>
            </div>
        </div>
    );
}

export default TimerSong;
