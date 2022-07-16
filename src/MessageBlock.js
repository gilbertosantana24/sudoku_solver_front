import React from "react";

const MessageBlock = ({ message }) => {
    if (!message) {
        return <div>Loading...</div>;
    }
    return (
        <>
        <h1>{message}</h1>
        </>
    );
    }
export default MessageBlock;