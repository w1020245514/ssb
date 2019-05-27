import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import { Provider } from '@tarojs/mobx'
import loginStore from './store/loginStore'
import homeStore from './store/homeStore'
import taskDetailStore from './store/taskDeatilStore'
import './app.scss'

const store = {
  loginStore,
  taskDetailStore,
  homeStore:homeStore
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/login/index',
      'pages/index/index',
      'pages/home/index',
      'pages/taskDetail/index',
      'pages/testUI/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#2A8CE5",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/home/index",
        text: "主页",
        iconPath: "./asset/img/index.png",
        selectedIconPath: "./asset/img/index_focus.png"
      },{
        pagePath: "pages/home/index",
        text: "消息",
        iconPath: "./asset/img/message.png",
        selectedIconPath: "./asset/img/message_focus.png"
      }, 
      {
        pagePath: "pages/index/index",
        text: "动态",
        iconPath: "./asset/img/discovery.png",
        selectedIconPath: "./asset/img/discovery_focus.png"
      }, 
      {
        pagePath: "pages/testUI/index",
        text: "我的",
        iconPath: "./asset/img/my.png",
        selectedIconPath: "./asset/img/my_focus.png"
      }
    ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
