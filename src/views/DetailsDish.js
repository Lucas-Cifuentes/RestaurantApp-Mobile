import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import OrdersContext from '../context/orders/ordersContext';
import globalStyle from '../styles/global';
import {Image} from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  H1,
  Text,
} from 'native-base';

const DetailsDish = () => {
  const {dish} = useContext(OrdersContext);
  const {name, description, image, price} = dish;
  const navigation = useNavigation();
  return (
    <Container style={globalStyle.container}>
      <Content style={globalStyle.contained}>
        <H1 style={globalStyle.title}>{name}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image style={globalStyle.image} source={{uri: image}} />
              <Text style={{marginTop: 20}}>{description}</Text>
              <Text style={globalStyle.price}>Price: $ {price} </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>

      <Footer>
        <FooterTab>
          <Button
            style={globalStyle.button}
            onPress={() => navigation.navigate('FormDish')}>
            <Text style={globalStyle.buttonText}>Order saucer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default DetailsDish;
