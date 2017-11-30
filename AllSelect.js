/*
全选组件参数说名:
onChange: 表单值的回调函数 (value) => {this.setState({data:value})}
value: 控制选中的数据 this.state.data
placeholder: placeholder
style: style
注意：
不在表单内使用该组件，一定要双向绑定value,组件不支持defaultValue属性，普通组件要使用请用value模拟，表单则使用initial属性
*/

import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class AllSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || props.defaultValue || [],               // 选中的value数组
      options: props.children || [],               // option选项
      getAllSelectValue: props.onChange,           // 获得value值
      style: props.style || {},                    // style
      placeholder: props.placeholder || '',        // placeholder

      showSearch: props.showSearch || true,        // 是否可以输入值搜索
      allowClear: props.allowClear || true,        // 是否展示删除按钮
      defaultActiveFirstOption: props.defaultActiveFirstOption || true,
      disabled: props.disabled || false,
      labelInValue: props.labelInValue || false,
      notFoundContent: props.notFoundContent || 'Not Found',
      filterOption: props.filterOption || true,
      onSearch: props.onSearch,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      value: nextProps.value || nextProps.defaultValue || [],

      options: nextProps.children || [],
      getAllSelectValue: nextProps.onChange,
      style: nextProps.style || {},
      placeholder: nextProps.placeholder || '',

      showSearch: nextProps.showSearch || true,
      allowClear: nextProps.allowClear || true,
      defaultActiveFirstOption: nextProps.defaultActiveFirstOption || true,
      disabled: nextProps.disabled || false,
      labelInValue: nextProps.labelInValue || false,
      notFoundContent: nextProps.notFoundContent || 'Not Found',
      filterOption: nextProps.filterOption || true,
      onSearch: nextProps.onSearch
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

  // onSearch回调
  onSearch = (value) => {
    if (this.exist(this.state.onSearch)) {
      this.state.onSearch(value)
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
    const { options, style, value, placeholder, defaultValue, allowClear, showSearch, defaultActiveFirstOption,
      disabled, labelInValue, notFoundContent, filterOption
     } = this.state;

    return (
      <Select
        className="maxHeight"               // 限制高度不超过四行选项的class类
        showSearch={showSearch}             // 可以输入值搜索
        optionFilterProp="children"         // 搜索内容在option范围内
        style={style}
        mode="multiple"
        allowClear={allowClear}             // 允许清除选项
        value={value}
        onChange={this.handleChange}
        placeholder={placeholder}
        defaultActiveFirstOption={defaultActiveFirstOption}
        disabled={disabled}
        labelInValue={labelInValue}
        notFoundContent={notFoundContent}
        filterOption={filterOption}
        onSearch={this.onSearch}
      >
        {this.arrayConverson(options)}
      </Select>
    );
  }
}

export default AllSelect;
