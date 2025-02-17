// React
import React, { memo } from 'react'

// Components
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableScale } from '@components'

// Constants
import { ui, font, color } from '@constants'


export default memo((props: Props) => {

    return (
        <>
            <StatusBar barStyle='dark-content' />

            <View style={styles.container}>

                <TouchableScale
                    onPress={props.onAddUserPress}
                >
                    <Feather
                        color={color.darkGray}
                        name='user-plus'
                        size={30}
                    />
                </TouchableScale>

                <Text style={styles.title}>
                    {props.title}
                </Text>

                <TouchableScale
                    onPress={props.onSettingsPress}
                >
                    <Ionicons
                        color={color.darkGray}
                        name='options'
                        size={30}
                    />
                </TouchableScale>

            </View>
        </>
    )
})

// Styles
const styles = StyleSheet.create({
    container: {
        paddingTop: ui.safePaddingTop + 10,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    title: {
        // fontFamily: font.semiBold,
        fontFamily: font.regular,
        textAlign: 'center',
        color: color.dark,
        fontSize: 24,
        flex: 1,
    },
    right: {
        width: 30,
    },
})

// Types
type Props = {
    // onBackPress: () => void,
    onSettingsPress: () => void,
    onAddUserPress: () => void,
    title: string,
}