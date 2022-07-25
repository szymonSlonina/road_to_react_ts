import React from 'react';
import './App.css';

import HelloReact from './components/01-hello-react';
import ReactLists from './components/02-lists-in-react';
import { BASIC_FUNCTION_COMPONENT, ListElement } from './types/types';
import { LIST } from './constants/constants';
import { useSemiPersistentState } from './hooks/hooks';

const App: BASIC_FUNCTION_COMPONENT = () => {

  const [changedList, setChangedList] = React.useState(LIST);
  const [searchedText, setSearchedText] = useSemiPersistentState('state', '');
  /* INSTEAD OF THIS BLOCK WE CAN CALL OUR CUSTOM HOOK (CALLED ABOVE)
  // LIFTING STATE - WE CREATE USE STATE REACT HOOK AND HANDLER WHICH WE PASS DOWN TO COMPONENTS.
  const [searchedText, setSearchedText] = React.useState(
    localStorage.getItem('search') || ""
  ); // we create react hook to monitor changes in search input

  // THIS HOOK IS USED WHEN YOU NEED SIDE EFFECT
  // SOMETHING IS HAPPENING WHEN SOMETHING OTHER IS HAPPENING AS A SIDE EFFECT.
  // HERE, WHEREVER SEARCHEDTEXT CHANGES, IT IS SAVED TO LOCAL STORAGE
  // TO BE RETRIEVED AT APP INITIALIZATION.
  React.useEffect(() => {
    localStorage.setItem('search', searchedText)
  }, [searchedText])
  */

  // EVERY TIME SEARCH INPUT IS CHANGED
  /**
   * THIS MAIN COMPONENT GETS RERENDERED (BECAUSE FUNCTION SETSEARCHEDTEXT IS IVOKED)
   * BECAUSE OF THAT FILTEREDLIST BELOW GETS RECALCULATED.
   * THIS IS WHY IT IS POSSIBLE TO ALTER LIST RESULTS.
   */

  const handleSearchedTextChange = e => {
    setSearchedText(e.target.value);
  }

  const handleDeleteItem = item => {
    const newList = changedList.filter(thisItem => thisItem.objectID != item.objectID);

    setChangedList(newList);
  };

  const filteredList: ListElement[] = changedList.filter(item => item.title.toLowerCase().includes(searchedText.toLowerCase()));

  return (
    <div className="App">
      <HelloReact cachedInputText={searchedText} onSearchChange={handleSearchedTextChange}>
        <p>Embedded component. Accessed with children property of HelloReact comopnent.</p>
      </HelloReact>
      <p>Szukany tekst: {searchedText}</p>
      <hr />
      <ReactLists list={filteredList} onDeleteItem={handleDeleteItem}/>
    </div>
  );
}

export default App;
