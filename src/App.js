import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import NotFound from './components/NotFound';
import FlashBoard from './components/FlashBoard/FlashBoard';
import NewDeck from './components/NewDeck/NewDeck';
import SavedDeck from './components/SavedDeck/SavedDeck';
import CommentsDashboard from './components/CommentsDashboard/CommentsDashboard';
import Logout from './components/Logout';

function App() {

  return (
<div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/:userId/flashboard" element={<FlashBoard />} />
        <Route exact path="/:userId/newdeck/:dexId" element={<NewDeck />} />
        <Route exact path="/:userId/saveddeck/:id" element={<SavedDeck/>} />
        <Route exact path="/:userId/comments" element={<CommentsDashboard/>} />
        <Route exact path="/:userId/logout" element={<Logout/>} />
       <Route path="*" element={<NotFound/>}/> 
      </Routes>
    </Router>
    </div>
  )
}

export default App;
