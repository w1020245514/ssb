import Taro, { Component } from '@tarojs/taro'
import { View, Text,ScrollView,Image,Swiper,SwiperItem} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'
import img1 from '../../asset/img/24213.jpg'
import img2 from '../../asset/img/24280.jpg'
import img3 from '../../asset/img/1444983318907-_DSC1826.jpg'
import Task from '../../component/task/task'
import taskUtils from '../../utils/taskUtil'

@inject('homeStore')
@observer
export default class Home extends Component {

    config = {
        navigationBarTitleText: '任务'
    }

    componentWillMount() { }

    componentDidMount() {
      const { homeStore } = this.props;
      homeStore.getRecommendList();
    }

    componentWillUnmount() {
      const {homeStore} = this.props;
      homeStore.clsData();
     }

    componentDidShow() { }

    componentDidHide() { }
    constructor() {
        super(...arguments)
        this.state = {
          imgUrls: [img1,img2,img3],
          currentNavtab: 0,
          navTab: ['推荐', '跑腿', '求助', '资源'],
        }
      }
      switchTab(index,e) {
        const {homeStore} = this.props;
        this.setState({
          currentNavtab: index
        })
        homeStore.clsData();
        if(index==0){
          homeStore.getRecommendList();
        }
        if(index!=0){
          let params = index -1;
          homeStore.getTasksBytype(params);
        }
      }
      getnextPage(){
        const {homeStore} = this.props;
        homeStore.getRecommendList();
      }
      render () {
        const { homeStore, homeStore: { tasklist } } = this.props;
        return (
          <View>
            <View className='top-tab flex-wrp flex-tab' >
            {
              this.state.navTab.map((item,index) => {
                return (<View className={this.state.currentNavtab === index ? 'toptab flex-item active' : 'toptab flex-item' } key={item} onClick={this.switchTab.bind(this,index)}>
                  {item}
                </View>)
              })
            }
            </View>
            <ScrollView 
            scroll-y 
            className='container discovery withtab'
            enableBackToTop={true}
            scrollWithAnimation={true}
            >
              <View className='ctnt0'>
                  <Swiper className='activity' indicatorDots='true'
                          autoplay='true' interval='5000' duration='500'>
                    {this.state.imgUrls.map((item,index) => {
                      return (<SwiperItem key={index}>
                        <Image src={item} className='slide-image' width='355' height='375' />
                      </SwiperItem>)
                    })}
                  </Swiper>
                  {tasklist.map((item, index)=>{
                    return (
                      <Task
                        key={`dis_${item.id}`}
                        userImgSrc={item.userImgSrc}
                        username={item.userName}
                        school={"云南大学"}
                        taskttag={taskUtils.convertTaskType(item.tasktype)}
                        goodNum={taskUtils.convertTaskStatus(item.taskStatus)}
                        money={item.money}
                        contentPublic={item.contentPublic} 
                        tasktype = {item.tasktype}
                        taskId = {item.id}
                        />
                    )
                  })}
              </View>
                {/* <View className='txcenter' hidden={this.state.currentNavtab==1 ? false : true}>
                  <Text>圆桌</Text>
                </View>
                <View className='txcenter' hidden={this.state.currentNavtab==2 ? false : true}>
                  <Text>热门</Text>
                </View>
                <View className='txcenter' hidden={this.state.currentNavtab==3 ? false : true}>
                  <Text>收藏</Text>
                </View> */}
            </ScrollView>
          </View>
        )
      }
}
