import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import Modal from "react-native-modal";
// import MenuButton from 'components/MenuButton.jsx'
import { Container, Content, Item, Input, Icon, CardItem, Card, Body, Button } from 'native-base';
const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modal: {
        margin: 0,
        backgroundColor: 'white',
        height: 100,
        flex: 0,
        bottom: 0,
        position: 'absolute',
        width: '100%',
        flexDirection: 'row'

    }
})
export default class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            isBottomModalVisible: false,
            taxationAmount: 0,
        };
    }
    render() {
        return (
            <Container>
                <Modal
                    isVisible={this.state.modalVisible}
                    presentationStyle="formSheet"
                    onSwipeComplete={() => this.setState({ modalVisible: false })}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                >
                    <View style={styles.content}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: 'grey', fontSize: 16, marginTop: 10 }}>Payable Amount </Text>
                            <Item rounded style={{ width: "70%", height: 40, marginTop: 5, borderWidth: 10, borderColor: 'grey' }}>
                                <Input style={{ alignContent: 'center' }} onChangeText={(text) => this.setState({ taxationAmount: text })} />
                            </Item>
                        </View>
                        <Button rounded bordered style={{ marginTop: 20, backgroundColor: 'grey' }}
                            onPress={() => this.setState({ isBottomModalVisible: true, modalVisible: false })}>
                            <Text style={{ marginLeft: 5, color: 'white', marginRight: 10 }}>Pay Now</Text>
                        </Button>
                    </View>
                </Modal>
                <Modal
                    style={styles.modal}
                    isVisible={this.state.isBottomModalVisible}
                    onBackdropPress={() => this.setState({ isBottomModalVisible: false })}
                >
                    <View style={{ flexDirection: "row", alignSelf: 'center', justifyContent: 'flex-start', flex: 1, marginLeft: 30 }} >
                        <Button rounded
                            style={{ backgroundColor: 'white', border: 'white', marginRight: 30 }}
                            onPress={() => {
                                var orderId = new Date().getTime() / 1000;
                                var customerId = `${"mourya.g9@gmail.com"}_${"team"}`
                                var taxationAmount = this.state.taxationAmount
                                this.setState({ isBottomModalVisible: false })
                                this.props.navigation.navigate('Paytm', { orderId, customerId, taxationAmount })
                            }
                            }
                        >
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../../public/img/ads_5.gif')} />
                        </Button>
                        <Button rounded style={{ backgroundColor: 'white', border: 'white' }} onPress={() => alert("paytm ")}>
                            <Image
                                style={{ width: 80, height: 80 }}
                                source={require('../../public/img/ads_4.gif')} />
                        </Button>
                    </View>
                </Modal>
                {/* <MenuButton navigation={this.props.navigation} /> */}
                <Item style={{ zIndex: 9, position: "absolute", top: 10, right: 20, width: "40%" }}>
                    <Icon name="ios-search" />
                    <Input placeholder="Search Team" />
                </Item>
                <Content padder style={{ marginTop: 50 }}>

                    <Card >
                        <CardItem header bordered >
                            <View style={{ width: "25%" }}>
                            </View>
                            <View style={{ width: "50%" }}>
                                <Text style={{ color: 'grey' }}>{"September-2019"}</Text>
                            </View>
                            <View style={{ width: "25%" }}>
                            </View>
                        </CardItem>
                        <CardItem bordered >
                            <Body>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <View style={{ width: "45%" }}>
                                        <Text style={{ color: 'grey' }}>Team Name</Text>
                                    </View>
                                    <View style={{ width: "10%" }}>
                                        <Text style={{ color: 'grey' }}>:</Text>
                                    </View>
                                    <View style={{ width: "45%" }}>
                                        <Text style={{ color: 'grey' }}>{"Lola Warriors"}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <View style={{ width: "45%" }}>
                                        <Text style={{ color: 'grey' }}>Maintained By</Text>
                                    </View>
                                    <View style={{ width: "10%" }}>
                                        <Text style={{ color: 'grey' }}>:</Text>
                                    </View>
                                    <View style={{ width: "45%" }}>
                                        <Text style={{ color: 'grey' }}>{"Mourya Venkat"}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <View style={{ width: "45%" }}>
                                        <Text style={{ color: 'grey' }}>Amount To Be Paid</Text>
                                    </View>
                                    <View style={{ width: "10%" }}>
                                        <Text style={{ color: 'grey' }}>:</Text>
                                    </View>
                                    <View style={{ width: "45%" }}>
                                        <Text style={{ color: 'grey' }}>{40000}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <View style={{ width: "45%" }}>
                                        <Text style={{ color: 'grey' }}>Amount Paid</Text>
                                    </View>
                                    <View style={{ width: "10%" }}>
                                        <Text style={{ color: 'grey' }}>:</Text>
                                    </View>
                                    <View style={{ width: "45%" }}>
                                        <Text style={{ color: 'grey' }}>{25000}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <View style={{ width: "45%" }}>
                                        <Text style={{ color: 'grey' }}>Due Amount</Text>
                                    </View>
                                    <View style={{ width: "10%" }}>
                                        <Text style={{ color: 'grey' }}>:</Text>
                                    </View>
                                    <View style={{ width: "45%" }}>
                                        <Text style={{ color: 'grey' }}>{15000}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: "35%" }}>

                                    </View>
                                    <View style={{ width: "30%" }}>
                                        <Button
                                            rounded
                                            style={{ backgroundColor: 'grey', flex: 1 }}
                                            onPress={() => { this.setState({ modalVisible: true }) }}
                                        >
                                            <Text style={{ color: 'white', textAlign: 'center' }}>
                                                Pay Now
                                            </Text>
                                        </Button>
                                    </View>
                                    <View style={{ width: "35%" }}>

                                    </View>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
};



