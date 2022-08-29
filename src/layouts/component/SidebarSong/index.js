import { useContext, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarSong.module.scss';
import { AudioContext } from '@/components/Context';
import { useEffect } from 'react';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function SidebarSong() {
    const currentTimeRef = useRef();
    const lengthSongRef = useRef();
    const durationRef = useRef();
    const progressRef = useRef();
    const { currentTime, lengthSong, progressSong, handleSeekSong } = useContext(AudioContext);

    useEffect(() => {
        const formatTimeSecond = (data) => {
            return new Date(data * 1000).toTimeString().replace(/.*(\d{2}:\d{2}).*/, '$1');
        };
        currentTimeRef.current = formatTimeSecond(currentTime);
    }, [currentTime]);

    useEffect(() => {
        const formatTimeSecond = (data) => {
            return new Date(data * 1000).toTimeString().replace(/.*(\d{2}:\d{2}).*/, '$1');
        };
        lengthSongRef.current = formatTimeSecond(lengthSong);
    }, [lengthSong]);

    const progressSongPercent = progressSong.toFixed(5) + '%';
    const btnProgressSong = ((progressSong * 10.22) / 2).toFixed(5) + 'px';

    const handleRewindSeekSong = (e) => {
        const defaultWidth = progressRef.current.offsetWidth;
        const currentWidth = e.clientX - progressRef.current.getBoundingClientRect().left;
        const widthPercent = Math.floor((currentWidth * 100) / defaultWidth);
        const seekTime = (durationRef.current.ariaValueMax / 100) * widthPercent;
        handleSeekSong(seekTime);
    };

    return (
        <div className={cx('player-perform')}>
            <span className={cx('time', 'left')}>{currentTimeRef.current ? currentTimeRef.current : '00:00'}</span>
            <div ref={progressRef} className={cx('duration-bar')} onClick={handleRewindSeekSong}>
                <div
                    ref={durationRef}
                    className={cx('slider-bar')}
                    tabIndex={0}
                    draggable={false}
                    role={'slider'}
                    aria-valuemin="0"
                    aria-valuemax={lengthSong}
                    aria-valuenow={currentTime}
                    style={{
                        background: `
                        linear-gradient(
                        to right,
                        var(--white-color) 0%,
                        var(--white-color) ${progressSongPercent},
                        hsla(0, 0%, 100%, 0.3) ${progressSongPercent},
                        hsla(0, 0%, 100%, 0.3) 100%
                    )
                    `,
                    }}
                >
                    <div
                        className={cx('slider-handle')}
                        style={{ transform: `translate(${btnProgressSong}, -3.5px)` }}
                    ></div>
                </div>
            </div>
            <span className={cx('time', 'right')}>{lengthSongRef.current ? lengthSongRef.current : '00:00'}</span>
        </div>
    );
}

export default memo(SidebarSong);
