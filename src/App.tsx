import { AnimatePresence } from "motion/react";
import { Routes, Route, useLocation } from "react-router";

import { List } from "./pages/List";
import Detail from "./pages/Detail";

const App = () => {
  const location = useLocation();

  return (
    <div className='container mx-auto mt-20 mb-10'>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<List />} />
          <Route path='/detail/:id' element={<Detail />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
