import React, { Component } from 'react'
import PropTypes from 'prop-types';

import styles from './data-table.css';

class DataTable extends Component {

    renderTableData() {
      let { data, header } = this.props;
      return data.map((obj, index) => {
        return (
            <tr key={index}>
              <td className={styles.rowNum}>{index + 1}</td>
              {header.map((prop, idx) => {
                  return <td key={idx} className={styles.rowData}>{obj[prop]}</td>
                })
              }
            </tr>
        )
      })
    }

    renderTableHeader() {
      let { header }  = this.props;
      return header.map((key, index) => {
        return <th key={index}>{key}</th>
      })
    }

    render() {
      let data = this.renderTableData();
      let header = this.renderTableHeader();
      return (
        <div className={styles.dataTableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th> </th>
                {header}
              </tr>
            </thead>
            <tbody>
              {data}
            </tbody>
          </table>
        </div>
      )
   }
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DataTable