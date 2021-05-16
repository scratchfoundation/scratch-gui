/* eslint-disable */
// Imported from:
// https://github.com/forkphorus/forkphorus/tree/master/studioview
// With changes to make it work properly in the scratch-gui environment.
// todo: we have to see if we are leaking memory when this is mounted and unmounted, esp. because of event listeners
// todo: use react-intl for translations

import styles from './studioview.css';
import classNames from 'classnames';

/**
 * @class
 */
var StudioView = function (studioId) {
    this.studioId = studioId;
    this.offset = 0;
    this.ended = false;
    this.loadingPage = false;
    this.unusedPlaceholders = [];

    this.root = document.createElement('div');
    this.root.className = styles.studioviewRoot;
    this.projectList = document.createElement('div');
    this.projectList.className = styles.studioviewList;
    this.root.appendChild(this.projectList);

    if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(this.handleIntersection.bind(this), {
            root: this.projectList
        });
        this.loadNextPageObserver = new IntersectionObserver(this.handleLoadNextPageIntersection.bind(this), {
            root: this.projectList
        });
    } else {
        this.intersectionObserver = null;
        this.loadNextPageObserver = null;
    }

    // will be filled in by studioview.jsx
    this.messages = {
        AUTHOR_ATTRIBUTION: '',
        PROJECT_HOVER_TEXT: '',
        LOAD_ERROR: ''
    };
};

/**
 * Add a project to the view.
 * An unused placeholder element may be used, or it may be created.
 */
StudioView.prototype.addProject = function (details) {
    var el;
    if (this.unusedPlaceholders.length) {
        el = this.unusedPlaceholders.shift();
    } else {
        el = this.createPlaceholder();
        this.projectList.appendChild(el);
    }
    this.placeholderToProject(el, details.id, details.title, details.author);
};

/**
 * Create an <img> element that will load only when it becomes visible.
 */
StudioView.prototype.createLazyImage = function (src) {
    var el = document.createElement('img');
    if (this.intersectionObserver) {
        this.intersectionObserver.observe(el);
        el.dataset.src = src;
    } else {
        // then we just won't lazy load it
        el.src = src;
    }
    return el;
};

/**
 * Create a placeholder or placeholder element.
 */
StudioView.prototype.createPlaceholder = function () {
    var el = document.createElement('a');
    el.className = classNames(styles.studioviewProject, styles.studioviewPlaceholder);

    var thumbnail = document.createElement('div');
    thumbnail.className = styles.studioviewThumbnail;

    var title = document.createElement('div');
    title.className = styles.studioviewTitle;

    var author = document.createElement('div');
    author.className = styles.studioviewAuthor;

    el.thumbnailEl = thumbnail;
    el.titleEl = title;
    el.authorEl = author;

    el.appendChild(thumbnail);
    el.appendChild(title);
    el.appendChild(author);

    return el;
};

/**
 * Convert a placeholder element made by createPlaceholder to a project element.
 */
StudioView.prototype.placeholderToProject = function (el, id, title, author) {
    el.className = classNames(styles.studioviewProject, styles.studioviewLoaded);
    el.dataset.id = id;
    el.dataset.title = title;
    el.dataset.author = author;
    el.title = this.messages.PROJECT_HOVER_TEXT.replace('$author', author).replace('$title', title);
    el.href = StudioView.PROJECT_PAGE.replace('$id', id);

    var thumbnailSrc = StudioView.THUMBNAIL_SRC.replace('$id', id);
    var thumbnailImg = this.createLazyImage(thumbnailSrc);
    el.thumbnailEl.appendChild(thumbnailImg);

    el.titleEl.innerText = title;
    el.authorEl.innerText = this.messages.AUTHOR_ATTRIBUTION.replace('$author', author);

    el.addEventListener('click', this.handleClick.bind(this), true);
    el.addEventListener('keydown', this.handleKeyDown.bind(this), true);

    return el;
};

/**
 * Adds an error message to the list.
 */
StudioView.prototype.addErrorElement = function () {
    var el = document.createElement('div');
    el.innerText = this.messages.LOAD_ERROR;
    el.className = styles.studioviewError;
    this.projectList.appendChild(el);
};

StudioView.prototype.handleLoadNextPageIntersection = function (e) {
    for (var i = 0; i < e.length; i++) {
        var intersection = e[i];
        if (intersection.isIntersecting && this.canLoadNext()) {
            this.loadNextPage();
        }
    }
};

// Click a project element or a child of a project element
StudioView.prototype.clickProject = function (el) {
    while (!el.classList.contains(styles.studioviewProject)) {
        el = el.parentNode;
    }
    var id = el.dataset.id;
    this.onselect(id, el);
}

// Called when click is fired on a project element
StudioView.prototype.handleClick = function (e) {
    e.preventDefault();
    this.clickProject(e.target);
};

// Called when keydown is fired on a project element
StudioView.prototype.handleKeyDown = function (e) {
    if (e.keyCode === 13) {
        // treat enter (13) as click
        e.preventDefault();
        this.clickProject(e.target);
    }
};

// Called by the IntersectionObserver when it sees an intersection
StudioView.prototype.handleIntersection = function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var target = entry.target;
            target.src = target.dataset.src;
            target.dataset.src = '';
            target.className = '';
            observer.unobserve(target);
        }
    });
};

/**
 * Determines whether it is safe to attempt to load the next page.
 */
StudioView.prototype.canLoadNext = function () {
    return !this.loadingPage && !this.ended;
};

/**
 * Remove all unused placeholder elements.
 */
StudioView.prototype.cleanupPlaceholders = function () {
    while (this.unusedPlaceholders.length) {
        var el = this.unusedPlaceholders.pop();
        this.projectList.removeChild(el);
    }
};

/**
 * Add placeholder placeholder elements.
 */
StudioView.prototype.addPlaceholders = function () {
    for (var i = 0; i < StudioView.PLACEHOLDER_COUNT; i++) {
        var el = this.createPlaceholder();
        this.unusedPlaceholders.push(el);
        this.projectList.appendChild(el);
    }
};

/**
 * Make changes to the order of projects.
 * Default shuffler does nothing.
 */
StudioView.prototype.shuffler = function (projects) {
    return projects;
};

/**
 * Begins loading the next page.
 */
StudioView.prototype.loadNextPage = function () {
    if (this.loadingPage) {
        throw new Error('Already loading the next page');
    }
    if (this.ended) {
        throw new Error('There are no more pages to load');
    }

    if (this.unusedPlaceholders.length === 0) {
        this.addPlaceholders();
    }
    if (this.loadNextPageObserver) {
        this.loadNextPageObserver.disconnect();
    }
    this.root.setAttribute('loading', '');
    this.loadingPage = true;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function () {
        var rawProjects = xhr.response;
        if (!Array.isArray(rawProjects)) {
            xhr.onerror();
            return;
        }
        var projects = [];
        for (var i = 0; i < rawProjects.length; i++) {
            var p = rawProjects[i];
            projects.push({
                id: p.id,
                title: p.title,
                author: p.username,
            });
        }
        projects = this.shuffler(projects);
        for (var i = 0; i < projects.length; i++) {
            this.addProject(projects[i]);
        }
        this.cleanupPlaceholders();

        if (rawProjects.length === 40) {
            if (this.loadNextPageObserver) {
                this.loadNextPageObserver.observe(this.projectList.lastChild);
            }
        } else {
            this.ended = true;
            this.onend();
        }

        this.offset += projects.length;
        this.loadingPage = false;
        this.root.removeAttribute('loading');

        this.onpageload();
    }.bind(this);

    xhr.onerror = function () {
        this.root.setAttribute('error', '');
        this.cleanupPlaceholders();
        this.addErrorElement();
        this.ended = true;
    }.bind(this);

    var url = StudioView.STUDIO_API
        .replace('$id', this.studioId)
        .replace('$offset', '' + this.offset);
    xhr.open('GET', url);
    xhr.send();
};

StudioView.prototype.getURL = function () {
    return StudioView.STUDIO_PAGE.replace('$id', this.studioId);
};

StudioView.prototype.onselect = function (id, el) { };
StudioView.prototype.onpageload = function () { };
StudioView.prototype.onend = function () { };

StudioView.STUDIO_API = 'https://trampoline.turbowarp.org/proxy/studios/$id/projectstemporary/$offset';

// The URL to download thumbnails from.
// $id is replaced with the project's ID.
StudioView.THUMBNAIL_SRC = 'https://cdn2.scratch.mit.edu/get_image/project/$id_144x108.png';

// The URL for project pages.
// $id is replaced with the project ID.
StudioView.PROJECT_PAGE = 'https://turbowarp.org/$id';

// The URL for studio pages.
// $id is replaced with the studio ID.
StudioView.STUDIO_PAGE = 'https://scratch.mit.edu/studios/$id/';

// The amount of "placeholders" to insert before the next page loads.
StudioView.PLACEHOLDER_COUNT = 9;

export default StudioView;
