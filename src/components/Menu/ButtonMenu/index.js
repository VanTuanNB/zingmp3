import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ButtonMenu.module.scss';

const cx = classNames.bind(styles);

function ButtonMenu({
    to,
    href,
    className,
    seperate,
    toggleIcon = false,
    leftIcon = false,
    rightIcon = false,
    children,
    onClick,
    ...passProps
}) {
    let Component = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        Component = Link;
        props.to = to;
    } else if (href) {
        Component = 'a';
        props.href = href;
    }

    const classes = cx('wrapper', {
        [className]: className,
        leftIcon,
        rightIcon,
        toggleIcon,
        seperate,
    });

    return (
        <Component className={classes} {...props}>
            {toggleIcon ? (
                <div className={cx('wrapper-toggle-icon')}>
                    {children && <span className={cx('children-toggle')}>{children}</span>}
                    {<span className={cx('toggle-icon')}>{toggleIcon}</span>}
                </div>
            ) : (
                <>
                    {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
                    {children && <span className={cx('children')}>{children}</span>}
                    {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}
                </>
            )}
        </Component>
    );
}

export default ButtonMenu;
