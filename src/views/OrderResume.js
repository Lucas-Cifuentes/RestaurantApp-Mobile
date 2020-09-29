import React, {useContext, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  H1,
  Left,
  List,
  ListItem,
  Text,
  Thumbnail,
} from 'native-base';
// import { useNavigation } from "@react-navigation/native"
import OrdersContext from '../context/orders/ordersContext';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import firebase from '../../firebase/index';

const OrderResume = () => {
  const {order, total, showResume, eliminateDish, orderOrdered} = useContext(
    OrdersContext,
  );
  const navigation = useNavigation();

  useEffect(() => {
    calculateTotal();
  }, [order]);

  const calculateTotal = () => {
    let newTotal = 0;
    newTotal = order.reduce((newTotal, article) => newTotal + article.total, 0);
    showResume(newTotal);
  };

  const confirmEliminate = (id) => {
    Alert.alert(
      'Are you sure you want to delete it?',
      'Once deleted it cannot be recovered',
      [
        {
          text: 'OK',
          onPress: () => {
            eliminateDish(id);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const handlePressFinish = async () => {
    Alert.alert(
      'Are you sure you want to finish?',
      'Once accepted you will not be able to go back',
      [
        {
          text: 'OK',
          onPress: async () => {
            const orderObj = {
              deliveryTime: 0,
              completed: false,
              total: total,
              order: order,
              created: Date.now(),
            };
            // console.log(orderObj);
            try {
              const order = await firebase.db
                .collection('orders')
                .add(orderObj);
              orderOrdered(order.id);
            } catch (error) {
              Alert.alert('Error', 'An error has ocurred', {
                text: 'OK',
              });
            }
            navigation.navigate('OrderProgress');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.contained}>
        <H1 style={globalStyles.title}>Order Resume</H1>
        {order.map((dish, i) => {
          const {amount, name, image, id, price} = dish;

          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{uri: image}} />
                  <Body>
                    <Text> {name} </Text>
                    <Text> {amount} </Text>
                    <Text>Price: $ {price} </Text>
                    <Button
                      onPress={() => confirmEliminate(id)}
                      full
                      danger
                      style={{marginTop: 20}}>
                      <Text style={[globalStyles.buttonText, {color: '#fff'}]}>
                        Eliminate
                      </Text>
                    </Button>
                  </Body>
                </Left>
              </ListItem>
            </List>
          );
        })}
        <Text style={globalStyles.price}>Total: ${total}</Text>
        <Button
          dark
          full
          style={{color: '#fff'}}
          onPress={() => navigation.navigate('Menu')}>
          <Text>Keep ordering</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.button}
            onPress={() => handlePressFinish()}>
            <Text style={globalStyles.buttonText}>Finish</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default OrderResume;
