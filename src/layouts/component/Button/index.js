import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';

import styles from './Button.module.scss';
import { LiveIcon } from '@/components/Icon';

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            href,
            to,
            primary = false,
            aloneContent = false,
            leftIcon = false,
            rightIcon = false,
            disabled = false,
            live = false,
            active = false,
            children,
            className,
            onClick,
            ...passProps
        },
        ref,
    ) => {
        let Component = 'button';

        const props = {
            onClick,
            ...passProps,
        };

        if (disabled) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith('on') && typeof props[key] === 'function') {
                    delete props[key];
                }
            });
        }

        if (href) {
            Component = 'a';
            props.href = href;
        } else if (to) {
            Component = Link;
            props.to = to;
        }

        const classes = cx('wrapper', {
            [className]: className,
            primary,
            aloneContent,
            leftIcon,
            rightIcon,
            disabled,
            active,
        });

        return (
            <Component ref={ref} className={classes} {...props}>
                {aloneContent ? (
                    <span className={cx('one-icon')}>{children || aloneContent}</span>
                ) : (
                    <div className={cx('more-icon')}>
                        <div className={cx('icon-and-children')}>
                            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                            {children && <span className={cx('children')}>{children}</span>}
                            {live && <LiveIcon className={cx('live')} />}
                        </div>
                        {rightIcon && (
                            <div className={cx('hover-icon')}>
                                {<span className={cx('hover-icon-play')}>{rightIcon}</span>}
                            </div>
                        )}
                    </div>
                )}
            </Component>
        );
    },
);

export default Button;
