// Imported from:
// https://github.com/forkphorus/forkphorus/tree/master/studioview
// With changes to make it work properly in the scratch-gui environment.
// todo: we have to see if we are leaking memory when this is mounted and unmounted, esp. because of event listeners
// todo: use react-intl for translations

import styles from './studioview.css';
import classNames from 'classnames';

/**
 * Determines if an element is visible, accounting for parents and their bounding rects.
 */
function isElementVisible(el) {
    // see https://stackoverflow.com/a/21627295
    var rect = el.getBoundingClientRect();
    var top = rect.top;
    var height = rect.height;
    var el = el.parentNode;

    if (rect.bottom < 0) return false;
    if (top > document.documentElement.clientHeight) return false;
    do {
        rect = el.getBoundingClientRect();
        if (top <= rect.bottom === false) return false;
        if ((top + height) <= rect.top) return false;
        el = el.parentNode;
    } while (el != document.body)
    return true;
}

/**
 * @class
 */
var StudioView = function (studioId) {
    this.studioId = studioId;
    this.page = 1;
    this.ended = false;
    this.loadingPage = false;
    this.unusedPlaceholders = [];

    this.root = document.createElement('div');
    this.root.className = styles.studioviewRoot;
    this.projectList = document.createElement('div');
    this.projectList.className = styles.studioviewList;
    this.projectList.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    this.root.appendChild(this.projectList);
    this.setTheme('light');

    if ('IntersectionObserver' in window) {
        this.intersectionObserver = new IntersectionObserver(this.handleIntersection.bind(this), {
            root: this.projectList,
            rootMargin: '25px 0px 25px 0px',
        });
    } else {
        this.intersectionObserver = null;
    }
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
        el.className = styles.studioviewLazy;
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
    el.title = StudioView.PROJECT_HOVER_TEXT.replace('$author', author).replace('$title', title);
    el.href = StudioView.PROJECT_PAGE.replace('$id', id);

    var thumbnailSrc = StudioView.THUMBNAIL_SRC.replace('$id', id);
    var thumbnailImg = this.createLazyImage(thumbnailSrc);
    el.thumbnailEl.appendChild(thumbnailImg);

    el.titleEl.innerText = title;
    el.authorEl.innerText = StudioView.AUTHOR_ATTRIBUTION.replace('$author', author);

    el.addEventListener('click', this.handleClick.bind(this), true);
    el.addEventListener('keydown', this.handleKeyDown.bind(this), true);

    return el;
};

/**
 * Adds an error message to the list.
 */
StudioView.prototype.addErrorElement = function () {
    var el = document.createElement('div');
    el.innerText = StudioView.LOAD_ERROR;
    el.className = styles.studioviewError;
    this.projectList.appendChild(el);
};

// Called when the project list is scrolled
StudioView.prototype.handleScroll = function (e) {
    if (this.canLoadNext() && isElementVisible(this.projectList.lastChild)) {
        this.loadNextPage();
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
    this.root.setAttribute('loading', '');
    this.loadingPage = true;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        // We cannot just set xhr.responseType="document" because the proxy returns text/plain
        var docSource = xhr.response;
        var doc = new DOMParser().parseFromString(docSource, 'text/html');

        var projects = [];
        var projectElements = doc.querySelectorAll('.project');
        /*
        Each project element should be:
        <li class="project thumb item" data-id="12345">
          <a href="/projects/12345/">
            <img class="lazy image" data-original="//cdn2.scratch.mit.edu/get_image/project/12345_144x108.png" width="144" height="108" />
          </a>
          <span class="title">
            <a href="/projects/12345/">Title</a>
          </span>
          <span class="owner" >
            by <a href="/users/Author/">Author</a>
          </span>
        </li>
        */
        for (var i = 0; i < projectElements.length; i++) {
            var project = projectElements[i];
            var id = project.getAttribute('data-id');
            var title = project.querySelector('.title').textContent.trim();
            var author = project.querySelector('.owner a').textContent.trim();
            projects.push({
                id: id,
                title: title,
                author: author,
            });
        }
        projects = this.shuffler(projects);
        for (var i = 0; i < projects.length; i++) {
            this.addProject(projects[i]);
        }
        this.cleanupPlaceholders();

        // All pages except the last have a next page button.
        if (!doc.querySelector('.next-page')) {
            this.ended = true;
            this.onend();
        }

        this.page++;
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
        .replace('$page', '' + this.page);
    xhr.open('GET', url);
    xhr.send();
};

StudioView.prototype.setTheme = function (theme) {
    this.root.setAttribute('theme', theme);
};

StudioView.prototype.getURL = function () {
    return StudioView.STUDIO_PAGE.replace('$id', this.studioId);
};

StudioView.prototype.onselect = function (id, el) { };
StudioView.prototype.onpageload = function () { };
StudioView.prototype.onend = function () { };

// Types of shufflers
function shuffleList(list) {
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (var i = list.length - 1; i > 0; i--) {
        var random = Math.floor(Math.random() * (i + 1));
        var tmp = list[i];
        list[i] = list[random];
        list[random] = tmp;
    }
}
StudioView.Shufflers = {};
StudioView.Shufflers.random = function (groupSize) {
    groupSize = groupSize || Infinity;
    return function (projects) {
        if (groupSize === Infinity) {
            shuffleList(projects);
            return projects;
        }
        var result = [];
        for (var i = 0; i < projects.length; i += groupSize) {
            var group = projects.slice(i, i + groupSize);
            shuffleList(group);
            for (var j = 0; j < group.length; j++) {
                result.push(group[j]);
            }
        }
        return result;
    };
};

// This can be any URL that is a proxy for https://scratch.mit.edu/site-api/projects/in/5235006/1/
// Understandably scratch does not set CORS headers on this URL, but a proxy can set it manually.
// $id will be replaced with the studio ID, and $page with the page.
StudioView.STUDIO_API = 'https://trampoline.turbowarp.org/site-proxy/projects/in/$id/$page/';

// The URL to download thumbnails from.
// $id is replaced with the project's ID.
StudioView.THUMBNAIL_SRC = 'https://cdn2.scratch.mit.edu/get_image/project/$id_144x108.png';

// The URL for project pages.
// $id is replaced with the project ID.
StudioView.PROJECT_PAGE = 'https://scratch.mit.edu/projects/$id/';

// The URL for studio pages.
// $id is replaced with the studio ID.
StudioView.STUDIO_PAGE = 'https://scratch.mit.edu/studios/$id/';

// The text to appear under a project to credit the author of the project.
// $author is replaced with the author's name.
StudioView.AUTHOR_ATTRIBUTION = 'by $author';

// The text to appear when hovering over a project.
// $title becomes the project's title, $author becomes the author's name.
StudioView.PROJECT_HOVER_TEXT = '$title by $author';

// Displayed when the next page of projects could not be loaded.
StudioView.LOAD_ERROR = 'There was an error loading the next page of projects.';

// The amount of "placeholders" to insert before the next page loads.
StudioView.PLACEHOLDER_COUNT = 9;

export default StudioView;
