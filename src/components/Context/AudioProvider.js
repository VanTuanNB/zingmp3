import { useRef, useState, useEffect, createContext, useCallback, useContext } from 'react';
import { GlobalContext } from '@/components/Context/GlobalProvider';
const AudioContext = createContext();

function AudioProvider({ children }) {
    const { fakeApi } = useContext(GlobalContext);
    const audioRef = useRef();
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0);
    const [toggleVolume, setToggleVolume] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [lengthSong, setLengthSong] = useState(0);
    const [progressSong, setProgressSong] = useState(0);
    const [sourceSong, setSourceSong] = useState(() => {
        return fakeApi[0];
    });

    const getLocalStorageVolume = JSON.parse(localStorage.getItem('storageVolume')) ?? [];

    useEffect(() => {
        if (playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [playing]);

    useEffect(() => {
        setVolume((volume) => {
            audioRef.current.volume = volume;
            return volume;
        });
    }, [volume]);

    useEffect(() => {
        setToggleVolume((toggleVolume) => {
            const value = getLocalStorageVolume.length > 0 ? getLocalStorageVolume[2].volumeAudio : '1.0';
            if (toggleVolume) {
                audioRef.current.volume = value;
            } else {
                audioRef.current.volume = 0;
            }
            return toggleVolume;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleVolume]);

    useEffect(() => {
        const value = getLocalStorageVolume.length > 0 ? getLocalStorageVolume[2].volumeAudio : '1.0';
        audioRef.current.volume = value;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {}, [lengthSong]);

    const handleSeekSong = useCallback((data) => {
        audioRef.current.currentTime = data;
    }, []);

    // console.log(currentIndexStateSong);

    const value = {
        // play or pause
        playing,
        setPlaying,
        // change sidebar volume
        volume,
        setVolume,
        // toggle icon volume
        toggleVolume,
        setToggleVolume,
        // current time
        currentTime,
        // length song
        lengthSong,
        progressSong,
        handleSeekSong,
        setCurrentTime,
        sourceSong,
        setSourceSong,
        audioRef,
    };

    const handleTimeUpdate = useCallback(() => {
        setCurrentTime(audioRef.current.currentTime);
        const progressSongPercent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgressSong(progressSongPercent);
    }, []);

    // console.log(sourceSong);

    return (
        <AudioContext.Provider value={value}>
            {children}
            <div style={{ width: '0', height: '0' }}>
                <audio
                    onTimeUpdate={handleTimeUpdate}
                    ref={audioRef}
                    onLoadedMetadata={() => {
                        setLengthSong(audioRef.current.duration);
                    }}
                    // cần tối ưu thêm phần nhấn next or prev thì tự động play nhạc
                    onCanPlay={() => {
                        // set play song when user onclick btn next or prev song
                        setPlaying(true);
                        audioRef.current.play();
                    }}
                    preload="auto"
                    src={sourceSong.song}
                />
            </div>
        </AudioContext.Provider>
    );
}

export { AudioProvider, AudioContext };
// tối ưu hoá code, các component đang re-render lại code sau mỗi lần audio playing
