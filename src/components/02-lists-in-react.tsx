import React from "react";

const ReactLists = ({ list, onDeleteItem }) => (
    <>
        <List list={list} onDeleteItem={onDeleteItem} />
    </>
);



const List = ({ list, onDeleteItem }) => {
    return (
        <div>
            <ul>
                {
                    list.map((item) => (
                        <Item item={item} onItemDelete={onDeleteItem} />
                    )
                    )
                }
            </ul>
        </div>
    );
}

const Item = ({ item, onItemDelete }) => {
    // WE CAN USE INLINE HANDLERS
    // IT WORKS LIKE THIS:
    /**
     * WE PASS THIS FUNCTION TO ONCLICK
     * THEN WHEN CLICKED THIS FUNCTION CALLS ONITEMDELETE WHICH IS REACT HOOK FUNCTION
     * WITH PROPER VALUE - VALUE OF ALL ITEM.
     * 
     * IT GOES UP THE CHAIN AND EXECUTES handleDeleteItem FROM APP.TSX
     * WHICH PROPERELY FILTERS LIST.
     */
    const handleItemDelete = () => onItemDelete(item);

    return (
        <li>
            {item.title} {item.url} {item.author} {item.num_comments} {item.points}
            <input value="delete" type="submit" onClick={handleItemDelete} />
        </li>
    );
}

export default ReactLists;