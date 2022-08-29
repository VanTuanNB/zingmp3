import { memo } from 'react';

import classNames from 'classnames/bind';

import styles from './PlayerControls.module.scss';

import PlayerBoxLeft from '@/layouts/component/PlayerBoxLeft';
import PlayerBoxCenter from '@/layouts/component/PlayerBoxCenter';
import PlayerBoxRight from '@/layouts/component/PlayerBoxRight';
import SidebarSong from '@/layouts/component/SidebarSong';

const cx = classNames.bind(styles);

function PlayerControls() {
    return (
        <div className={cx('wrapper')}>
            <PlayerBoxLeft />

            {/* btn-control control center box */}
            <PlayerBoxCenter>
                <SidebarSong />
            </PlayerBoxCenter>

            {/* playlist control right box */}
            <PlayerBoxRight />
        </div>
    );
}

export default memo(PlayerControls);
