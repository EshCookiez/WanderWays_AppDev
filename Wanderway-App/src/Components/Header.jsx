import Logo from "./Logo";

const Header = () =>{
    return(
        <div className="Header-Box" style={{display: 'flex', flexDirection: 'row', gap: '50px', height: ' 100%', width: '100%'}}>
            <Logo/>
            <H2>first name</H2>
            <h2>last name</h2>
        </div>
    );

;}
export default Header;
