import logo from "../logo.svg";

 
import <%= element %> from "./<%= element %>"
 


const App = () => {
  return (
    
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        rendering <%= element %>
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Use one of 
      </a>
      <ul>
     <<%=element %> />
      </ul>
    </header>
  </div>
     
  );
};
export default App;
