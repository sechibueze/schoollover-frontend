import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProject } from '../../_actions/ProjectActions';
import Alert from '../Alert/Alert';
import { CREATE_PROJECT } from '../../_actions/types';

const AddProject = ({ createProject, projectDelta, dismiss}) => {
    const [data, setData] = useState({
        title: '',
        caption: '',
        description: '',
        due_date: ''
    }) 
    const handleChange = ({ target }) => {
        const { name, value} = target;
        return setData(prev => ({
            ...data,
            [name] : value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        return createProject(data)
    }
    const dismissModal = () => {if (projectDelta !== null) dismiss()}
    useEffect(dismissModal, [projectDelta])

    const { title, caption, description} = data;
    return ( 
        <form onSubmit={handleSubmit}>
            <Alert origin={CREATE_PROJECT} />
            <div className="form-group">
                <label htmlFor="title"> Project title<sup>*</sup></label>
                <input type="text" name="title" value={title} onChange={handleChange} id="title" className="form-control" required placeholder="Give this project a fitting title" />
            </div>
            <div className="form-group">
                <label htmlFor="caption"> Project caption<sup>*</sup></label>
                <textarea name="caption" cols="10" rows="3" maxLength="50" value={caption} onChange={handleChange} id="caption" className="form-control" required placeholder="Short caption" />
            </div>

            <div className="form-group">
                <label htmlFor="description"> Project description<sup>*</sup></label>
                <textarea name="description" cols="10" rows="5" value={description} onChange={handleChange} id="description" className="form-control" required placeholder="Short description" />
            </div>

            <div className="form-group">
                <label htmlFor="due_date"> Project Due data<sup>*</sup></label>
                <input type="date" name="due_date" onChange={handleChange} id="due_date" className="form-control" required />
                <span className='tip'>When do you need the funds</span> 
            </div>



            <button type="submit" className='btn btn-primary'> Create </button>
        </form>
     );
}
AddProject.propTypes = {
    createProject: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    projectDelta: state.project.projectDelta,
})
export default connect(mapStateToProps, { createProject })(AddProject);