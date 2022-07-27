//REACT QUERY
//REACT FORMIK
//REACT ROUTER
//TAILWIND FOR REACT
// REACT ICONS

import React from 'react';
import './App.css';

import HelloReact from './components/01-hello-react';
import ReactLists from './components/02-lists-in-react';
import { BASIC_FUNCTION_COMPONENT, ListElement } from './types/types';
import { LIST } from './constants/constants';
import { useSemiPersistentState } from './hooks/hooks';

const App: BASIC_FUNCTION_COMPONENT = () => {

  /**
   * WE CAN USE REACT.USEREDUCER FOR BETTER STATE MANAGEMENT. 
   * INSTEAD OF TELLING EXPLICITLY FROM USESTATE, 
   * USEREDUCER STATE UPDATER FUNCTION DISPATCHES ACTION FOR REDUCER.
   * MOVING FROM IMPERATIVE TO DECLARATIVE PROGRAMMING.
   * 
   * USEREDUCER GETS 2 ARGUMENTS - STATE AND ACTION.
   * ALWAYS RETURN NEW STATE
   * REDUCER ACTION IS ASSOCIATED WITH TYPE. IF TYPE MATCHES CONDITION DO SOMETHING. ELSE THROW ERROR - IMPLEMENTATION IS NOT COVERED.
   * REDUCER GETS INITIAL STATE ARGUMENT.
   * FIRST ITEM OF RETURN IS CURRENT STATE, SECOND IS STATE UPDATER FUNCTION - ALSO CALLED DISPATCHFUNCTION.
   * 
   * GOOD FOR MANY STATE TRANSITION FROM ONE PROP.
   */

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

  //ASYNC DATA EXAMPLE
  /* CLUE HERE
  *   FETCHING OF DATA (GETSYNCSTORIES) IS DONE WITH PROMISE - SO ASYNCHRONOUSLY.
  *
  * WE CAN ADD CONDITIONAL RENDERING. DEPENDING ON SOME PROPERTY  WE CAN DECIDE WHAT PARTO
  * OF COMPONENT TO SHOW
  * 
  * THERE CAN BE MANY USESTATE HOOKS IN ONE REACT COMPONENT.
  * BUT BE CAREFUL WHEN YOU SEE MULTIPLE STATE UPDATER FUNCTIONS. CONDITIONAL STATES CAN LEAD TO IMPOSSIBLE STATES
  * UNDESIRED BEHAVIOR IN UI
  */
  const [isLoading, setIsLoading] = React.useState(false);
  const [asyncStories, setAsyncStories] = React.useState("siemka asynchronicznie");
  const [isError, setIsError] = React.useState(false);

  const getAsyncStories = () => new Promise<any>(
    (resolve) => setTimeout(
      () => resolve({
        data: {
          stories: "siemka asynchronicznie po zmianie !"
        }
      }
      ), 2000)
  );

  React.useEffect(() => {
    getAsyncStories().then(result => {
      setAsyncStories(result.data.stories);
      setIsLoading(true);
    }).catch(() => setIsError(true));
  });

  const handleErrorLoading = () => {
    if(isError){
      return (<p>ERROR</p>);
    } else {
      if(!isLoading){
        return (<p>LOADING</p>);
      } else {
        return (<p>{asyncStories}</p>);
      }
    }
  };

  /**
   * MEMOIZED HANDLER IN REACT
   * USECALLBACK HOOK CREATES FUNCTION (RETURNS FUNCTION) WHICH WE'VE WROTE, AND WHICH IS
   * SUSCEPTIBLE (RERENDERS) FOR ACTIONS SPECIFIED IN FUNCTION
   * 
   * React.useCallback( () => {}, [searchTerm]) // whenever searchTerm gets changed function we've written is marked as changed.
   * 
   * we can then give this evalueated function to React.useEffect for it to reevaluate
   */

  return (
    <div className="App">
      <HelloReact cachedInputText={searchedText} onSearchChange={handleSearchedTextChange}>
        <p>Embedded component. Accessed with children property of HelloReact comopnent.</p>
      </HelloReact>
      <p>Szukany tekst: {searchedText}</p>
      <hr />
      <ReactLists list={filteredList} onDeleteItem={handleDeleteItem} />
      <hr />
      <h2>REACT ASYNC DATA</h2>
      {handleErrorLoading()}

    </div>
  );
}

export default App;
