import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const ProjectList = ({projects}) => {

    return (
      <div className="project-list section">
          <Link to={'/project/' + projects.id} key={projects.id}>
            <ProjectSummary project={projects} />
          </Link>
      </div>
    )
}

export default ProjectList
