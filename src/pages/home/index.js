import Taro, { Component } from '@tarojs/taro'
import { View, Text,ScrollView,Image,Swiper,SwiperItem} from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtFab } from 'taro-ui'
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
      
    }

    componentWillUnmount() {
      const {homeStore} = this.props;
      homeStore.clsData();
     }

    componentDidShow() { 
      console.log("taskdidmount")
      const { homeStore } = this.props;
      homeStore.getRecommendList(true);
    }

    componentDidHide() { }

    componentWillReceiveProps(newProps){
      if(newProps.location.key !== this.props.location.key){
          console.log("rexc");
      }
    }

    constructor() {
        super(...arguments)
        this.state = {
          imgUrls: [img1,'https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=banner%E5%9B%BE%20%E5%AD%A6%E6%A0%A1&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=&latest=&copyright=&cs=3132951019,241887644&os=2825701712,3889531474&simid=0,0&pn=9&rn=1&di=1430&ln=1367&fr=&fmq=1559188360452_R&ic=&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&objurl=http%3A%2F%2Fpic.97uimg.com%2Fback_pic%2F20%2F16%2F01%2F02%2Fa364d4c7405bee603617ce084ec45c6d.jpg%2521w1200&rpstart=0&rpnum=0&adpicid=0&force=undefined'],
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
          homeStore.getRecommendList(true);
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
      publictask =()=>{
        Taro.navigateTo({
          url: '/pages/public/index'
        })
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
                        taskStatus={taskUtils.convertTaskStatus(item.taskStatus)}
                        money={item.money}
                        contentPublic={item.contentPublic} 
                        tasktype = {item.tasktype}
                        taskId = {item.id}
                        />
                    )
                  })}
              </View>
              <View className='Attab'>
              <AtFab onClick={this.publictask} size='small' >
                <Text className='at-fab__icon at-icon at-icon-add' ></Text>
              </AtFab>
              </View>
            </ScrollView>
          </View>
        )
      }
}
