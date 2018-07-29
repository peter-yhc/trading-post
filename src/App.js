import React, {Component} from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/es/CssBaseline/CssBaseline';
import ContentFrame from './components/ContentFrame';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <div className="App">
          <ContentFrame/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
