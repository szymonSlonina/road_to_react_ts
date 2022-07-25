import React from "react";

const someText = "some Text";

const welcome = {
    greeting: 'Hey',
    title: 'React',
};

const getTitle: (t: string) => string = (title) => title;

const HelloReact = ({cachedInputText, onSearchChange, children}) => (
    <div>
        <h1>{welcome.greeting} {welcome.title}</h1> {/** JSX JS INVOCATION */}
        <h2>{getTitle("hello React")}</h2> {/** JS FUNCTION INVOCATION */}

        {children}

        <Search cachedInputText={cachedInputText} onSearchChange={onSearchChange}/>
    </div>
);

const Search = ({cachedInputText, onSearchChange}) => {
    return (
        <>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={onSearchChange} value={cachedInputText}/>
        </>
    );
}

export default HelloReact;