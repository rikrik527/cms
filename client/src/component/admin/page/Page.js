import React, {Fragment,useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PageTableItem from './PageTableItem';
import {getPage} from '../../actions/page'
import Spinner from '../../layout/Spinner'

const Page = ({getPage,page:{pages,loading,_id},props}) => {
 
  useEffect(() => {
   getPage()
   console.log('Page page',pages,loading,_id,'props',props)
  }, [getPage]);
  
  return loading?<Spinner/>:
    <Fragment>
      <h2 className='page-title'>pages</h2>
      <Link to='/admin/pages/add-pages' className='btn btn-primary'>add new page</Link>
      <br></br>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        
          <PageTableItem key={_id} />  
       
            </tbody>
        
      </table>
    </Fragment>
  
}



Page.propTypes = {};
const mapStateToProps = state => ({page: state.page})

export default connect(mapStateToProps,{getPage})(Page);
