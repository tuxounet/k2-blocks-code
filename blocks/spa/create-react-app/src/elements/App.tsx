import logo from "../logo.svg";

<% for(const element of elements) { %>
import <%= element.name %> from "./<%= element.include %>"
<% } %>


const App = () => {
  return (
    
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
      Default rendering <%= element %>
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
        <li> <%= element.name %></li>
      <% } %>
      </ul>
    </header>
  </div>
     
  );
};
export default App;
