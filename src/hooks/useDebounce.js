import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(timerId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}

useDebounce.propsTypes = {
    value: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired,
};

export default useDebounce;
