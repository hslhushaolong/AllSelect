import React from 'react';
import ReactDOM from 'react-dom';
import AllSelect from './AllSelect.js';
import { Select,Form,Button } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      array:[{value:'1',name:'1'},
      {value:'2',name:'2'},
      {value:'3',name:'3'},
      {value:'4',name:'4'},
      {value:'5',name:'5'},
      {value:'6',name:'6'},
    ],
    userName:[],
    };
  }
  handleChange=(value)=> {
    this.setState({
      userName:value
    })

  }
  onChange = () => {
    const file = this.props.form.getFieldsValue()
    console.log(file,'file')
  }
  onChange2 = () => {
    this.props.form.resetFields()
    this.setState({
      userName:[]
    })
    const file = this.props.form.getFieldsValue()
    console.log(file,'form')
  }
  onChange2 = () => {
    this.props.form.resetFields()
    this.setState({
      userName:[]
    })
    const file = this.props.form.getFieldsValue()
    console.log(file,'form')
  }
  onChange3 = () => {
    this.props.form.setFields({userName:{value:['2','4','5']}})
  }
  render() {
    return (
      <div>
      <Form>
        <FormItem>
          {this.props.form.getFieldDecorator('userName',{ initialValue: [] })(
            <AllSelect
              onChange={this.handleChange}
              style={{width:'30%'}}
              >
                {this.state.array.map(item=>(
                  <Option value={item.value} key={item.value}>{item.name}</Option>
                ))}
            </AllSelect>
          )}
        </FormItem>
      </Form>
      <Button onClick={this.onChange}>获取表单值form</Button><br/>
      <Button onClick={this.onChange2}>清空表单值form</Button><br/>
      <Button onClick={this.onChange3}>设置表单值form</Button>
      </div>
    );
  }
}
let Appp = Form.create()(App);
ReactDOM.render(<Appp />, document.getElementById('root'));
