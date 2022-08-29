import musics from '@/assets/music';
import { createContext } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const fakeApi = [
        {
            id: 1,
            title: 'Ai đưa em về',
            song: musics.song1,
            imageSong: musics.image1,
            singer: 'TIA, Lê Thiện Hiếu',
        },
        {
            id: 2,
            title: 'Chạy ngay đi',
            song: musics.song2,
            imageSong: musics.image2,
            singer: 'Sơn Tùng M-TP',
        },
        {
            id: 3,
            title: 'Chúng Ta Không Giống Nhau / 我们不一样',
            song: musics.song3,
            imageSong: musics.image3,
            singer: 'Đại Tráng',
        },
        {
            id: 4,
            title: 'Dáng em',
            song: musics.song4,
            imageSong: musics.image4,
            singer: 'Dương Edward',
        },
        {
            id: 5,
            title: 'Hãy trao cho anh',
            song: musics.song5,
            imageSong: musics.image5,
            singer: 'Sơn Tùng M-TP',
        },
        {
            id: 6,
            title: 'Lạc trôi - Masew Mix',
            song: musics.song6,
            imageSong: musics.image6,
            singer: 'Sơn Tùng M-TP, Masew',
        },
        {
            id: 7,
            title: 'Mông uyên ương hồ điệp',
            song: musics.song7,
            imageSong: musics.image7,
            singer: 'Dương Edward',
        },
        {
            id: 8,
            title: 'Muộn rồi mà sao còn',
            song: musics.song8,
            imageSong: musics.image8,
            singer: 'Sơn Tùng M-TP',
        },
        {
            id: 9,
            title: 'Nụ hồng mông manh',
            song: musics.song9,
            imageSong: musics.image9,
            singer: 'Bích Phương',
        },
        {
            id: 10,
            title: 'Tiny Love',
            song: musics.song10,
            imageSong: musics.image10,
            singer: 'Thịnh Suy',
        },
        {
            id: 11,
            title: 'Tuý',
            song: musics.song11,
            imageSong: musics.image11,
            singer: 'ToFu, Xesi, NamLee, VoVanDuc',
        },
        {
            id: 12,
            title: 'Dù cho mai về sau',
            song: musics.song12,
            imageSong: musics.image12,
            singer: 'buitronglinh',
        },
    ];

    return <GlobalContext.Provider value={{ fakeApi }}>{children}</GlobalContext.Provider>;
}

export { GlobalContext, GlobalProvider };
