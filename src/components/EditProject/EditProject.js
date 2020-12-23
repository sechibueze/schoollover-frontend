import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProjectById } from '../../_actions/ProjectActions';
import Alert from '../Alert/Alert';
import { UPDATE_PROJECT_DATA } from '../../_actions/types';

const EditProject = ({ updateProjectById, projectRecord, projectDelta, dismiss}) => {
    
    const [data, setData] = useState({
        _id: projectRecord._id,
        title: projectRecord.title ,
        caption: projectRecord.caption ? projectRecord.caption :  '',
        description: projectRecord.description ? projectRecord.description :  '',
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
        return updateProjectById(data)
    }
    const _dismiss = () => {if (projectDelta !== null) dismiss()}
    useEffect(_dismiss , [projectDelta])

    const { title, caption, description} = data;
    return ( 
        <form onSubmit={handleSubmit}>
            <Alert origin={UPDATE_PROJECT_DATA} />
            <div className="form-group">
                <label htmlFor="title"> Project Title</label>
                <input type="text" name="title" value={title} onChange={handleChange} id="title" className="form-control" placeholder='hey' />
            </div>
            <div className="form-group">
                <label htmlFor="caption"> Project caption </label>
                <textarea name="caption" cols="10" rows="3" maxLength="50" value={caption} onChange={handleChange} id="caption" className="form-control"  />
            </div>

            <div className="form-group">
                <label htmlFor="description"> Project description </label>
                <textarea name="description" cols="10" rows="5" value={description} onChange={handleChange} id="description" className="form-control" />
            </div>

            <div className="form-group">
                <label htmlFor="due_date"> Project Due data </label>
                <input type="date" name="due_date" onChange={handleChange} id="due_date" className="form-control"  />
                <span className='tip'>When do you need the funds</span> 
            </div>

            <button type="submit" className='btn btn-primary'> Update </button>
        </form>
     );
}
EditProject.propTypes = {
    updateProjectById: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    projectDelta: state.project.projectDelta,
})
export default connect(mapStateToProps, { updateProjectById })(EditProject);