import 'bootstrap/dist/css/bootstrap.min.css';
import AccountQuery from './components/AccountQuery'
import AccountGenerator from './components/AccountGenerator'

function App() {
  return (
    <div style={{ display: 'block', backgroundColor: "#333", height: "200vh", marginTop: "0"}}>
      <AccountQuery />
      <AccountGenerator />

    </div>
  );
}

export default App;
