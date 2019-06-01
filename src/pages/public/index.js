import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text, ScrollView, Image, Picker } from '@tarojs/components'
import { AtTextarea, AtInputNumber, AtButton, AtTag } from 'taro-ui'
import pay from '../../asset/img/pay.png'
import address1 from '../../asset/img/address.png'
import clock1 from '../../asset/img/clock1.png'

import _ from 'lodash'

@inject('publicStore')
@observer
export default class Publictask extends Component {

    config = {
        navigationBarTitleText: '发布任务'
    }

    componentWillMount() { }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidShow() { }

    componentDidHide() { }

    constructor() {
        super(...arguments)
        this.state = {
            contentPublic: '',
            money: 0,
            contentPrivate: '',
            address: '',
            dateSel: '2019-05-30',
            timeSel: '12:08',
        }
    }
    handleChange1(event) {
        this.setState({
            contentPublic: event.target.value
        })
    }
    handleChange2(event) {
        console.log(event)
        this.setState({
            money: event
        })
    }
    handleChange3(event) {
        this.setState({
            contentPrivate: event.target.value
        })
        console.log(this.state.contentPrivate);
    }
    handleChange4(event) {
        this.setState({
            address: event.target.value
        })
        console.log(this.state.address);
    }

    onTimeChange = e => {
        this.setState({
            timeSel: e.detail.value
        })
    }
    onDateChange = e => {
        this.setState({
            dateSel: e.detail.value
        })
    }

    publictask = () => {
        const { publicStore } = this.props
        console.log(publicStore)
        console.log("public");
        let deadline = this.state.dateSel + " " + this.state.timeSel;
        let params = _.pick(this.state, 'contentPublic', 'money', 'contentPrivate', 'address');
        params['deadline'] = deadline;
        console.log(JSON.stringify(params));
        publicStore.publicTask(params);

    }
    render() {
        let publicnumeber = {
            height: "20px",
            marginLeft: "10px",
            marginRight: "10px",
        }

        let textea = {
            width: "347px",
            border: "none",
        }

        let fontStyle = {
            "line-height": "19px",
            "color": "rgba(5, 122, 240, 1)",
            "font-size": "28px",
            "text-align": "center",
            "font-family": "Roboto",
        }
        console.log("1212")
        return (
            <View className="container">
                <View className='public-public-content'>
                    <AtTextarea
                        customStyle={{ border: "none" }}
                        value={this.state.contentPublic}
                        onChange={this.handleChange1.bind(this)}
                        maxLength={200}
                        placeholder='例：帮忙在东二院中通带一下快递(・ω&lt;)&nbsp;てへぺろ'
                        placeholderStyle='font-size: 15px;font-family: Roboto;opacity: 0.8'
                    />
                    <View className='public-pay'>
                        <View className='public-pay'>
                            <Image src={pay} className='public-img' />
                            <Text className='pay-text' style={{ marginLeft: "10px" }}>赏金担保</Text>
                        </View>
                        <Text className='public-text'>支付赏金</Text>
                        <AtInputNumber
                            min={0}
                            max={10}
                            step={1}
                            value={this.state.money}
                            onChange={this.handleChange2.bind(this)}
                            width={50}
                            customStyle={publicnumeber}
                        />
                        <Text className='public-money'>元</Text>
                    </View>
                </View>


                <View className='at-row at-row__align--center public-private'>
                    <View className='public-private-text'>
                        <Text className='at-col'>悄悄话：</Text>
                    </View>

                    <AtTextarea
                        value={this.state.contentPrivate}
                        onChange={this.handleChange3.bind(this)}
                        maxLength={200}
                        placeholder='童鞋，这里写提货码，只有抢单者才能看到哦，你懂得（坏笑）'
                        customStyle={textea}
                        placeholderStyle='font-size: 15px;color: #82BDF8;font-family: Roboto;opacity: 0.8'
                        placeholderClass='public-private-text'
                    />
                </View>

                <View className='at-row at-row__align--center public-private'>
                    <View className='at-col'>
                        <Image src={address1} className='public-address' />
                    </View>
                    <AtTextarea
                        value={this.state.address}
                        onChange={this.handleChange4.bind(this)}
                        maxLength={200}
                        placeholder='收货地址'
                        placeholderStyle='font-size: 15px;font-family: Roboto;opacity: 0.8'
                        height={36}
                        customStyle={textea}
                        count={false}
                    />
                </View>

                <View className='at-row at-row__align--center public-private-address'>
                    <View className='at-col'>
                        <Image src={clock1} className='public-address' />
                    </View>

                    <View style={{ marginRight: "37px" }}>
                        <Text className='public-clock-text' >期望完成时间</Text>
                    </View>

                    <View style={{ marginRight: "17px" }}>
                        <Picker mode='date' onChange={this.onDateChange}>
                            <View className='public-clock-text'>
                                {this.state.dateSel}
                            </View>
                        </Picker>
                    </View>

                    <View style={{ marginRight: "17px" }}>
                        <Picker mode='time' onChange={this.onTimeChange}>
                            <View className='public-clock-text'>
                                {this.state.timeSel}
                            </View>
                        </Picker>
                    </View>

                    <View className='public-clock-text'>
                        | 之前
                    </View>
                </View>

                {/* <View className='public-private-address'>
                        <Text >任务类型</Text>
                        <AtTag
                            name='tag-1'
                            type='primary'
                            circle
                        //   onClick={this.onClick.bind(this)}
                        >
                            跑腿
                        </AtTag>
                        <AtTag
                            name='tag-2'
                            type='primary'
                            circle
                        //   onClick={this.onClick.bind(this)}
                        >
                            求助
                        </AtTag>
                        <AtTag
                            name='tag-3'
                            type='primary'
                            circle
                        //   onClick={this.onClick.bind(this)}
                        >
                            资源
                        </AtTag>
                    </View> */}
                        <View>
                            <AtButton type='primary' className='public-button' onClick={this.publictask}>发布</AtButton>
                        </View>
            </View>
                    )
                }
            }
