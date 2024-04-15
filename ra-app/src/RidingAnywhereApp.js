import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import AddBike from "./RidingAnywhere-client/page/AddBike";
import HomePage from "./RidingAnywhere-client/page/HomePage";
import LoginPage from "./RidingAnywhere-client/page/LoginPage";
import SignupPage from "./RidingAnywhere-client/page/SignupPage";
import MyPage from "./RidingAnywhere-client/page/MyPage";
import CrewManager from "./RidingAnywhere-client/page/CrewManager";
import CrewJoinBoard from "./RidingAnywhere-client/page/CrewJoinBoard";

const RidingAnywhereApp = () => {
  document.title = "Riding AnyWhere";

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Navigate to="/RA/Home" />}></Route>
        <Route path="/RA/Home" element={<HomePage />}></Route>
        <Route path="/RA/Login" element={<LoginPage />}></Route>
        <Route path="/RA/AddBike" element={<AddBike />}></Route>
        <Route path="/RA/SignUp" element={<SignupPage />}></Route>
        <Route path="/RA/AddBike" element={<AddBike />}></Route>
        <Route path="/RA/MyPage" element={<MyPage/>}></Route>
        <Route path="/CR/Manager" element={<CrewManager/>}></Route>
        <Route path="/CR/Join" element={<CrewJoinBoard/>}></Route>
      </Routes>
    </Container>
  );
};

export default RidingAnywhereApp;
