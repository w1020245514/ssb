import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components'

import './task.scss'

export default class Task extends Component {
  navigateTo(url) {
    Taro.navigateTo({url:url})
  }
  render() {
    return (
      <View className='feed-item'>
        <View className='task-source'>
          <View className='avatar flex1'>
              <Image className='avatar_img' src={this.props.userImgSrc}></Image>
          </View>
          <View className='flex8'>
            <Text className ='name-txt'>{this.props.username}</Text>
            <Text className='level-txt'>Lv1</Text>
            <Text className='school-txt'>{this.props.school}</Text>
          </View>
        </View>
        <View className='feed-content'>
            <View className='answer-body'>
                <View className='top-border'>
                    <Text className='runtag-txt'>{this.props.taskttag}</Text>
                    <Text className='content-txt' onClick={this.navigateTo.bind(this,'/pages/answer/answer')} >{this.props.contentPublic}</Text>
                </View>
                <View className='answer-actions'>
                    <View className='like-dot'>
                        <View>{this.props.goodNum}</View>
                    </View>
                    <View className='comments-dot'>
                        <View>赚{this.props.money}元 </View>
                    </View>
                </View>
            </View>
        </View>
      </View>
    )
  }
}
