import './App.css';
import { Hero } from './screens/Hero';
import { MyNomination } from './screens/MyNomination';
import Search  from './screens/Search';
require('dotenv').config()
const port = process.env
function App() {
  return (
    <main className="scroll-container">
      <section>
        <Hero />
      </section>
      <section className="test" id="app" >
      <Search/>
        </section>
      <section className="test" id="nomination"> 
        <MyNomination/>
      </section>
    </main>

  )
}

export default App;
