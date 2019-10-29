import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PageTableItem from './PageTableItem';
import {getPage} from '../../actions/page'
import Spinner from '../../layout/Spinner'

import 'jquery-ui/ui/core'
import 'jquery-ui/ui/data'
import 'jquery-ui/ui/disable-selection'
import 'jquery-ui/ui/effect'
import 'jquery-ui/ui/escape-selector'
import 'jquery-ui/ui/focusable'
import 'jquery-ui/ui/form'
import 'jquery-ui/ui/form-reset-mixin'
import 'jquery-ui/ui/ie'
import 'jquery-ui/ui/jquery-1-7'
import 'jquery-ui/ui/keycode'
import 'jquery-ui/ui/labels'
import 'jquery-ui/ui/plugin'
import 'jquery-ui/ui/position'
import 'jquery-ui/ui/safe-active-element'
import 'jquery-ui/ui/safe-blur'
import 'jquery-ui/ui/scroll-parent'
import 'jquery-ui/ui/tabbable'
import 'jquery-ui/ui/unique-id'
import 'jquery-ui-sortable'

import $ from 'jquery'
import {get} from 'http';
global.jquery = window.$ = $
require('jquery-ui')

const Page = ({
  getPage,
  page: {
    loading,
    pages
  }
}) => {
  const id = pages.map(page => page._id)
  useEffect(() => {
    getPage()
    console.log('Page page', loading, id)
  }, [getPage]);

  return loading
    ? <Spinner/>
    : <Fragment>
      <h2 className='page-title'>pages</h2>
      <Link to='/admin/pages/add-pages' className='btn btn-primary'>add new page</Link>
      <br></br>
      <table key={id} className='table table-striped'>
        <thead>
          <tr className="home">
            <th>Title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <PageTableItem key={id}/>

      </table>
    </Fragment>

}

Page.propTypes = {};
const mapStateToProps = state => ({page: state.page})

export default connect(mapStateToProps, {getPage})(Page);
