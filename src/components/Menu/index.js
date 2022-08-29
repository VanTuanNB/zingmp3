import { useState, memo } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css'; // optional

import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '@/components/Popper';

import MenuItem from './MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import ButtonMenu from './ButtonMenu';
import IntroduceZing from '../IntroduceZing';

const cx = classNames.bind(styles);

function Menu({ items = [], playlist = false, children }) {
    const [history, setHistory] = useState([{ data: items }]);
    const [showSetting, setShowSetting] = useState(false);
    const [sizeMenu, setSizeMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const current = history[history.length - 1];
    const render = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            const introduce = item.isModal;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (introduce) {
                            setShowModal(!showModal);
                        }

                        if (isParent) {
                            setHistory((preState) => [...preState, item.children]);
                            setSizeMenu(true);
                        }
                    }}
                />
            );
        });
    };

    const handleResetMenu = () => {
        setHistory((preState) => preState.slice(0, 1));
        setSizeMenu(false);
    };

    const handleShowSetting = () => {
        setShowSetting(!showSetting);
    };

    return (
        <div>
            <HeadlessTippy
                visible={showSetting}
                interactive
                placement="bottom-end"
                offset={[4, 10]}
                render={(attrs) => (
                    <div className={!sizeMenu ? cx('wrapper') : cx('wrapper-have-children')} tabIndex="-1" {...attrs}>
                        <PopperWrapper type={cx('menu-setting')}>
                            {sizeMenu ? (
                                playlist ? (
                                    <>
                                        <div className={cx('menu-title')}>
                                            <h3 className={cx('menu-text')}>{current.title}</h3>
                                            <ButtonMenu
                                                onClick={handleResetMenu}
                                                className={cx('menu-icon')}
                                                leftIcon={<FontAwesomeIcon icon={faAngleLeft} />}
                                            />
                                        </div>
                                        {/* add playlist menu in category: other btn */}
                                        <div className={cx('playlist-box-input')}>
                                            <input
                                                className={cx('menu-input-playlist')}
                                                type="text"
                                                placeholder="Tìm playlist"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className={cx('menu-title')}>
                                        <h3 className={cx('menu-text')}>{current.title}</h3>
                                        <ButtonMenu
                                            onClick={handleResetMenu}
                                            className={cx('menu-icon')}
                                            leftIcon={<FontAwesomeIcon icon={faAngleLeft} />}
                                        />
                                    </div>
                                )
                            ) : (
                                <></>
                            )}
                            {render()}
                        </PopperWrapper>
                    </div>
                )}
                onHide={handleResetMenu}
                onClickOutside={() => setShowSetting(false)}
            >
                {items.length > 0 ? (
                    <div onClick={handleShowSetting}>{children}</div>
                ) : (
                    <ButtonMenu className={cx('user-login')} to={'/login'}>
                        {children}
                    </ButtonMenu>
                )}
            </HeadlessTippy>

            {showModal && <IntroduceZing setShowModal={setShowModal} />}
        </div>
    );
}

// làm phần user avatar

export default memo(Menu);
