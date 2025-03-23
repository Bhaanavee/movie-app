import { useState } from "react";
import heroImage from "./assets/hero.png";
import Search from "./components/Search";

function App() {

  const [searchTerm, setSearchTerm] = useState('')
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src={heroImage} alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
      </div>
    </main>
  );
}

export default App;
