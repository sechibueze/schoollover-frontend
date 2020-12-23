import React, { Fragment, useEffect, useState} from 'react';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SUBMIT_BUDGET } from '../../_actions/types';
import { fetchBudgetItems, addLineItemToBudget, removeLineItemFromBudget, submitProjectBudget } from '../../_actions/BudgetActions';
import Alert from '../Alert/Alert';
import AuthContainer from '../_AuthContainer/AuthContainer';
import './BudgetManager.scss';
const BudgetManager = ({ match, fetchBudgetItems, 
    addLineItemToBudget, removeLineItemFromBudget, 
    submitProjectBudget, budgetItems, budgetSubmission }) => {
    

    let projectId = match.params.projectId;
    const [lineItem, setLineItem] = useState({
        item_name: '',
        unit_cost: '',
        quantity: 0,

    })
    
    // Save a fresh copy of budget from server to local storage
    const _fetchBudgetItems = () => fetchBudgetItems(projectId);
    useEffect(_fetchBudgetItems, [budgetSubmission]);

    const handleAddLineItemToBudget = lineItem => {
        lineItem.id = v4();
        addLineItemToBudget(lineItem)
    }
    
    const calculateTotal = () => {
        let total = 0;
        budgetItems.map((lineItem) => {
            let lt = Number.parseInt(lineItem.quantity) * Number.parseFloat(lineItem.unit_cost);
            total += lt;
            return total;
        })
        return total
    }

    const handleSubmitProjectBudget = e => {
        e.preventDefault();
        const payload = {
            _id: projectId,
            budget: budgetItems
        }
        console.log('Submission ', payload)
        return submitProjectBudget(payload);

    }
 
    const {item_name, unit_cost, quantity } = lineItem;
    return ( 
        <AuthContainer>
            <form onSubmit={handleSubmitProjectBudget}>
                <Alert origin={SUBMIT_BUDGET} />
            
                
                {
                    budgetItems.length > 0  && (
                        <Fragment>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Item</th>
                                        <th>Uniit cost</th>
                                        <th> Quantity </th>
                                        <th> Line total </th>
                                        <th> Remove </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        budgetItems.map((lineItem, idx) => {
                                            let {item_name, unit_cost, quantity, id } = lineItem;
                                            return (
                                                <tr key={idx}>
                                                    <td> { ++idx }  </td>
                                                    <td> { item_name }  </td>
                                                    <td> { unit_cost }  </td>
                                                    <td> { quantity }  </td>
                                                    <td> { Number.parseFloat(unit_cost) * Number.parseInt(quantity)}  </td>
                                                    <td> <span className='fa fa-times icon' onClick={() => removeLineItemFromBudget(id)} />  </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <span className='btn btn-primary'>Grand total: N {calculateTotal()} </span>
                        </Fragment>
                    )
                }

                <div className="form-group">
                    <span > Create your Project Budget </span>
                    <ul className='line-item'>
                        <li>
                            <label htmlFor='item_name'> Item name </label>
                            <input 
                                type="text" 
                                name="item_name" 
                                value={item_name}
                                onChange={e => setLineItem(prev => ({...prev, [e.target.name]: e.target.value}))} 
                                id="item_name" 
                                className="line-item-field" 
                                 
                            />
                        </li>
                        <li>
                            <label htmlFor='quantity'> Quantity </label>
                            <input 
                                type="number" 
                                name="quantity" 
                                value={quantity}
                                onChange={e => setLineItem(prev => ({...prev, [e.target.name]: e.target.value}))} 
                                id="quantity" 
                                min={"1"}
                                step={"1"}
                                className="line-item-field" 
                                 
                            />

                        </li>
                        <li>
                            <label htmlFor='unit_cost'> Unit cost (N) </label>
                            <input 
                                type="number" 
                                name="unit_cost" 
                                value={unit_cost}
                                onChange={e => setLineItem(prev => ({...prev, [e.target.name]: e.target.value}))}  
                                id="unit_cost" 
                                min={"20"}
                                step={"5"}
                                className="line-item-field" 
                                 
                            />
                        </li>
                        
                        <li>
                            <span  
                                className="btn btn-primary" 
                                onClick={() => handleAddLineItemToBudget(lineItem)}
                            > ADD </span>
                        </li>
                    
                    </ul>                    
                </div>



                <button type="submit" className='btn btn-primary'> Save Budget </button>
            </form>
        </AuthContainer>
     );
}
BudgetManager.propTypes = {
    fetchBudgetItems: PropTypes.func.isRequired,
    addLineItemToBudget: PropTypes.func.isRequired,
    removeLineItemFromBudget: PropTypes.func.isRequired,
    submitProjectBudget: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    budgetItems: state.budget.budgetItems,
    budgetSubmission: state.budget.budgetSubmission,
})
export default connect(mapStateToProps, { fetchBudgetItems, addLineItemToBudget, submitProjectBudget,removeLineItemFromBudget })(BudgetManager);