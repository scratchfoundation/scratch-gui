import React from 'react';

// 챗봇 UI의 기본 스타일
const chatbotStyle = {
    position: 'absolute', // 화면에 겹쳐서
    right: '20px',        // 오른쪽에서 20px
    bottom: '80px',       // 아래에서 80px
    width: '300px',
    height: '400px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #007BFF',
    borderRadius: '8px',
    padding: '10px',
    zIndex: 1000,         // 다른 요소들보다 위에 보이도록
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
};

// 챗봇 UI 컴포넌트
class ChatbotPane extends React.Component {
    render() {
        return (
            <div style={chatbotStyle}>
                <h3>AI 어시스턴트</h3>
                <p>안녕하세요! 무엇을 도와드릴까요?</p>
                {/* 나중에 여기에 채팅 입력창 등이 추가됩니다. */}
            </div>
        );
    }
}

export default ChatbotPane;