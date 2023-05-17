import React, { Component , Fragment} from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

export class Alerts extends Component {
  
  static propTypes = {
    error: Proptypes.object.isRequired,
    message: Proptypes.object.isRequired
  };

  componentDidUpdate(prevProps){
      const { error, alert, message } = this.props;

      //errors
        if(error !== prevProps.error){
          if(error.msg.name) {
            alert.error(`Name: ${error.msg.name.join()}`);
          }
          if(error.msg.type) {
            alert.error(`Type: ${error.msg.type.join()}`);
          }
          if (error.msg.username) {
            alert.error(error.msg.username.join());
          }
          if (error.msg.non_field_errors){
            alert.error(error.msg.non_field_errors.join());
          }
        }

        //messages
        if(message !== prevProps.message){
          if(message.Delete_medicamento){
            alert.success(message.Delete_medicamento);
          }
        }
        if(message !== prevProps.message){
          if(message.Add_medicamento){
            alert.success(message.Add_medicamento);
          }

        if(message !== prevProps.message){
          if(message.Change_medicamento){
            alert.success(message.Change_medicamento);
          }
        } 
        if(message !== prevProps.message){
          if(message.Login_Success){
            alert.success(message.Login_Success);
          }
        }
        if(message !== prevProps.message){
          if(message.Register_Success){
            alert.success(message.Register_Success);
          }
        }
        if(message !== prevProps.message){
          if(message.Logout_Success){
            alert.success(message.Logout_Success);
          }
        }
          
        if (message.passwordNotMatch) {
          alert.error(message.passwordNotMatch);
        }
        }
    }


  render() {
    return <Fragment />;
    
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
