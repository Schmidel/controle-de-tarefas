import{
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { Cronometro } from "./pages/Cronometro";
import { Progresso } from "./pages/Progresso";
import { Entrada } from "./pages/Entrada";
import { Upgrades } from "./pages/Upgrades";
import NotFound from "./components/NotFound";
import NavLink from "./components/NavLink";


export function AppRoutes(){
    return (
       
        <Router>
            <NavLink/>
            <Routes>
                <Route path="/" element={<Navigate to='/entrada' />}/>
                <Route path="/Progresso" element={<Progresso/>}/>
                <Route path="/cronometro" element={<Cronometro/>}/>
                <Route path="/entrada" element={<Entrada/>}/>
                <Route path="/Upgrades" element={<Upgrades/>}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
            
        </Router>
       
    )

}