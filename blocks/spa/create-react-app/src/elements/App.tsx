import logo from "../logo.svg";

const App = () => {
  return (
    
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
      Default rendering
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
      <% for(const element of elements) { %>
        <li> <%= element %></li>
      <% } %>
      </ul>
    </header>
  </div>
     
  );
};
export default App;
