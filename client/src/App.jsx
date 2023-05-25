import { Container } from "react-bootstrap";
import { BrowserRouter as Browser} from "react-router-dom";

import Header from "./components/Header";
import Router from "./Router";


function App() {

  return (
    <Browser>
      <Header />
      <Container className="mt-4">
        <Router />
      </Container>
    </Browser>
  );
}

export default App;
