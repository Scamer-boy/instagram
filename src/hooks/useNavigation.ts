// import { useNavigation } from "@react-navigation/native"
// import { StackNavigationProp } from "@react-navigation/stack";

// export type RootStackParamList = {
//     Home: undefined;
//     Upload: undefined;
//     Profile: {userId?: string};
//     Login: undefined;
//     Signup: undefined;
    
// }

// const appNavigation = () => {
//     const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
//     return {
//         navigation
//     }
// }
// export default appNavigation








import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    Home: undefined;
    Upload: undefined;
    Profile?: { userId?: string };
    OtherUserProfile: { userId: string };
    Login: undefined;
    Signup: undefined;
    EditProfile: undefined;
    ResetPassword: undefined;
    ForgotPassword: undefined;
};

const appNavigation = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return {
        navigation
    };
};

export default appNavigation;
