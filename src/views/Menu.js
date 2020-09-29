import React, {useContext, useEffect, Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
} from 'native-base';
import FirebaseContext from '../context/firebase/firebaseContext';
import OrdersContext from '../context/orders/ordersContext';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const Menu = () => {
  const {getProducts, menu} = useContext(FirebaseContext);
  const {selectDish} = useContext(OrdersContext);
  const navgation = useNavigation();

  useEffect(() => {
    getProducts();
  }, []);

  const ShowHeading = (category, i) => {
    if (i > 0) {
      const categoryAfter = menu[i - 1].category;

      if (categoryAfter !== category) {
        return (
          <Separator style={styles.separator}>
            <Text style={styles.separatorText}>{category}</Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separator}>
          <Text style={styles.separatorText}>{category}</Text>
        </Separator>
      );
    }
  };

  return (
    <Container style={globalStyles.container}>
      <Content style={{backgroundColor: '#fff'}}>
        <List>
          {menu.map((dish, i) => {
            const {image, name, description, category, price, id} = dish;
            return (
              <Fragment key={id}>
                {ShowHeading(category, i)}
                <ListItem
                  onPress={() => {
                    selectDish(dish);
                    navgation.navigate('DetailsDish');
                  }}>
                  <Thumbnail square large source={{uri: image}} />
                  <Body>
                    <Text>{name}</Text>
                    <Text note numberOfLines={2}>
                      {description}
                    </Text>
                    <Text>Price: $ {price}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#000',
  },
  separatorText: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Menu;
