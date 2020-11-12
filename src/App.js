import './App.css';
import { Route, Link } from 'react-router-dom';
import AllNotes from './AllNotes';
import NewNote from './NewNote';
import EditNote from './EditNote';

const App = () => {
  return (
      <div className="App">
          <nav className="navbar App-header" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">NotesQL</Link>
            </div>
            <div className="navbar-end">
              <Link to="/" className="navbar-item">All Notes</Link>
              <Link to="/newnote" className="navbar-item">New Note</Link>
            </div>
          </nav>
          <div className="App-body">
            <Route exact path="/" component={AllNotes} />
            <Route path="/newnote" component={NewNote} />
            <Route path="/note/:id" component={EditNote} />
          </div>
      </div>
  );
}

export default App;
