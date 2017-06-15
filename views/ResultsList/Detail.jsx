import React from 'react';

export default React.createClass({
  displayName: 'Detail',
  propTypes: {
    item: React.PropTypes.object,
  },

  render() {
    let item           = this.props.item || {};
    let text           = item.text || '';
    let enriched_text  = item.enriched_text || {};
    let entities       = enriched_text.entities || [];
    let records_stolen = item.no_of_records_stolen.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return (
      <div className="widget--detail">
        <h3>{item.title}</h3>
        <div className="widget--original-data">
          <p>{text}</p>
          <div className="widget--source-details">
            <table>
              <tbody>
                <tr className="widget--year">
                  <th>Year</th>
                  <td>{item.year}</td>
                </tr>
                <tr className="widget--type">
                  <th>Type of breach</th>
                  <td>{item.method_of_leak}</td>
                </tr>
                <tr className="widget--quantity">
                  <th>Records stolen</th>
                  <td>{records_stolen}</td>
                </tr>
                <tr className="widget--source">
                  <th>Source</th>
                  <td>
                    <a href={item.source_link} target="_blank">
                      {item.source_name}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="widget--enriched-data">
          {entities.length ? (
            <div>
              <h4>Entities</h4>
              <ul>
                {entities.map((entity) =>
                  <li title={entity.type}
                      key={entity.text + entity.type}
                  >
                    {entity.text}
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <p><em>(No entities extracted)</em></p>
          ) }
        </div>
      </div>
    );
  }
});
