import classNames from 'classnames/bind';

import Button from '@/layouts/component/Button';
import styles from './Advertisement.module.scss';

const cx = classNames.bind(styles);

function Advertisement() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Nghe nhạc không quảng cáo cùng kho nhạc VIP</h1>
            <Button to={'/vip'} aloneContent className={cx('btn-vip')}>
                NÂNG CẤP VIP
            </Button>
        </div>
    );
}

export default Advertisement;
