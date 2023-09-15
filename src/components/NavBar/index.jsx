import { Menu } from "../Menu"
import style from "./styles.module.css"
import suxLogo from "../../assets/logo_quadrada2.png";
import { Link } from "react-router-dom";

export function NavBar() {


    return (
        <div className={style.container} >
            <div className={style.brand}>
                <Link to="/">
                    <img src={suxLogo} alt="Suxberger Logo"/>
                </Link>
            </div>

            <div className={style.menu}>
                <Menu />
            </div>

            <div className={style.login}>
                LOGIN
            </div>
        </div>
    )
}