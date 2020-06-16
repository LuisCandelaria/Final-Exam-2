import React from 'react';

function MovieForm( props ){
    return(
        <div key="form" className="form">
            <label htmlFor="title">Title</label>
            <input name="title" id="title" type="text" />
            <label htmlFor="rating">Rating</label>
            <input name="rating" id="rating" type="text" />
            <label htmlFor="year">Year</label>
            <input name="year" id="year" type="text" />
            <button type="button" onClick={props.onclickEvent}>Sumbit!</button>
        </div>
    );
}

export default MovieForm;