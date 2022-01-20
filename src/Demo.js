import React from "react";
import {Formik} from 'formik';

class Form extends React.Component
{

    

    render()
    {
        return(

            <Formik>
                { (formik) =>
                    (
                        <form className="container" style={{marginTop:"100px"}}>
                            <div className="border border-white rounded">
                                <table >
                                    <tbody>
                                        <div style={{marginTop:"30px"}}>
                                            <tr >
                                                <td>
                                                    <label className="label"> Select category / categories : </label>
                                                </td>

                                                <td>
                                                    <div className="border border-white rounded">
                                                        <input type="radio"/> <label className="label"> Any </label>

                                                        <div>
                                                            <input type="radio"/> <label className="label"> Custom </label>
                                                            <input type="checkbox"/> <label className="label"> Programming </label>
                                                            <input type="checkbox"/> <label className="label"> Misc </label>
                                                            <input type="checkbox"/> <label className="label"> Dark </label>
                                                            <input type="checkbox"/> <label className="label"> Pun </label>
                                                            <input type="checkbox"/> <label className="label"> Spooky </label>
                                                            <input type="checkbox"/> <label className="label"> Christmas </label>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </div>

                                        <tr>
                                            <td>
                                                <label className="label"> Select language : </label>
                                            </td>

                                            <td>
                                                <div className="border border-white rounded">
                                                    <select>
                                                        <option> cs-Czech </option>
                                                        <option> de-German </option>
                                                        <option selected> en-english </option>
                                                        <option> es-Spanish </option>
                                                        <option> fr-French </option>
                                                        <option> pt-Portuguese </option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </form>
                        
                    )
                }
            </Formik>
        )
    }
}

export default Form