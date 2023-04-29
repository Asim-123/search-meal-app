import './App.css';
import DisplayCard from './components/display_card/card';
import Appheader from './components/header/appheader';
function App() {
  return (
    <div className="App">
     <Appheader></Appheader>
     <div className ="card-container">  
      <div className ="card">
      <DisplayCard></DisplayCard>
     </div>
     </div>
    </div>
  );
}

export default App;
