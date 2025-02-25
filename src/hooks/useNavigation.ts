import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { UserProfile } from "../types/HomeSceen";

export type RootStackParamList = {
    Home: undefined;
    Upload: undefined;
    Profile?: { userId?: string };
    OtherUserProfile: { userId: string };
    Login: undefined;
    Signup: undefined;
    EditProfile: { userProfile: UserProfile; profile: string };
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
