import { useContext, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneLines, faTv, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';

import Button from '@/layouts/component/Button';
import styles from './PlayerBoxRight.module.scss';
import { AudioContext } from '@/components/Context';

const cx = classNames.bind(styles);

function PlayerBoxRight() {
    // Consumer data from AudioProvider
    const { toggleVolume, setVolume, setToggleVolume } = useContext(AudioContext);

    const widthVolumeRef = useRef();
    const volumeSlider = useRef();
    const volumeHandle = useRef();

    // get storageVolume from localStorage
    const localStorageVolume = JSON.parse(localStorage.getItem('storageVolume')) ?? [];

    // set data to localStorage
    const saveLocalStorageVolume = (volumePercent, volumePixel, volumeAudio) => {
        const properties = [{ volumePercent }, { volumePixel }, { volumeAudio }];

        localStorage.setItem('storageVolume', JSON.stringify(properties));
    };

    // function custom ui sidebar volume and dot
    const customVolume = (volumePercent, volumePixel) => {
        volumeHandle.current.style = `transform: translate(${volumePixel}, -3.5px);`;

        volumeSlider.current.style = `background: linear-gradient(
            to right,
            var(--white-color) 0%,
            var(--white-color) ${volumePercent},
            hsla(0, 0%, 100%, 0.3) ${volumePercent},
            hsla(0, 0%, 100%, 0.3) 100%
        );`;
    };

    // handle Change Volume when user onmouseup on sidebar volume
    const handleVolume = (e) => {
        const defaultWidthVolume = widthVolumeRef.current.offsetWidth;
        const currentWidthVolume = e.clientX - widthVolumeRef.current.getBoundingClientRect().left;
        const widthPercentage = Math.floor((currentWidthVolume * 100) / defaultWidthVolume) + '%';
        const widthPixel = Math.floor(currentWidthVolume - 5) + 'px';
        const audioVolumePercent = ((currentWidthVolume * 100) / defaultWidthVolume / 100).toFixed(1);

        customVolume(widthPercentage, widthPixel);
        setVolume(audioVolumePercent);
        saveLocalStorageVolume(widthPercentage, widthPixel, audioVolumePercent);
    };

    // handle toggle icon btn volume
    const handleToggleIconVolume = () => {
        // điều kiện để kiểm tra khi kh có dữ liệu trong localStorage thì lấy giá trị mặc định;
        const conditionVolume = localStorageVolume.length > 0 ? true : false;
        let defaultVolumePercent = '';
        let defaultVolumePixel = '';
        let defaultVolumeAudio = '';
        if (conditionVolume) {
            defaultVolumePercent = localStorageVolume[0].volumePercent;
            defaultVolumePixel = localStorageVolume[1].volumePixel;
            defaultVolumeAudio = localStorageVolume[2].volumeAudio;
        } else {
            if (!toggleVolume) {
                defaultVolumePercent = '100%';
                defaultVolumePixel = '65px';
                defaultVolumeAudio = '1.0';
            } else {
                defaultVolumePercent = '0%';
                defaultVolumePixel = '-5px';
                defaultVolumeAudio = '0.0';
            }
        }

        setToggleVolume(!toggleVolume);
        if (!toggleVolume) {
            customVolume(defaultVolumePercent, defaultVolumePixel);
            // kt xem trong localStorage có key là storageVolume không
            if (localStorage.storageVolume) {
                saveLocalStorageVolume(defaultVolumePercent, defaultVolumePixel, defaultVolumeAudio);
            }
        } else {
            customVolume(defaultVolumePercent, defaultVolumePixel);
        }
    };

    return (
        <div className={cx('media-manipulation')}>
            <Button
                className={cx('btn-control', 'box-right', 'mv')}
                aloneContent={<FontAwesomeIcon className={cx('volume-icon')} icon={faTv} />}
            />
            <Tippy content={'Xem lời bài hát'}>
                <Button
                    className={cx('btn-control', 'box-right')}
                    aloneContent={<FontAwesomeIcon className={cx('volume-icon')} icon={faMicrophoneLines} />}
                />
            </Tippy>
            <Tippy content={'Chế độ cửa sổ'}>
                <Button
                    className={cx('btn-control', 'box-right')}
                    aloneContent={<FontAwesomeIcon className={cx('volume-icon')} icon={faWindowRestore} />}
                />
            </Tippy>
            <div className={cx('volume-actions')}>
                <Button
                    onClick={handleToggleIconVolume}
                    className={cx('btn-control', 'box-right', 'btn-volume')}
                    aloneContent={
                        <FontAwesomeIcon
                            className={cx('volume-icon')}
                            icon={toggleVolume ? faVolumeHigh : faVolumeXmark}
                        />
                    }
                />
                <div ref={widthVolumeRef} onMouseUp={(e) => handleVolume(e)} className={cx('volume-bar')}>
                    <div
                        ref={volumeSlider}
                        className={cx('volume-slider')}
                        style={{
                            background: `linear-gradient(
                        to right,
                        var(--white-color) 0%,
                        var(--white-color) ${
                            localStorageVolume.length > 0 ? localStorageVolume[0].volumePercent : '100%'
                        },
                        hsla(0, 0%, 100%, 0.3) ${
                            localStorageVolume.length > 0 ? localStorageVolume[0].volumePercent : '100%'
                        },
                        hsla(0, 0%, 100%, 0.3) 100%
                    )`,
                        }}
                    >
                        <div
                            ref={volumeHandle}
                            className={cx('volume-handle')}
                            style={{
                                transform: `translate(${
                                    localStorageVolume.length > 0 ? localStorageVolume[1].volumePixel : '65px'
                                }, -3.5px)`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerBoxRight;
