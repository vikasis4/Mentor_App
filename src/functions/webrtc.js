import axios from 'axios';
import { FCM } from '../../types/link';
import Alert from '../components/Alert';


const sendFcm_Call = async ({fcmToken, socketId}) => {

    await axios.post(FCM, {
        socket_id: socketId,
        token: fcmToken
    }).then((response) => {
        if (!response.data.status) {
            Alert('Something went wrong, please try again later')
        }
    }).catch((error) => {
        console.log(error);
        Alert('Something went wrong, please try again later')
    })

}

export { sendFcm_Call }