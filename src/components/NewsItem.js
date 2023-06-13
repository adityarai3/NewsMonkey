import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,date} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <img src={!imageUrl?"https://c.ndtvimg.com/2023-06/ks4ekn6g_pat-cummins-australia-afp_625x300_09_June_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className='card-text'><small className='text-muted'>On {new Date(date).toGMTString()}</small></p>
              <a rel = "noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
