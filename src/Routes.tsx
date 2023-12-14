import{
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { Entrada } from "./pages/Entrada";
import NavLink from "./components/NavLink";
import Financas from "./pages/financeiro"
import Matriz from "pages/Matrix/Matrix";


export function AppRoutes(){
    return (
        <Router>
            <NavLink/>
            <Routes>
                <Route path="/" element={<Navigate to='/entrada' />}/>
                <Route path="/entrada" element={<Entrada/>}/>
                <Route path="/matriz" element={<Matriz/>}/>
                {/* <Route path="/financeiro" element={<Financas />}/> */}
                {/* <Route path='*' element={<NotFound />}/> */}
            </Routes>
        </Router>
    )

}