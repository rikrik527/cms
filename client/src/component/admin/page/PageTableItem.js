import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPage} from '../../actions/page';
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
global.jquery = window.$ = $
require('jquery-ui')
const PageTableItem = props => {
  useEffect(() => {

    sort()
  }, [])
  const sort = () => {
    $('tbody').sortable({
      items: "tr:not('.home')",
      placeholder: "ui-state-hightlight",
      update: function () {
        console.log('update')
        var ids = $('tbody').sortable("serialize")
        var url = "/admin/pages/recorder-page"
        $.post(url, ids)
      }
    })
  }
  props
    .page
    .pages
    .map((value, i) => {
      console.log('returned beffore')
      return (
        <Fragment>
          <tbody key={i}>
            <tr id={`id_${value._id}`} key={i} className={value.slug}>
              <td>
                {value.title}
              </td>
              <td>
                <Link to={`/admin/pages/edit-page/${value.slug}`}>Edit</Link>
              </td>{value.slug === "home"
                ? (
                  <td></td>
                )
                : (
                  <td>
                    <Link to={`/delete-page/${value._id}`}>Delete</Link>
                  </td>
                )}</tr>
          </tbody>
        </Fragment>
      )
    })

}

PageTableItem.propTypes = {};

const mapStateToProps = state => ({page: state.page})

export default connect(mapStateToProps, {getPage})(PageTableItem)