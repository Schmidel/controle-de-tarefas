import{
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { Entrada } from "./pages/Entrada";
import NavLink from "./components/NavLink";


export function AppRoutes(){
    return (
       
        <Router>
            <NavLink/>
            <Routes>
                <Route path="/" element={<Navigate to='/entrada' />}/>
                <Route path="/entrada" element={<Entrada/>}/>
                {/* <Route path='*' element={<NotFound />}/> */}
            </Routes>
            
        </Router>
       
    )

}