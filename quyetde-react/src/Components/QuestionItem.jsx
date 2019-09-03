import React from 'react';

const QuestionItem = (props) => {
  return (
    <a className='col-md-12' href={'/questions/' + props.questionId} rel="noopener noreferrer" target='_blank'>

      <div className='row'>

        <div className='col-md-8'>

          <div className='question-info'>

            <p className='title'>{props.content}</p>

          </div>

        </div>

      </div>

    </a>
  )
}

export default QuestionItem;