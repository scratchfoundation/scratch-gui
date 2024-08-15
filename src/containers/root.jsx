import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserSession } from '../actions/sessionActions'; // 세션 액션 가져오기
import GUI from './gui.jsx';

const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

const Root = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const sessionId = getQueryParam('scratchSession');
        console.log('세션 ID:', sessionId);

        if (sessionId) {
            fetch(`/get-user-session?sessionId=${sessionId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('사용자 정보:', data.user);
                        dispatch(setUserSession(data.user)); // 사용자 정보를 리덕스 상태에 설정
                    } else {
                        console.error('사용자 정보를 가져오지 못했습니다:', data.error);
                    }
                })
                .catch(error => {
                    console.error('사용자 정보를 가져오는 중 오류 발생:', error);
                });
        }
    }, [dispatch]);

    return <GUI />;
};

export default Root;
