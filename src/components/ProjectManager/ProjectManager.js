import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContainer from '../_AuthContainer/AuthContainer';
import Alert from '../Alert/Alert';
import Modal from '../Modal/Modal';
import { getProjectList, deleteProjectById, resetProjectData, toggleProjectVisibility} from '../../_actions/ProjectActions';
import AddProject from '../AddProject/AddProject';
import './ProjectManager.scss';
import EditProject from '../EditProject/EditProject';
import { CREATE_PROJECT, UPDATE_PROJECT_DATA, TOGGLE_PROJECT_VISIBILITY, DELETE_PROJECT } from '../../_actions/types';

const ProjectManager = ({loading, projects,visibilityStatus, getProjectList, resetProjectData, toggleProjectVisibility, deleteProjectById, projectData, projectDelta }) => {
    const [newProjectModal, setNewProjectModal] = useState(false);
    const [editingModal, setEditingModal] = useState(false);
    const [editingData, setEditingData] = useState({ editingProjectData: {}});
    const _getProjectList = () => getProjectList();
    useEffect(_getProjectList, [projectData, projectDelta, visibilityStatus]);
    const openEditingModal = (data) => {
        setEditingModal(true)
        setEditingData(prev => ({...prev, editingProjectData: data}))
    }

    const handleDeleteProject = id => {
        if (window.confirm('Are you sure ?')) {
            return deleteProjectById(id)
        }
    }

    const handleDismissModal = () => {
        resetProjectData()
        setNewProjectModal(false)
        setEditingModal(false)
    }
    const { editingProjectData } = editingData;
    return ( 
        <AuthContainer>
           
           {
               newProjectModal && (
                <Modal 
                    dismiss={() => handleDismissModal()}
                    isOpen={newProjectModal}
                    title='Create Project'
                    component={<AddProject dismiss={() => handleDismissModal()}/>}
                />
               )
           }
            

           {
               editingModal && (
                <Modal 
                    dismiss={() => handleDismissModal()}
                    isOpen={editingModal}
                    title='Editing Project'
                    component={<EditProject projectRecord={editingProjectData} dismiss={() => handleDismissModal()}/>}
                />
               )
            
           }
           <Alert origin={UPDATE_PROJECT_DATA} />
           <Alert origin={CREATE_PROJECT} />
           <Alert origin={DELETE_PROJECT} />
           <Alert origin={TOGGLE_PROJECT_VISIBILITY} />

            <div className='action-menu'>
                <span onClick={() => setNewProjectModal(true)} className='action-menu-item'> New Project </span>
                
            </div>
            {
                !loading && projects.length > 0 && (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Title</th>
                                <th>Visibility </th>
                                <th> Budget </th>
                                <th> Remove </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                projects.map((project, idx) => {
                                    let {_id, title, published } = project;
                                    return (
                                        <tr key={_id}>
                                            <td> {++idx} </td>
                                            <td> <span className='project-title' onClick={() => openEditingModal(project) }>  { title && title} </span> </td>
                                            <td> <span onClick={() => toggleProjectVisibility(_id)} className={`fa fa-eye${!published ? '-slash' : ''} icon`} /> </td>
                                            <td> <Link to={`/budget-manager/${_id}`}  title="Edit project budget" > <span className='fas fa-hand-holding-usd icon' /> </Link>  </td>
                                            
                                            <td> <span onClick={() => handleDeleteProject(_id)} className={`fa fa-trash icon`} /> </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </AuthContainer>
     );
}
 
ProjectManager.propTypes = {
    projects: PropTypes.array.isRequired,
    deleteProjectById: PropTypes.func.isRequired,
    resetProjectData: PropTypes.func.isRequired,
    toggleProjectVisibility: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    projects: state.project.projects,
    projectData: state.project.projectData,
    projectDelta: state.project.projectDelta,
    visibilityStatus: state.project.visibilityStatus,
})

export default connect(mapStateToProps, { getProjectList, toggleProjectVisibility, deleteProjectById, resetProjectData } )(ProjectManager);