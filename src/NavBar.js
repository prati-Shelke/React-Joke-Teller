import React from "react";
import {Navbar} from 'react-bootstrap';
import {Container} from 'react-bootstrap';


class NavBar extends React.Component
{

    constructor() 
    {
        super();
        this.state = {
            animate : false
        }
    }

    render()
    {
        return(
            <Navbar fixed="top" bg="dark" expand={false} style={{height:"50px"}}>
                { this.state.animate 
                    ? 
                        <p className="animate__animated animate__heartBeat" style={{color:"red",fontSize:"28px",cursor:"pointer",marginLeft:"650px",marginTop:"-5px"}} onMouseLeave={()=> this.setState({animate:false})}> Joke Teller App </p> 
                    :
                        <p  style={{color:"white",fontSize:"28px",marginLeft:"650px",marginTop:"-5px"}} onMouseEnter={()=> this.setState({animate:true})}> Joke Teller App </p>
                }
            </Navbar>
        )
    }
}

export default NavBar

{/* <Container fluid>
                    
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="start"
                        style={{color:"white"}}
                    ></Navbar.Offcanvas>
                    <Navbar.Text> <label style={{color:"white",fontSize:"28px",marginRight:"700px"}}> Joke Teller App </label></Navbar.Text>
                </Container> */}



