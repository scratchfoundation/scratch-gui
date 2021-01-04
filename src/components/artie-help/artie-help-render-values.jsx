import React from 'react';
import {defineMessages, injectIntl} from 'react-intl';
import styles from './artie-help.css';

class ArtieHelpRenderValuesComponent extends React.Component{

    constructor(props){
        super(props);
    }
    
    render(){

        const messages = defineMessages({
            artieCurrentValuesTitle: {
                defaultMessage: 'Current values',
                description: 'Current values',
                id: 'gui.menuBar.artie.help.currentValue'
            },
            artieExpectedValuesTitle: {
                defaultMessage: 'Expected values',
                description: 'Expected values',
                id: 'gui.menuBar.artie.help.expectedValue'
            }
        });

        const columns = [
            {
              key: "currentValue",
              name: this.props.intl.formatMessage(messages.artieCurrentValuesTitle),
              width: 20
            },
            {
              key: "expectedValue",
              name: this.props.intl.formatMessage(messages.artieExpectedValuesTitle),
              width: 20
            }
          ];


        return(
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>{this.props.intl.formatMessage(messages.artieCurrentValuesTitle)}</th>
                        <th>{this.props.intl.formatMessage(messages.artieExpectedValuesTitle)}</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.values.map(input => 
                    {
                        return(
                            <tr>
                                <td>{input.inputValue}</td>
                                <td>{input.solutionValue}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        );

    }

}

export default injectIntl(ArtieHelpRenderValuesComponent);