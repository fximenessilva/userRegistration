/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

export default ({
  title, subtitle, onClickAction, btnTitle,
}) => (
  <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {subtitle}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal"
            onClick={onClickAction}
          >
            {btnTitle}

          </button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
);
