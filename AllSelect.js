/*
全选组件参数说名:
onChange: 表单值的回调函数 (value) => {this.setState({data:value})}
data: 控制选中的数据 this.state.data
placeholder: placeholder
style: style
注意：
表单方法form.getFieldsValue()获取值可用，form.resetFields()重置，设置值等方法不可用，要用传入data的state状态控制
*/

import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class AllSelect extends React.Component {
  constructor(props) {
    super(props);
    console.log('this.props.value',this.props.value);
    this.state = {
      defaultValue: this.props.defaultValue || [],
      value: this.props.value || [],               // 选中的value数组
      options: props.children || [],               // option选项
      getAllSelectValue: props.onChange,           // 获得value值
      style: props.style || {},                    // style
      placeholder: props.placeholder || '',        // placeholder
    };
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('nextProps.value',nextProps.value);

    this.setState({
      defaultValue: nextProps.defaultValue || [],
      value: nextProps.value || [],
      options: nextProps.children || [],
      getAllSelectValue: nextProps.onChange,
      style: nextProps.style || {},
      placeholder: nextProps.placeholder || '',
    });
  }

  // 检测是否存在
  exist = (prop) => {
    if (prop != null) {            // 检测是否是Null或者undefined
      return true;
    } else {
      return false;
    }
  }

  // 数组格式转换
  arrayConverson = (arra) => {
    if (arra.length!==0) {      // 如果options数组不为空，就在第一位加上全选项
      arra.unshift(<Option value="allSelect" key="allSelect">全选</Option>)
    }
    return arra
  }

  // 选值的回调
  handleChange=(value) => {
      const { options, getAllSelectValue } = this.state;
      if (value.indexOf('allSelect') !== -1) {   // 如果选中了全选，则value设置为选中全部数组
        const store = [];
        for (let i = 1; i < options.length; i++) {
          store.push(options[i]['props']['value']);
        }
        console.log('handleChange',{
          value: store,
        });

        this.setState({
          value: store,
        });
        if (this.exist(getAllSelectValue)) {
          getAllSelectValue(store);
          this.triggerChange(store)
        }
      } else {
        if (this.exist(getAllSelectValue)) {
          getAllSelectValue(value);
          this.triggerChange(value)
        }
        this.setState({
          value,
        });
      }
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const { options, style, value, placeholder, defaultValue } = this.state;
    console.log('render', this.state.value);
    return (
      <Select
        defaultValue={defaultValue}
        className="maxHeight"               // 限制高度不超过四行选项的class类
        showSearch                          // 可以输入值搜索
        optionFilterProp="children"         // 搜索内容在option范围内
        style={style}
        mode="multiple"
        allowClear                          // 允许清除选项
        value={value}
        onChange={this.handleChange}
        placeholder={placeholder}
      >
        {this.arrayConverson(options)}
      </Select>
    );
  }
}

export default AllSelect;
