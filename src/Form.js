import React from "react";
import {Formik} from 'formik';

class Form extends React.Component
{

    

    render()
    {
        return(

            <Formik
                initialValues=
                {{
                   Category:'Any',
                   Language : 'en-english',
                   Type:["single","twopart"],
                   From : 0 ,
                   To : 1368 ,
                   Amount:1 ,
            
                }}

        
            
            >
                { (formik) =>
                    (
                        <div className="container" style={{marginTop:"100px"}}>
                            {console.log(formik)}
                            <form onSubmit={Formik.handleSubmit}>
                                <div className="border border-white rounded" >
                                        <div style={{display:"flex"}}>
                                            <label className="label"> Select category / categories : </label>
                                            <div className="border border-white rounded">
                                                <input type="radio" name="Category" value="Any" onChange={formik.handleChange} checked={formik.values.Category === 'Any'}/> Any

                                                <div>
                                                    <input type="radio" name="Category" value="" onChange={formik.handleChange} checked={formik.values.Category != 'Any'}/> Custom
                                                    <input type="checkbox" name="Category" onChange={formik.handleChange} value="Programming"/> Programming
                                                    <input type="checkbox" name="Category" onChange={formik.handleChange} value="Misc"/> Misc
                                                    <input type="checkbox" name="Category" onChange={formik.handleChange} value="Dark"/> Dark
                                                    <input type="checkbox" name="Category" onChange={formik.handleChange} value="Pun"/> Pun
                                                    <input type="checkbox" name="Category" onChange={formik.handleChange} value="Spooky"/> Spooky
                                                    <input type="checkbox" name="Category" onChange={formik.handleChange} value="Christmas"/> Christmas
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{display:"flex"}}>
                                            <label className="label"> Select language : </label>
                                            <div className="border border-white rounded" style={{height:"30px",width:""}}>
                                                <select value={formik.values.Language} name="Language" onChange={formik.handleChange}>
                                                    <option value="cs"> cs-Czech </option>
                                                    <option value="de"> de-German </option>
                                                    <option value="en-english"> en-english </option>
                                                    <option value="es"> es-Spanish </option>
                                                    <option value="fr"> fr-French </option>
                                                    <option value="pt"> pt-Portuguese </option>
                                                </select>
                                            </div>

                                        </div>

                                        <div style={{display:"flex"}}>
                                            <label> Select flags to blacklist : </label>
                                                    (optional)
                                            
                                            <div>
                                                <input type="checkbox"/> nsfw
                                                <input type="checkbox"/> religious
                                                <input type="checkbox"/> political
                                                <input type="checkbox"/> racist
                                                <input type="checkbox"/> sexiest
                                                <input type="checkbox"/> explicit
                                            </div>
                                        </div>

                                        <div style={{display:"flex"}}>
                                            <label className="label"> Select at least one joke type :  </label>
                                            
                                            <div>
                                                <input type="checkbox" name="Type" value="single" onChange={formik.handleChange} defaultChecked={formik.values.Type.map(val=> val==="single")}/> single
                                                <input type="checkbox" name="Type" value="twopart" onChange={formik.handleChange} defaultChecked={formik.values.Type.map(val=> val=="twopart" ? true : false)}/> twopart
                                            </div>
                                        </div>

                                        <div style={{display:"flex"}}>
                                            <label className="label"> Search for a joke that contains this search string :  </label>
                                            
                                            <div>
                                                <input type="text" placeholder="optional"/> 
                                            </div>
                                        </div>

                                        <div style={{display:"flex"}}>
                                            <label className="label"> Search for a joke in this ID range: :  </label>
                                                    (optional)
                                            <div>
                                                From:
                                                <input type="number" name="From" min="0" value={formik.values.From} onChange={formik.handleChange}/> 
                                                To:
                                                <input type="number" name="To" max="1368" value={formik.values.To} onChange={formik.handleChange}/> 
                                            </div>
                                        </div>

                                        <div style={{display:"flex"}}>
                                            <label className="label"> Amout of jokes </label>
                                            <div>
                                                <input type="number" name="Amount" value={formik.values.Amount} onChange={formik.handleChange}/> 
                                            </div>
                                        </div>

                                        <button type="submit" style={{height:"5%",width:"5%"}}> Submit </button>

                                </div>  
                            </form>
                        </div>
                       
                    )
                }
            </Formik>
        )
    }
}

export default Form