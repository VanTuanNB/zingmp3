import classNames from 'classnames/bind';

import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ type, children }) {
    // type is the type of Popper's menu passed through props
    return (
        <div
            className={cx('wrapper', {
                [type]: type,
            })}
        >
            {children}
        </div>
    );
}

export default Wrapper;
