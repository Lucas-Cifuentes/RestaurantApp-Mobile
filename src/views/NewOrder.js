import React from 'react';

import {View, StyleSheet} from 'react-native';
import {Container, Button, Text} from 'native-base';
import globalStyles from '../styles/global';

import {useNavigation} from '@react-navigation/native';

const NewOrder = () => {
  const navigation = useNavigation();

  return (
    <Container style={globalStyles.container}>
      <View style={[globalStyles.contained, styles.localContained]}>
        <Button
          style={globalStyles.button}
          rounded
          block
          onPress={() => navigation.navigate('Menu')}>
          <Text style={globalStyles.buttonText}>Start New Order</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  localContained: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default NewOrder;
