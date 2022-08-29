/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import styles from './MenuItem.module.scss';
import ButtonMenu from '@/components/Menu/ButtonMenu';
import { ToggleOnIcon, ToggleOffIcon, NoPlaylistIcon } from '@/components/Icon';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const [toggle, setToggle] = useState(false);
    const [check, setCheck] = useState(true);

    const handleCheck = () => {
        setCheck(!check);
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <>
            {!!data.toggle ? (
                <>
                    {data.separate ? <div className={cx('separate')}></div> : <></>}
                    {!!data.subTitle ? (
                        <>
                            <div onClick={handleCheck}>
                                <ButtonMenu
                                    to={data.to}
                                    href={data.href}
                                    leftIcon={data.leftIcon}
                                    rightIcon={data.rightIcon}
                                    toggleIcon={check && data.toggle.on}
                                    onClick={onClick}
                                >
                                    {data.subTitle ? (
                                        <>
                                            <h3 className={cx('data-title')}>{data.title}</h3>
                                            <p className={cx('data-sub-title')}>{data.subTitle}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className={cx('title')}>{data.title}</h3>
                                        </>
                                    )}
                                </ButtonMenu>
                            </div>
                        </>
                    ) : (
                        <>
                            <div onClick={handleToggle}>
                                <ButtonMenu
                                    to={data.to}
                                    href={data.href}
                                    leftIcon={data.leftIcon}
                                    rightIcon={data.rightIcon}
                                    toggleIcon={toggle ? data.toggle.on : data.toggle.off}
                                    onClick={onClick}
                                >
                                    {data.subTitle ? (
                                        <>
                                            <h3 className={cx('data-title')}>{data.title}</h3>
                                            <p className={cx('data-sub-title')}>{data.subTitle}</p>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className={cx('title')}>{data.title}</h3>
                                        </>
                                    )}
                                </ButtonMenu>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    {data.separate ? <div className={cx('separate')}></div> : <></>}
                    <ButtonMenu
                        to={data.to}
                        href={data.href}
                        leftIcon={data.leftIcon}
                        rightIcon={data.rightIcon}
                        onClick={onClick}
                    >
                        {data.title}
                    </ButtonMenu>

                    {data.isPlaylist ? (
                        <>
                            <div className={cx('content-playlist')}>
                                <NoPlaylistIcon className={cx('content-icon')} />
                                <span className={cx('content-text')}>Không có playlist</span>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </>
    );
}

export default MenuItem;
