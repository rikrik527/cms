import React,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { getPage } from '../../actions/page';

const PageTableItem = (props) => {
    console.log('props',props)
        return(
          <Fragment>
          <tr>
            <td>
             
            </td>
            <td>
              <Link to='/'>Edit</Link>
            </td>{'slug' === "home"
              ? (
                <td>{console.log('home')}</td>
              )
              : (
                <td>
                  <Link to={`/delete-page/${''}`}>Delete</Link>
                </td>
              )}</tr></Fragment>)    
              
      
              }
   



PageTableItem.propTypes = {
    
};

const mapStateToProps = state => ({
    page: state.page})

export default connect(mapStateToProps,{getPage})(PageTableItem)