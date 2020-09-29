import React, {useState, useContext, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {
  Button,
  Col,
  Container,
  Content,
  Form,
  Grid,
  Icon,
  Input,
  Text,
  Footer,
  FooterTab,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import OrdersContext from '../context/orders/ordersContext';

const FormDish = () => {
  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(0);
  const {dish, saveOrder} = useContext(OrdersContext);
  const {price} = dish;
  const navigation = useNavigation();

  const decreaseOne = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const increaseOne = () => {
    setAmount(amount + 1);
  };

  const totalPrice = () => {
    const totalPay = price * amount;
    setTotal(totalPay);
  };

  const confirmOrder = () => {
    Alert.alert(
      'Do you want to confirm your order?',
      'A confirmed order cannot be modified',
      [
        {
          text: 'OK',
          onPress: () => {
            const order = {
              ...dish,
              amount,
              total,
            };
            saveOrder(order);
            navigation.navigate('OrderResume');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  useEffect(() => {
    totalPrice();
  }, [amount]);

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.title}>Amount</Text>
          <Grid>
            <Col>
              <Button
                props
                dark
                style={styles.button}
                onPress={() => decreaseOne()}>
                <Icon name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                style={{textAlign: 'center', fontSize: 20}}
                value={amount.toString()}
                keyboardType="numeric"
                onChangeText={(amount) => setAmount(amount)}
              />
            </Col>
            <Col>
              <Button
                props
                dark
                style={styles.button}
                onPress={() => increaseOne()}>
                <Icon name="add" />
              </Button>
            </Col>
          </Grid>
          <Text style={globalStyles.price}>Total: $ {total} </Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button style={globalStyles.button} onPress={() => confirmOrder()}>
            <Text style={globalStyles.buttonText}>Add to Order</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 80,
    justifyContent: 'center',
    width: '100%',
  },
});

export default FormDish;
