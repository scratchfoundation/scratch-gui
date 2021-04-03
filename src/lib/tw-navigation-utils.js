import {setProjectId as reduxSetProjectId} from '../reducers/project-state';

const setProjectId = (dispatch, projectId) => {
    // TODO
    dispatch(reduxSetProjectId(projectId));
};

const searchParamsToString = params => {
    let newSearch = params.toString();
    if (newSearch.length > 0) {
        // Add leading question mark
        newSearch = `?${newSearch}`;
        newSearch = newSearch
            // Remove '=' from empty values
            // eslint-disable-next-line no-div-regex
            .replace(/=(?=$|&)/g, '')
            // Decode / and : (common in project_url setting)
            .replace(/%2F/g, '/')
            .replace(/%3A/g, ':');
    }
    return newSearch;
};

/**
 * Change URL search params to something else in place
 * @param {URLSearchParams} params New URLSearchParams
 */
const setSearchParams = params => {
    const newSearch = searchParamsToString(params);
    if (location.search !== newSearch) {
        history.replaceState(null, null, `${location.pathname}${newSearch}${location.hash}`);
    }
};

export {
    setProjectId,
    searchParamsToString,
    setSearchParams
};
