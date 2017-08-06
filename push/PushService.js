import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

const EXPO_PUSH_TOKEN_STORAGE_KEY = "expo_push_token";

export class PushService {
  static Register() {
    PushService.registerForPushNotificationsAsync();
  }

  static async registerForPushNotificationsAsync() {
    const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    PushService.PreparePushToken();
  }

  static async Token(){
    return await AsyncStorage.getItem(EXPO_PUSH_TOKEN_STORAGE_KEY);
  }

  static async PreparePushToken(){
    if (!await PushService.Token()){
      AsyncStorage.setItem(
        EXPO_PUSH_TOKEN_STORAGE_KEY,
        await Notifications.getExpoPushTokenAsync());
    }
    console.log("push token: ", await PushService.Token());
  }
}
