import React from "react"

export type BASIC_FUNCTION_COMPONENT = () => React.ReactElement;

export type ListElement = {
    title: string,
    url: string,
    author: string,
    num_comments: number,
    points: number,
    objectID: number,
};