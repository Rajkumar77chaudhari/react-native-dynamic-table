/// <reference types="react" />
/// <reference types="react" />
import { type StyleProp, type ViewStyle, type TextStyle } from "react-native";
type Props = {
    onPress?: () => void;
    title: string;
    style?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
    Icon?: () => JSX.Element;
};
declare const Button: ({ onPress, title, style, styleText, Icon, }: Props) => JSX.Element;
export default Button;
//# sourceMappingURL=Button.d.ts.map