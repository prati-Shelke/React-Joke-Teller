import React from "react";
import {Formik} from 'formik';
import {Button} from 'react-bootstrap'
import api from './api'
import axios from 'axios'

class JokeForm extends React.Component
{

    constructor() 
    {
        super();
        this.state = {
            isChecked : false ,
            isSubmited : false ,
            isShowAnswer : false ,
            idRange : {} ,
            jokeData : [] ,
            url : `https://v2.jokeapi.dev/joke/`
        }
        this.ResetForm = this.ResetForm.bind(this);
        this.validate = this.validateForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }
    

    componentDidMount = async() =>
    {
        let response = await axios.get('https://v2.jokeapi.dev/info')
        // console.log(response.data.jokes.idRange.en);
        this.setState({idRange : response.data.jokes.idRange})
    }

    //--------------------------------to reset the form to its initial values----------------------------
    ResetForm()
    {
        let result = window.confirm("Do you want to reset the form?")
        result && window.location.reload()
    }

    //-----------------------------------validation for input fields-------------------------------------
    validateForm(values)
    {
        let error = {}
        if (values.Category === '' || values.Category.length === 0)
        {
            document.getElementById('CategoryValidation').className ="col-6 mt-4 border border-danger rounded"
            error = {category:true}
        }
        else
        {
            document.getElementById('CategoryValidation').className ="col-6 mt-4 border rounded"
        }
        
        if(values.Type.length === 0)
        {
            document.getElementById('TypeValidation').className ="col-6 border border-danger rounded"
            error = {type:true}
        }
        else
        {
            document.getElementById('TypeValidation').className ="col-6 border rounded"
        }

        if(values.From === '' || values.To === '' || values.From < 0)
        {
            document.getElementById('searchID').className ="col-6 border border-danger rounded"
            error = {range:true} 
        }
        else
        {
            document.getElementById('searchID').className ="col-6 border rounded"
        }

        if(values.Amount === '' || values.Amount === 0)
        {
            document.getElementById('AmountValidation').className ="col-6 border border-danger rounded" 
            error = {Amount:true} 
        }
        else
        {
            document.getElementById('AmountValidation').className ="col-6 border rounded"
        }
        return error
    }


    //---------------------------------------to fetch data after form submission--------------------------------
    handleSubmit = async(values) =>
    {
    
        if(values.Category !== 'Any')
        {
            this.setState({url : `https://v2.jokeapi.dev/joke/${values.Category}`})
        }
        else
        {
            this.setState({url : `https://v2.jokeapi.dev/joke/Any`})
        }

        let temp = '?'
        if(values.Language !=='en')
        {
            this.setState({url : this.state.url + (`?lang=${values.Language}`)})
            temp = '&'
        }
        else
        {
            this.setState({url : (`https://v2.jokeapi.dev/joke/${values.Category}`)})
        }

        if(values.Flags!='')
        {   
            this.setState({url : this.state.url + (`${temp}blacklistFlags=${values.Flags}`)}) 
            temp = '&'
        }

        if(values.Type.length != 2)
        {
            this.setState({url : this.state.url + (`${temp}type=${values.Type}`)})
            temp = '&'
        }
        
        if(values.SearchString != '')
        {
            this.setState({url : this.state.url + (`${temp}contains=${values.SearchString}`)})
            temp = '&'
        }

        if(values.From !== this.state.idRange[values.Language][0] || values.To !== this.state.idRange[values.Language][1])
        {
            this.setState({url : this.state.url + (`${temp}idRange=${values.From}-${values.To}`)})
            temp = '&'
        }
        
        if(values.Amount != 1)
        {
            this.setState({url : this.state.url + (`${temp}amount=${values.Amount}`)})
            temp = '&'
        }

        // console.log(this.state.url)
        this.setState({isSubmited : true})
        let response = await axios.get(this.state.url)
        this.setState({jokeData : response.data})  

        if(values.Amount!== 1)
        {
            let data = response.data.jokes && response.data.jokes.map(joke =>
                {
                    
                    return{
                    ...joke,
                    isShowAnswer : false
                    }
                }
            )
            // console.log(data)
            this.setState({jokeData : {error:response.data.error , amount : response.data.amount , jokes : data}})
        }
        this.setState({isShowAnswer:false})

        // let temp = {
        //     jokeText : response.data.setup ,
        //     jokeAns : response.data.delivery
        // }
        // this.setState({joke : [...this.state.joke , temp]})
        
    }


    render()
    {
        return(

            <Formik
                initialValues=
                {{
                   Category:'Any',
                   Language : 'en' ,
                   Flags : [] ,
                   Type : ["single","twopart"] ,
                   SearchString : '' ,
                   From : 0 ,
                   To : 319 ,
                   Amount : 1 ,
            
                }}
                validate={this.validate}
                onSubmit={this.handleSubmit}
                
            >
                { (formik) =>
                    (
                        <>
                            <div className="container" style={{marginTop:"110px"}}>
                                {console.log(formik)}
                                <form onSubmit={formik.handleSubmit}>

                                    <div className="card p-3 border rounded" style={{backgroundColor:"#1d252e"}}>

                                            <div className="row mb-4">
                                                <div className="col-3 mt-5 text-start">
                                                    <label className="label" > Select category / categories : </label>
                                                </div>
                                                <div id="CategoryValidation" className="col-6 mt-4 border rounded" style={{backgroundColor:"#19191a"}}>
                                                    <div style={{margin:"10px"}} >
                                                        <input type="radio" name="Category" value="Any" onChange={formik.handleChange} checked={formik.values.Category === 'Any' && true} onClick={()=>this.setState({isChecked:false})}/> <label className="label"> Any </label>

                                                        <div>
                                                            <input type="radio" id="custom" checked={formik.values.Category!=='Any' ? true : false} name="Category" value="" onChange={formik.handleChange} onClick={()=>this.setState({isChecked:true})} /> <label className="label"> Custom </label>
                                                            { this.state.isChecked 
                                                                ?
                                                                    <>
                                                                        <input className='pr-4'  type="checkbox" name="Category" onChange={formik.handleChange} value="Programming" /> <label className="label"> Pragramming </label>
                                                                        <input type="checkbox" name="Category" onChange={formik.handleChange} value="Miscellaneous"/> <label className="label"> Misc </label>
                                                                        <input type="checkbox" name="Category" onChange={formik.handleChange} value="Dark"/> <label className="label"> Dark </label>
                                                                        <input type="checkbox" name="Category" onChange={formik.handleChange} value="Pun"/> <label className="label"> Pun </label>
                                                                        <input type="checkbox" name="Category" onChange={formik.handleChange} value="Spooky"/> <label className="label"> Spooky </label>
                                                                        <input type="checkbox" name="Category" onChange={formik.handleChange} value="Christmas"/> <label className="label"> Christmas </label>
                                                                    </>  
                                                                :
                                                                    <>
                                                                        <input className='pr-4' style={{cursor:"not-allowed"}} type="checkbox" name="Category" onChange={formik.handleChange} value="Programming" disabled/> <label className="labeld"> Pragramming </label>
                                                                        <input type="checkbox" name="Category" onChange={formik.handleChange} value="Miscellaneous" disabled/> <label className="labeld"> Misc </label>
                                                                        <input type="checkbox" name="Category" onChange={formik.handleChange} value="Dark" disabled/> <label className="labeld"> Dark </label>
                                                                        <input type="checkbox" name="Category" onChange={formik.handleChange} value="Pun" disabled/> <label className="labeld"> Pun </label>
                                                                        <input type="checkbox" name="Category" onChange={formik.handleChange} value="Spooky" disabled/> <label className="labeld"> Spooky </label>
                                                                        <input type="checkbox" name="Category" onChange={formik.handleChange} value="Christmas" disabled/> <label className="labeld"> Christmas </label>
                                                                    </>  
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-3">
                                                    <label className="label" style={{paddingTop:"10px"}}> Select language : </label>
                                                </div>

                                                <div className="col-6 border rounded" style={{backgroundColor:"#19191a"}}>
                                                    <select value={formik.values.Language} name="Language" onClick={()=>{this.state.idRange[formik.values.Language] && (formik.values.To = this.state.idRange[formik.values.Language][1]);(formik.values.From = this.state.idRange[formik.values.Language][0])}} onChange={formik.handleChange} style={{margin:"10px",width:"20%"}}>
                                                        <option value="cs"> cs-Czech </option>
                                                        <option value="de"> de-German </option>
                                                        <option value="en"> en-english </option>
                                                        <option value="es"> es-Spanish </option>
                                                        <option value="fr"> fr-French </option>
                                                        <option value="pt"> pt-Portuguese </option>
                                                    </select>
                                                </div>

                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-3 ">
                                                    <label className="label" style={{paddingTop:"10px"}}> Select flags to blacklist : </label>
                                                </div>

                                                <div className="col-6 border rounded" style={{backgroundColor:"#19191a"}}>
                                                    <div style={{margin:"10px"}}>
                                                        <label className="label"> (optional) </label> 
                                                        <input type="checkbox" name="Flags" onChange={formik.handleChange} value="nsfw"/> <label className="label"> nsfw </label>
                                                        <input type="checkbox" name="Flags" onChange={formik.handleChange} value="religious"/> <label className="label"> religious </label>
                                                        <input type="checkbox" name="Flags" onChange={formik.handleChange} value="political"/> <label className="label"> political </label>
                                                        <input type="checkbox" name="Flags" onChange={formik.handleChange} value="racist"/> <label className="label"> racist </label>
                                                        <input type="checkbox" name="Flags" onChange={formik.handleChange} value="sexiest"/> <label className="label"> sexiest </label>
                                                        <input type="checkbox" name="Flags" onChange={formik.handleChange} value="explicit"/> <label className="label"> explicit </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-3">
                                                    <label className="label" style={{paddingTop:"10px"}}> Select at least one joke type :  </label>
                                                </div>
                                                
                                                
                                                <div id="TypeValidation" className="col-6 border rounded" style={{backgroundColor:"#19191a"}}>
                                                    <div style={{margin:"10px"}}>
                                                        <input type="checkbox" id="single" name="Type" value="single" onChange={formik.handleChange} checked={(formik.values.Type).includes('single') && true}/> <label className="label"> single </label>
                                                        <input type="checkbox" id="twopart" name="Type" value="twopart" onChange={formik.handleChange} checked={(formik.values.Type).includes('twopart') && true}/> <label className="label"> twopart </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4">

                                                <div className="col-3">
                                                    <label className="label" > Search for a joke that contains this search string :  </label>
                                                </div>
                                               
                                                
                                                <div className="col-6 border rounded" style={{backgroundColor:"#19191a"}}>
                                                    <input type="text" name="SearchString" value={formik.values.SearchString} onChange={formik.handleChange} placeholder="optional" style={{margin:"8px"}}/> 
                                                </div>
                                            </div>

                                            <div className="row mb-4">
                                                <div className="col-3">
                                                    <label className="label"> Search for a joke in this ID range :  </label>
                                                </div>
                                                     
                                                <div id="searchID" className="col-6 border rounded" style={{backgroundColor:"#19191a"}}>
                                                    <div style={{margin:"8px"}}>
                                                        <label className="label"> (optional) </label>
                                                        <label className="label"> From : </label>:
                                                        <input type="number" style={{width:"10%",marginRight:"10px"}} name="From" min="0" max={this.state.idRange[formik.values.Language] && this.state.idRange[formik.values.Language][1]} 
                                                        value={formik.values.From}  onChange={formik.handleChange}
                                                        /> 
                                                        
                                                        <label className="label"> To : </label>
                                                        <input type="number" style={{width:"10%"}} name="To" min="0" max={this.state.idRange[formik.values.Language] && this.state.idRange[formik.values.Language][1]} 
                                                        // defaultValue={this.state.idRange[formik.values.Language] && this.state.idRange[formik.values.Language][1]} 
                                                        value={formik.values.To} 
                                                        onChange={formik.handleChange}/> 
                                                        
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-4" style={{marginBottom:"40px"}}>
                                                <div className="col-3">
                                                    <label className="label" style={{paddingTop:"10px"}}> Amout of jokes : </label>
                                                </div>
                                                
                                                <div id="AmountValidation" className="col-6 border rounded" style={{backgroundColor:"#19191a"}}>
                                                    <input type="number" data-testid="amount" name="Amount" style={{margin:"8px",width:"10%"}} min="1" value={formik.values.Amount} onChange={formik.handleChange}/> 
                                                </div>
                                            </div>
                                    </div>  
                                    <div style={{textAlign:"center",margin:"30px"}}>
                                        <Button variant="light" onClick={this.ResetForm}> Reset Form</Button> &nbsp;&nbsp;
                                        <Button variant="light" type="submit"> Submit </Button>
                                    </div>
                                </form>
                            </div>

                            <div className="container card border border-white rounded" style={{backgroundColor:"#1d252e",marginBottom:"200px"}}>
                    
                                <h5 className="mt-3" style={{color:"white"}}>{`</>`}Result</h5>
                                <hr style={{height:"5px",color:"#8307f8"}}></hr>
                            
                                {(this.state.isSubmited) &&
                                <>
                                        { (formik.isValid === true && this.state.jokeData.error!==true)
                                            ?
                                                <>
                                                    {(formik.values.Amount === 1) 
                                                        ?
                                                            <>
                                                            {(this.state.jokeData.type === "twopart")
                                                                ?
                                                                    <div style={{color:"white",height:"100px",margin:"30px 20px"}}>
                                                                        <label> {this.state.jokeData.setup} </label><br/>
                                                                        { this.state.isShowAnswer!=true 
                                                                            ?
                                                                                <button id="btn" type="submit" style={{margin:"15px 0px"}} className="btn btn-danger" onClick={()=>this.setState({isShowAnswer:true})}> show Answer</button>
                                                                            : 
                                                                                <label id="ans" style={{margin:"15px 0px",display:"block"}}> {this.state.jokeData.delivery} </label>
                                                                        }
                                                                        
                                                                    </div> 
                                                                : 
                                                                    <div style={{color:"white",height:"100px",margin:"30px 20px"}}>
                                                                        <label> {this.state.jokeData.joke} </label><br/>
                                                                    </div>
                                                            }
                                                            </>
                                                        :
                                                            <>
                                                            
                                                                { this.state.jokeData.jokes && this.state.jokeData.jokes.map((joke,ind) =>
                                                                    <div key={ind}>
                                                                        {joke.type === "twopart" 
                                                                            ?
                                                                                <div style={{color:"white",height:"100px",marginTop:"30px"}}>
                                                                                    <label> {joke.setup} </label><br/>
                                                                                    { this.state.jokeData.jokes[ind].isShowAnswer!=true 
                                                                                        ?
                                                                                                <button id="btn" type="submit" style={{margin:"15px 0px"}} className="btn btn-danger" onClick={()=> this.setState({isShowAnswer : this.state.jokeData.jokes[ind].isShowAnswer = true})}> show Answer</button>
                                                                                        : 
                                                                                            <label id="ans" style={{display:"block"}}> {joke.delivery} </label>
                                                                                    }
                                                                                    {ind!== formik.values.Amount-1 && <><br/><label>--------------------------------------------------------</label></>}
                                                                                </div>
                                                                            :
                                                                            
                                                                            
                                                                                <div style={{color:"white",height:"100px",marginTop:"30px"}}>
                                                                                    <label> {joke.joke} </label><br/>
                                                                                    {ind!== formik.values.Amount-1 && <><br/><label>--------------------------------------------------------</label></>}
                                                                                </div>
                                                                        }
                                                                        
                                                                       
                                                                    </div>)
                                                                }   
                                                                
                                                            </>
                                                    }
                                                </>
                                                
                                            :
                                            (
                                                <>
                                                    
                                                    {formik.isValid === true && this.state.jokeData.error ===true
                                                        ?
                                                            <div id="error" style={{color:"white",height:"200px",margin:"60px"}}>
                                                                <label > Error 106 - No matching joke found <br/>
                                                                        This error is caused by:<br/>
                                                                        - No jokes were found that match your provided filter(s).<br/>
                                                                        <br/>
                                                                        Additional info: Error while finalizing joke filtering: No jokes were found that match your provided filter(s).<br/>
                                                                </label><br/>
                                                            </div>
                                                        :
                                                            <div id="error" style={{color:"white",height:"200px",margin:"60px"}}>
                                                                <label > Error: <br/>
                                                                        <br/>
                                                                        One or more of the parameters you specified are invalid.<br/>
                                                                        They are outlined with a red border.<br/>
                                                                        <br/>
                                                                        Please correct the parameters and try again.<br/>
                                                                </label><br/>
                                                            </div>
                                                    }
                                                    
                                                </>
                                            
                                            )
                                        }      
                                </>
                                
                                }
                            </div>
                        </>
                       
                    )
                }
            </Formik>
        )
    }
}

export default JokeForm


 