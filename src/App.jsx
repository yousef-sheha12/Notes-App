import OriginalPage from "./OriginalPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNotes from "./MyNotes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OriginalPage />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
