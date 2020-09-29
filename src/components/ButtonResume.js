import React, {useContext} from 'react';
import {Text, Button} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import OrdersContext from '../context/orders/ordersContext';

const ButtonResume = () => {
  const navigation = useNavigation();
  const {order} = useContext(OrdersContext);

  return (
    <>
      {order.length !== 0 ? (
        <Button
          style={[globalStyles.button]}
          onPress={() => navigation.navigate('OrderResume')}>
          <Text style={globalStyles.buttonText}>Go to Resume</Text>
        </Button>
      ) : null}
    </>
  );
};

export default ButtonResume;
