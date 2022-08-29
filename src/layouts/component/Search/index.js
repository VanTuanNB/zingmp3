import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '@/components/Popper';
import Button from '@/layouts/component/Button';
import SongItem from '@/components/SongItem';
import { useDebounce } from '@/hooks';

const cx = classNames.bind(styles);

function Search() {
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const inputRef = useRef();

    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounce)}&type=less`)
            .then((response) => response.json())
            .then((data) => setSearchResult(data.data));
    }, [debounce]);

    const handleChangeValue = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClearInput = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleAfterOnClickSearchResult = () => {
        setShowSearchResult(false);
    };

    return (
        <div>
            <HeadlessTippy
                visible={showSearchResult}
                interactive
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h2 className={cx('search-title')}>Gợi ý kết quả</h2>
                            {searchResult.length > 0 && (
                                <>
                                    {searchResult.map((result) => (
                                        <SongItem
                                            onClick={handleAfterOnClickSearchResult}
                                            key={result.id}
                                            data={result}
                                        />
                                    ))}
                                </>
                            )}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => setShowSearchResult(false)}
            >
                <div className={!showSearchResult ? cx('search') : cx('search-have-result')}>
                    <Button
                        to={!!searchValue ? '/search-all' : ''}
                        className={cx('btn-search')}
                        aloneContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    />
                    <input
                        ref={inputRef}
                        value={searchValue}
                        className={cx('search-input')}
                        onChange={handleChangeValue}
                        onFocus={() => setShowSearchResult(true)}
                        spellCheck={false}
                        placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                    />
                    {!!searchValue && (
                        <Button
                            className={cx('search-clear')}
                            onClick={handleClearInput}
                            aloneContent={<FontAwesomeIcon icon={faXmark} />}
                        />
                    )}
                </div>
            </HeadlessTippy>
        </div>
    );
}

// tooltip cho actions
// xây dựng UI cho phần aside

export default Search;
