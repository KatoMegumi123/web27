import React from 'react';

const Videos = (props) => {
    return (
        <a className='col-md-12' href={'https://www.youtube.com/watch?v='+props.id} rel="noopener noreferrer" target='_blank'>

            <div className='row'>

                <div className='col-md-4'>

                    <img className="img-responsive" width='100%' alt='' src={props.thumbnail} />

                </div>

                <div className='col-md-8'>

                    <div className='video-info'>

                        <h2 className='title'>{props.title}</h2>

                        <p className='description'>{props.description}</p>

                        <span>View >></span>

                    </div>

                </div>

            </div>

        </a>
    )
};

export default Videos;