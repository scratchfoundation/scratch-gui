import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import appTarget from '../app-target';
import styles from './credits.css';
import {getInitialDarkMode} from '../../lib/tw-theme-hoc.jsx';

import fosshostLogo from './fosshost-light.png';
import UserData from './users';

/* eslint-disable react/jsx-no-literals */

const User = ({image, text, href}) => (
    <a
        className={styles.user}
        href={href}
    >
        <img
            className={styles.userImage}
            src={image}
            width="60"
            height="60"
        />
        <div className={styles.userInfo}>
            {text}
        </div>
    </a>
);
User.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};

const UserList = ({users}) => (
    <div className={styles.users}>
        {users.map((data, index) => (
            <User
                key={index}
                {...data}
            />
        ))}
    </div>
);

const Credits = () => (
    <main className={styles.main}>
        <header className={styles.headerContainer}>
            <h1 className={styles.headerText}>
                {'TurboWarp Credits'}
            </h1>
        </header>
        <section>
            <h2>{'Fosshost'}</h2>
            <p>
                <a href="https://fosshost.org/">Fosshost</a> provides free high quality hosting services to open source projects, including TurboWarp.
                Consider <a href="https://fosshost.org/donate">donating</a> to them to support their work.
            </p>
            <a href="https://fosshost.org/">
                <img
                    src={fosshostLogo}
                    width="250"
                    height="125"
                />
            </a>
        </section>
        <section>
            <h2>{'Translators'}</h2>
            <UserList users={UserData.translators} />
        </section>
        <section>
            <h2>{'Addons'}</h2>
            <p>Includes some translators as well.</p>
            <UserList users={UserData.addons} />
        </section>
    </main>
);

document.body.setAttribute('theme', getInitialDarkMode() ? 'dark' : 'light');

ReactDOM.render(<Credits />, appTarget);
