import { useState } from 'react';
import { ToggleOffIcon, ToggleOnIcon } from '@/components/Icon';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '../Button';

import styles from './Playlist.module.scss';

const cx = classNames.bind(styles);

function Playlist({ setShowModal }) {
    const [toggleOptionPublic, setToggleOptionPublic] = useState(true);
    const [toggleRandomPlay, setToggleRandomPlay] = useState(true);

    // two way building
    const [value, setValue] = useState('');
    const [playlist, setPlaylist] = useState([]);

    const data = {
        playlist: playlist,
        toggleOptionPublic,
        toggleRandomPlay,
    }; // data sẽ gửi dữ liệu input, ô option công khai và phát ngẫn nhiên đi

    console.log(data);

    const handleTogglePublic = () => {
        setToggleOptionPublic(!toggleOptionPublic);
    };

    const handleToggleRandomPlay = () => {
        setToggleRandomPlay(!toggleRandomPlay);
    };

    const handleOnchange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        if (!value) {
            e.preventDefault();
        } else {
            setPlaylist((preState) => [...preState, value]);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('playlist')}>
                <h1 className={cx('playlist-title')}>Tạo playlist mới</h1>
                <button onClick={() => setShowModal(false)} className={cx('btn-close')}>
                    {/* setShowModal là phần truyền dữ liệu cứng từ component Sidebar, cần tối ưu thêm */}
                    <FontAwesomeIcon className={cx('playlist-close')} icon={faXmark} />
                </button>
                <form id={cx('playlist-form')}>
                    <input
                        value={value}
                        onChange={handleOnchange}
                        placeholder="nhập tên playlist"
                        className={cx('playlist-input')}
                        autoFocus
                    />
                    <div className={cx('playlist-option')}>
                        <div className={cx('option-content')}>
                            <h3 className={cx('option-title')}>Công khai</h3>
                            <h3 className={cx('option-desc')}>Mọi người có thể nhìn thấy playlist này</h3>
                        </div>
                        <div className={cx('option-switch')}>
                            {toggleOptionPublic && (
                                <ToggleOnIcon
                                    className={cx('option-toggle')}
                                    onClick={handleTogglePublic}
                                    height="1.5rem"
                                />
                            )}
                            {!toggleOptionPublic && (
                                <ToggleOffIcon
                                    className={cx('option-toggle')}
                                    onClick={handleTogglePublic}
                                    height="1.5rem"
                                />
                            )}
                        </div>
                    </div>
                    <div className={cx('playlist-option')}>
                        <div className={cx('option-content')}>
                            <h3 className={cx('option-title')}>Phát ngẫu nhiên</h3>
                            <h3 className={cx('option-desc')}>Luôn phát ngẫu nhiên tất cả bài hát</h3>
                        </div>
                        <div className={cx('option-switch')}>
                            {toggleRandomPlay && (
                                <ToggleOnIcon
                                    className={cx('option-toggle')}
                                    onClick={handleToggleRandomPlay}
                                    height="1.5rem"
                                />
                            )}
                            {!toggleRandomPlay && (
                                <ToggleOffIcon
                                    className={cx('option-toggle')}
                                    onClick={handleToggleRandomPlay}
                                    height="1.5rem"
                                />
                            )}
                        </div>
                    </div>

                    <Button
                        className={value ? cx('btn-submit') : cx('btn-disable')}
                        aloneContent
                        onClick={handleSubmit}
                    >
                        TẠO MỚI
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Playlist;
