import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import MenuItem from "../menu-item/menu-item.component.jsx";

import "./directory.styles.scss";

const Directory = ({ sections }) => (
  <div className="directory-menu">
      {
          sections.map(({id, ...otherSectionProps}) => ( //title, imageUrl, size, history
            //title={title} imageUrl={imageUrl} size={size} history={this.props.history}
            <MenuItem key={id} {...otherSectionProps} />
          ))
      }
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);