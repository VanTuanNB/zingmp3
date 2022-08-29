import { useContext, useRef, memo } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faCirclePause, faCirclePlay } from '@fortawesome/free-regular-svg-icons';

import Button from '@/layouts/component/Button';
import styles from './PlayerBoxCenter.module.scss';
import { AudioContext } from '@/components/Context';
import { useCallback } from 'react';
import { GlobalContext } from '@/components/Context';
const cx = classNames.bind(styles);

function PlayerBoxCenter({ children }) {
    const { fakeApi } = useContext(GlobalContext);
    const { playing, setPlaying, setSourceSong } = useContext(AudioContext);
    const nextRef = useRef();
    const currentIndexSong = useRef(0);

    const handlePlaying = () => {
        setPlaying(!playing);
    };

    const handleNextSong = () => {
        currentIndexSong.current++;
        setSourceSong(() => {
            if (currentIndexSong.current >= fakeApi.length) {
                currentIndexSong.current = 0;
                return fakeApi[currentIndexSong.current];
            } else {
                return fakeApi[currentIndexSong.current];
            }
        });
    };

    const handlePrevSong = () => {
        currentIndexSong.current--;
        if (currentIndexSong.current < 0) {
            currentIndexSong.current = fakeApi.length - 1;
            setSourceSong(() => fakeApi[currentIndexSong.current]);
        } else {
            setSourceSong(() => fakeApi[currentIndexSong.current]);
        }
    };

    const onNextSong = useCallback(() => {
        handleNextSong();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPrevSong = useCallback(() => {
        handlePrevSong();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('media-control')}>
            <div className={cx('player-actions')}>
                <Tippy content={'Bật phát ngẫu nhiên'}>
                    <Button
                        className={cx('btn-control', 'random')}
                        aloneContent={<FontAwesomeIcon className={cx('control-icon')} icon={faShuffle} />}
                    />
                </Tippy>
                <Button
                    onClick={onPrevSong}
                    className={cx('btn-control', 'prev')}
                    aloneContent={<FontAwesomeIcon className={cx('control-icon')} icon={faBackwardStep} />}
                />
                <Button
                    onClick={handlePlaying}
                    className={cx('btn-control', 'play')}
                    aloneContent={
                        <FontAwesomeIcon className={cx('control-icon')} icon={playing ? faCirclePause : faCirclePlay} />
                    }
                />
                <Button
                    ref={nextRef}
                    onClick={onNextSong}
                    className={cx('btn-control', 'next')}
                    aloneContent={<FontAwesomeIcon className={cx('control-icon')} icon={faForwardStep} />}
                />
                <Tippy content={'Bật phát lại tất cả'}>
                    <Button
                        className={cx('btn-control', 'repeat')}
                        aloneContent={<FontAwesomeIcon className={cx('control-icon')} icon={faRepeat} />}
                    />
                </Tippy>
            </div>
            {/* sidebar song  */}
            {children}
            {/* end sidebar song */}
        </div>
    );
}

export default memo(PlayerBoxCenter);
