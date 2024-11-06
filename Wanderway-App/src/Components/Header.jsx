import Logo from "./Logo";
import { AiOutlineUser } from "react-icons/ai";

const Header = () =>{
    return(
        <div className="Header-Box" style={{display: 'flex', flexDirection: 'row', padding: '10px',gap: '60%', height: ' 100%', width: '100%'}}>
            <Logo/>
            <div className="Account-details" style={{display: 'flex', flexDirection: 'row',alignItems: 'center' }}>
                <h2>placeholder, names</h2>
                <AiOutlineUser style={{marginLeft: '8px', width: '30px', height: '30px'}}/>
            </div>
        </div>
    );

;}
export default Header;
