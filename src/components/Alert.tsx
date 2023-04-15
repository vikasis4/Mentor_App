import { Alert } from 'react-native'

const warn = (value: any) => {
    Alert.alert('Warning', value, [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
}

export default warn