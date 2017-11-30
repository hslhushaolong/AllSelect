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
  // 获取
  getForm = () => {
    const file = this.props.form.getFieldsValue()
    console.log(file,'file')
  }
  // 清除
  cleForm = () => {
    this.props.form.resetFields()
    const file = this.props.form.getFieldsValue()
    console.log(file,'form')
  }

// 设置
  setForm = () => {
    this.props.form.setFields({userName:{value:['2','4','5']}})
  }
  //组件获取
  getUserName = () => {
    console.log(this.state.userName,'com')
  }
  // 组件清除
  cleUserName = () => {
    this.setState({
      userName:[],
    })
  }
  // 组件设置
  setUserName = () => {
    this.setState({
      userName:['2','4','5']
    })
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <AllSelect
          placeholder="我没有在表单里"
          onChange={this.handleChange}
          style={{width:'30%'}}
          value={this.state.userName}
          >
            {this.state.array.map(item=>(
              <Option value={item.value} key={item.value}>{item.name}</Option>
            ))}
        </AllSelect>
        <br/>
        <Button style={{marginTop: '30px'}} onClick={this.getUserName}>获取表单值com</Button><br/>
        <Button onClick={this.cleUserName}>清空表单值com</Button><br/>
        <Button style={{marginBottom: '30px'}} onClick={this.setUserName}>设置表单值com</Button>
      <Form>
        <FormItem>
          {this.props.form.getFieldDecorator('userName'
          // ,{ initialValue: [] }
        )(
            <AllSelect
              placeholder="我在表单里"
              style={{width:'30%',margin: '0 auto'}}
              >
                {this.state.array.map(item=>(
                  <Option value={item.value} key={item.value}>{item.name}</Option>
                ))}
            </AllSelect>
          )}
        </FormItem>
      </Form>
      <Button onClick={this.getForm}>获取表单值form</Button><br/>
      <Button onClick={this.cleForm}>清空表单值form</Button><br/>
      <Button onClick={this.setForm}>设置表单值form</Button>
      </div>
    );
  }
}
let Appp = Form.create()(App);
ReactDOM.render(<Appp />, document.getElementById('root'));
