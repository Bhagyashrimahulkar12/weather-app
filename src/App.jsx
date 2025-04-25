import Header from "./Component/Header";
import NavBar from "./Component/NavBar";
import "./App.css";

function App() {
  return (
    <>
      <div className="relative z-10 ">

        <Header />
        <NavBar  className="min-h-screen  items-center justify-center " />
      </div>
    </>
  );
}

export default App;
