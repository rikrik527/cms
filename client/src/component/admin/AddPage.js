import React,{Fragment,useState} from 'react';
import PropTypes from 'prop-types';
import {Link,withRouter} from 'react-router-dom'
import {addPage} from '../actions/page'
import {connect} from 'react-redux'
const AddPage = ({addPage,history}) => {
  const [ formData , setFormData] = useState({
      title:'',
      slug:'',
      content:''
  })
  const { title,slug,content} = formData
  const onChange = e=>{
     setFormData({...formData,[e.target.name]:e.target.value})
  }
  
    return (
        <Fragment>
        <h2 className='page-title'>Add a page</h2>
        <Link to='/admin/pages' className='btn btn-primary'>Back to all Pages</Link>
        <br></br>
        <form onSubmit={e=>{e.preventDefault()
        addPage(formData,history)}}>
            <div className='form-group'>
                <label htmlFor=''>Title</label>
                <input type='text' className='form-control' name='title' value={title} placeholder='title' onChange={e=>onChange(e)}/>
            </div>
            <div className='form-group'>
                <label htmlFor=''>Slug</label>
                <input type='text' className='form-control' name='slug' value={slug} placeholder='slug' onChange={e=>onChange(e)}/>
            </div>
            <div className='form-group'>
                <label htmlFor=''>Content</label>
                <textarea type='text' className='form-control' 
                cols='30' rows='10'
                name='content' value={content} placeholder='content' onChange={e=>onChange(e)}/>
            </div>
            <button className='btn btn-default'>Submit</button>
        </form>
        </Fragment>
    );
};


AddPage.propTypes = {
    addPage:PropTypes.func.isRequired,
    page:PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    page:state.page
})


export default connect(null,{addPage})(withRouter(AddPage));
