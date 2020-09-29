import React, {useContext, useState} from 'react';
import OrdersContext from '../context/orders/ordersContext';
import {View, Text} from 'react-native';
import firebase from '../../firebase/index';

const OrderProgress = () => {
  const {idorder} = useContext(OrdersContext);
  const [time, setTime] = useState(0);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    firebase.db
      .collection('orders')
      .doc(idorder)
      .onSnapshot(function (doc) {
        setTime(doc.data().deliveryTime);
      });
  };

  return (
    <View>
      <Text>{time}</Text>
    </View>
  );
};

export default OrderProgress;
