// React
import React from 'react'

// Components
import Animated, { useAnimatedStyle, interpolate, Extrapolate, interpolateNode } from 'react-native-reanimated'
import { View, TextInput, StatusBar, StyleSheet } from 'react-native'
import ArrowLeftIcon from '@assets/images/arrow-left.svg'
import SearchIcon from '@assets/images/search.svg'
import { TouchableScale } from '@components'

// Constants
import { ui, font, color, hitSlop } from '@constants'


export default (props: Props) => {

    const { animatedIndex } = props;

    const style = useAnimatedStyle(
        () => ({
            opacity: interpolate(
                animatedIndex.value,
                [1, 1.5],
                [1, 0],
                Extrapolate.CLAMP,
            ),
            transform: [
                {
                    scale: interpolate(
                        animatedIndex.value,
                        [1, 1.5],
                        [1, 0.8],
                        Extrapolate.CLAMP,
                    ),
                },
                {
                    translateY: interpolate(
                        animatedIndex.value,
                        [1.5, 2],
                        [0, -1000],
                        Extrapolate.CLAMP,
                    ),
                },
            ],
        }),
        []
    );

    // const onPress = () => {
    //     if (focused) {
    //         props.onClosePress();
    //     } else {
    //         props.onBackPress();
    //     }
    // };

    return (
        <View style={styles.container}>

            <StatusBar translucent barStyle='dark-content' />
            
            <TouchableScale
                onPress={props.onBackPress}
                style={styles.button}
                hitSlop={hitSlop}
            >
                <ArrowLeftIcon
                    fill={color.dark}
                    height={20}
                    width={20}
                />
            </TouchableScale>

            <Animated.View
                style={[
                    styles.shadow,
                    styles.bar,
                    style,
                ]}
            >
                <SearchIcon
                    fill={color.dark}
                    height={20}
                    width={20}
                />
                <TextInput
                    onChangeText={props.onSearchTextChanged}
                    placeholderTextColor={color.mediumGray}
                    placeholder='Rechercher ...'
                    value={props.searchText}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    style={styles.input}
                />
            </Animated.View>
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: ui.safePaddingTop + 10,
        justifyContent: 'space-between',
    },
    button: {
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    bar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        borderRadius: 14,
        paddingLeft: 15,
        marginTop: 15,
    },
    shadow: {
        shadowColor: '#000',
        shadowOpacity: 0.20,
        shadowRadius: 4.65,
        elevation: 8,
        shadowOffset: {
            height: 4,
            width: 0,
        },
    },
    input: {
        fontFamily: font.regular,
        paddingHorizontal: 15,
        paddingVertical: 15,
        color: color.dark,
        fontSize: 16,
        flex: 1,
    },
})

// Types
type Props = {
    onSearchTextChanged: (searchText: string) => void,
    animatedIndex: Animated.SharedValue<number>,
    // onSearchPress: () => void,
    // onClosePress: () => void,
    onBackPress: () => void,
    onFocus: () => void,
    onBlur: () => void,
    searchText: string,
    // focused?: boolean,
}