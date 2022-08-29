import classNames from 'classnames/bind';
import styles from './Introduce.module.scss';
import images from '@/assets/images';
import ButtonMenu from '@/components/Menu/ButtonMenu';

const cx = classNames.bind(styles);

function IntroduceZing({ setShowModal }) {
    const handleShow = () => {
        setShowModal(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('content')}>
                <div className={cx('logo')} style={{ backgroundImage: `url(${images.logo})` }}></div>
                <div className={cx('text')}>
                    <p className={cx('desc')}>
                        Giấy phép mạng xã hội: 314/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 17/7/2015
                    </p>
                    <p className={cx('desc-company')}>Chủ quản: Công Ty Cổ Phần VNG</p>
                    <p className={cx('desc')}>
                        Z06 Đường số 13, phường Tân Thuận Đông, quận 7, thành phố Hồ Chí Minh, Việt Nam
                    </p>
                </div>
                <ButtonMenu onClick={handleShow} className={cx('btn-close')}>
                    Đóng
                </ButtonMenu>
            </div>
        </div>
    );
}

// ngày mai xử lý hide show modal introduce, xây dựng phần aside

export default IntroduceZing;
